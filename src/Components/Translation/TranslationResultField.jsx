import React from 'react'

import { Input } from '@chakra-ui/react'

const TranslationResultField = ({ result, disabled, handleTweak }) => {

  return (
    <Input 
      isDisabled={disabled}
      value={result}
      onChange={(e) => handleTweak(result, e.target.value)} 
      size='sm'
      variant={disabled ? 'filled' : 'flushed'}
    />
  )
}
  
export default TranslationResultField