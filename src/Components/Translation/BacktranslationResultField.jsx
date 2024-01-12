import React, { useEffect } from 'react'

import { Button, Input, InputGroup, InputRightElement, useBoolean, Tag, Skeleton, HStack, Tooltip, Textarea } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const BacktranslationResultField = ({ list, result, original, loading }) => {
  const [showOriginal, setShowOriginal] = useBoolean(false)

  useEffect(() => {
    setShowOriginal.off()
  }, [list])

  return (
    <Skeleton isLoaded={!loading} width="100%">
      <HStack size='sm'>
        <Textarea 
          isDisabled={true}
          value={showOriginal ? original : result}
          isInvalid={true}
          errorBorderColor={result === original ? 'green.400' : 'orange.400'}
          variant={(result === original || showOriginal) ? 'filled': 'outline'}
          size='md'
        />
        {result !== original
        ? <Tooltip label={showOriginal ? 'Currently showing: original' : 'Currently showing: backtranslation'}>
            <Button 
              size='xs' 
              onClick={setShowOriginal.toggle} 
              colorScheme='orange'
              rightIcon={<ViewIcon />}
              width='6rem'
              whiteSpace='normal'
              py='0.15rem'
              my='-0.15rem'
              height='unset'
              variant={showOriginal ? 'solid' : 'outline'}
            >
              {showOriginal ? 'Hide original' : 'Show original'}
            </Button>
          </Tooltip>
        : <Tag size='sm' py='0.15rem' my='-0.15rem' colorScheme='green' textAlign='center' width='6rem'>Matches original</Tag>
        }
      </HStack>
    </Skeleton>
  )
}
  
export default BacktranslationResultField