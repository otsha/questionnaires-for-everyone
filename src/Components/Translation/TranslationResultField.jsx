import React from 'react'

import { Input, Skeleton, Textarea } from '@chakra-ui/react'

const TranslationResultField = ({ result, disabled, handleTweak, loading }) => {

  return (
    <Skeleton isLoaded={!loading} width="100%">
      <Textarea 
        isDisabled={disabled}
        value={result}
        onChange={(e) => handleTweak(result, e.target.value)} 
        size='md'
        variant={disabled ? 'filled' : 'flushed'}
      />
    </Skeleton>
  )
}
  
export default TranslationResultField