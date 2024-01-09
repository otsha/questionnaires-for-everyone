import React, { useEffect } from 'react'

import { Button, Input, InputGroup, InputRightElement, useBoolean, Tag } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

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
      {result !== original
      ? <InputRightElement width='12rem' justifyContent='right' pr='0.5rem'> 
        <Button 
          size='xs' 
          onClick={setShowOriginal.toggle} 
          colorScheme='orange'
          rightIcon={<ViewIcon />}
        >
          {showOriginal ? 'Show backtranslation' : 'Show original'}
        </Button>
      </InputRightElement>
      : <InputRightElement width='10rem' justifyContent='right' pr='0.5rem'> 
        <Tag size='sm' colorScheme='green' disabled>Matches original</Tag>
      </InputRightElement>
      }
    </InputGroup>
  )
}
  
export default BacktranslationResultField