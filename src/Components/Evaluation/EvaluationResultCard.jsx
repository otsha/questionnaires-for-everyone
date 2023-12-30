import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Card, CardBody, CardHeader, Heading, Tooltip, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { React } from 'react'

const EvaluationResultCard = ({ result }) => {

  const selectResultInfoLabel = () => {
    switch (result.title) {
      case 'GEMBA':
        return 'An overall score of translation quality.'
      case 'SSA':
        return 'Semantic similarity assessment. Experimental.'
      default:
        return ''
    }
  }

  const selectResultScoreColor = () => {
    if (result.score < 50) {
      return 'red.400'
    } else if (result.score < 75) {
      return 'yellow.400'
    } else {
      return 'green.400'
    }
  }

  return (
    <Card width="50%" mt="0.5rem">
      <CardHeader bg="gray.100" display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
        <Heading size="xs">{result.title}<Tooltip label={selectResultInfoLabel()}><InfoOutlineIcon ml="0.25rem" mb="0.25rem" /></Tooltip></Heading>
        <CircularProgress value={result.score} color={selectResultScoreColor()} size="64px" thickness="14px">
          <CircularProgressLabel fontWeight="bold">{result.score}</CircularProgressLabel>
        </CircularProgress>
      </CardHeader>
      {result.reasoning && 
        <CardBody>
          {result.reasoning}
        </CardBody>
      }
    </Card>
  )
}

export default EvaluationResultCard