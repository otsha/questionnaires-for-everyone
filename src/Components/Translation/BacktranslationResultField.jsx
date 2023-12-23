import React, { useEffect } from 'react'

import { Button, Input, InputGroup, InputRightElement, useBoolean } from '@chakra-ui/react'

const BacktranslationResultField = ({ list, result, original }) => {
  const [showOriginal, setShowOriginal] = useBoolean(false)

  useEffect(() => {
    setShowOriginal.off()
  }, [list])

  return (
    <InputGroup size='sm'>
      <Input 
        isDisabled={true}
        value={showOriginal ? original : result}
        isInvalid={true}
        errorBorderColor={result === original ? 'green.400' : 'orange.400'}
        variant={(result === original || showOriginal) ? 'filled': 'outline'}
      />
      {result !== original &&
      <InputRightElement width='10rem' justifyContent='right' pr='0.5rem'> 
        <Button size='xs' onClick={setShowOriginal.toggle}>
          {showOriginal ? 'Show Backtranslation' : 'Show Original'}
        </Button>
      </InputRightElement>
      }
    </InputGroup>
  )
}
  
export default BacktranslationResultField