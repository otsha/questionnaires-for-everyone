import { React, useEffect, useState } from 'react'
import { HStack, useClipboard, Link, useBoolean, Tooltip, IconButton } from '@chakra-ui/react'
import { CopyIcon, CheckIcon, DownloadIcon } from '@chakra-ui/icons'

const ExportControls = ({ originalItems, translatedItems, evaluations }) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const [csvList, setCSVList] = useState('')
  const [isLoading, setIsLoading] = useBoolean(false)
  
  useEffect(() => {
    let copyItems = ''

    copyItems += [
      `Original Items:`,
      `${originalItems.map((o) => o).join('\n')}`,
      '',
      `Translated Items:`,
      `${translatedItems.map((t) => t).join('\n')}`,
      '',
      ''
    ].join('\n')

    if (evaluations.length > 0) {
        copyItems += [
          `GEMBA-DA Score: ${evaluations.filter((e) => e.title === 'GEMBA-DA')[0].score}`,
          `(Experimental) SSA Score: ${evaluations.filter((e) => e.title === 'SSA')[0].score}`,
          `(Experimental) SSA Justification: ${evaluations.filter((e) => e.title === 'SSA')[0].reasoning}`,
          `(Experimental) SSA Suggestion(s): ${evaluations.filter((e) => e.title === 'SSA')[0].suggestion}`,
        ].join('\n')
    }
    console.log(copyItems)
  
    setValue(copyItems)
  }, [translatedItems, evaluations])

  const constructCSV = () => {
    let headers = ['\"original\",\"translation\",\"overall_gemba\",\"overall_ssa\"']
    let tableContents = headers

    // Append evaluations to first row
    tableContents.push(`\"${originalItems[0]}\",\"${translatedItems[0]}\",${evaluations.map((e) => String(`\"${e.score}\",`)).join('')}`.slice(0, -1))

    // Append rest of translations
    for (let i = 1; i < originalItems.length; i++) {
      const pair = `\"${originalItems[i]}\",\"${translatedItems[i]}\",,`
      tableContents.push(pair)
    }
    setCSVList(tableContents.join('\n'))
  }

  const handleCSVDownload = () => {
    setIsLoading.on()
    constructCSV()
    setTimeout(() => {
      setIsLoading.off()
    }, 2000)
  }
  
  return (
    <HStack justifyContent='center'>
        <Tooltip label="Copy the translation to clipboard">
          <IconButton 
              icon={hasCopied ? <CheckIcon /> : <CopyIcon />} 
              onClick={onCopy}
              variant={hasCopied ? 'outline': 'solid'}
              width='4rem'
            >
          </IconButton>
        </Tooltip>
        <Tooltip label="Dowload a .CSV file containing the translation">
          <Link
            href={window.URL.createObjectURL(new Blob([csvList], { type: 'text/csv' }))}
            download='translation_result.csv'
          >
            <IconButton 
              icon={<DownloadIcon />}
              isLoading={isLoading}
              onClick={handleCSVDownload}
              width="4rem"
            >
              Download .CSV
            </IconButton>
          </Link>
        </Tooltip>
    </HStack>
  )
}
  
export default ExportControls