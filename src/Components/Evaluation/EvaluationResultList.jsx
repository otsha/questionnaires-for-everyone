import { React } from 'react'
import { VStack } from '@chakra-ui/react'

import EvaluationResultCard from './EvaluationResultCard'

const EvaluationResultList = ({ results }) => {
  return (
    <VStack m="1rem">
      {results.length > 0 && results.map((res) =>
        <EvaluationResultCard result={res} /> 
      )}
    </VStack>
  )
}

export default EvaluationResultList