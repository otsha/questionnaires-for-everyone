import { React, useEffect, useState } from 'react'
import { HStack, Button, useClipboard, Link, ButtonGroup, useBoolean, Tooltip, IconButton } from '@chakra-ui/react'
import { CopyIcon, CheckIcon, DownloadIcon } from '@chakra-ui/icons'

const ExportControls = ({ originalItems, translatedItems }) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const [csvList, setCSVList] = useState('')
  const [isLoading, setIsLoading] = useBoolean(false)
  
  useEffect(() => {
    setValue(translatedItems.join('\n'))
  }, [translatedItems])

  const constructCSV = () => {
    let pairedItems = ['\"original\",\"translation\"']
    for (let i = 0; i < originalItems.length; i++) {
      const pair = `\"${originalItems[i]}\",\"${translatedItems[i]}\"`
      pairedItems.push(pair)
    }
    setCSVList(pairedItems.join('\n'))
  }

  const handleCSVDowload = () => {
    setIsLoading.on()
    constructCSV();
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
              onClick={handleCSVDowload}
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