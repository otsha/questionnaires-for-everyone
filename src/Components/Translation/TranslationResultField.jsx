import React from 'react'

import { Input, Skeleton, Textarea } from '@chakra-ui/react'

const TranslationResultField = ({ result, disabled, handleTweak, loading }) => {

  return (
    <Skeleton isLoaded={!loading} width="100%">
      <Textarea 
        isDisabled={disabled}
        color={disabled && 'orange.900'}
        bg={disabled && 'orange.50'}
        borderWidth={disabled && '1px'}
        borderColor={disabled && 'gray.300'}
        value={result}
        onChange={(e) => handleTweak(result, e.target.value)} 
        size='md'
        variant={disabled ? 'filled' : 'flushed'}
      />
    </Skeleton>
  )
}
  
export default TranslationResultField