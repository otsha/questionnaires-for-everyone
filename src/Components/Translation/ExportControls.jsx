import { React, useEffect, useState } from 'react'
import { HStack, Button, useClipboard, Link, ButtonGroup, useBoolean } from '@chakra-ui/react'
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
    <HStack justifyContent='flex-end'>
        <Link
          href={window.URL.createObjectURL(new Blob([csvList], { type: 'text/csv' }))}
          download='translation_result.csv'
        >
          <Button 
            rightIcon={<DownloadIcon />}
            isLoading={isLoading}
            onClick={handleCSVDowload}
          >
            Download .CSV
          </Button>
        </Link>
        <Button 
          rightIcon={hasCopied ? <CheckIcon /> : <CopyIcon />} 
          onClick={onCopy}
          variant={hasCopied ? 'outline': 'solid'}
          width='12rem'
        >
          {hasCopied ? 'Copied' : 'Copy to clipboard'}
        </Button>
    </HStack>
  )
}
  
export default ExportControls