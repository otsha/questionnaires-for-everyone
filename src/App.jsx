import { React, useState } from 'react'
import { Button, Flex, Text, Textarea, HStack, VStack, Divider, Heading, useBoolean, Spinner } from '@chakra-ui/react'
import { translate, evaluate } from './Scripts/translationService'

import LangSelectDropdown from './Components/Translation/LangSelectDropdown'
import TranslationView from './Components/Translation/TranslationView'
import { DeleteIcon } from '@chakra-ui/icons'
import EvaluationResultList from './Components/Evaluation/EvaluationResultList'

const App = () => {
  const [original, setOriginal] = useState([])
  const [translation, setTranslation] = useState([])
  const [backTranslation, setBackTranslation] = useState([])
  const [sourceLang, setSourceLang] = useState('EN')
  const [targetLang, setTargetLang] = useState('FI')
  const [evaluationResult, setEvaluationResult] = useState([])
  const [isEvaluating, setIsEvaluating] = useBoolean(false)

  const handleInput = (e) => {
    const items = e.target.value.split('\n')
    setOriginal(items)
  }

  const handleTranslate = async () => {
    const uniqueItems = [...new Set(original)]
    setOriginal(uniqueItems)
    
    const fwTranslated = await translate(uniqueItems, sourceLang, targetLang)
    setTranslation(fwTranslated)
  }

  const handleBacktranslate = async () => {
    let backtranslateTo = sourceLang

    /* 
      Deepl target language cannot be EN, has to be either EN-GB or -US 
      Annoying, because source lang has to be EN, and cannot be EN-GB or -US
    */
   
    if (sourceLang.includes('EN')) {
      backtranslateTo = 'EN-US'
    }

    const bTranslated = await translate(translation, targetLang, backtranslateTo)
    setBackTranslation(bTranslated)
  }

  const handleEvaluate = async () => {
    setIsEvaluating.on()
    setEvaluationResult([])
    await handleBacktranslate()

    const evaluation = await evaluate(original, translation, backTranslation, sourceLang, targetLang)
    setEvaluationResult([
      { title: "GEMBA-DA", score: parseInt(evaluation.gemba)},
      { title: "SSA", score: parseInt(evaluation.semantic.score), suggestions: evaluation.semantic.suggestions, reasoning: evaluation.semantic.reasoning}
    ])
    setIsEvaluating.off()
  }

  const handleReset = async () => {
    setBackTranslation([])
    setEvaluationResult([])
    await handleTranslate()
  }

  const handleFullReset = async () => {
    setOriginal([])
    setTranslation([])
    setBackTranslation([])
    setEvaluationResult([])
  }

  return (
    <Flex flexDir='column' justifyContent='flex-start' width={['95%', '95%', '80%', '50%']}>
      <Flex mt="4rem" flexDir='row' justifyContent='space-between' alignItems='center'>
        <Heading fontSize='4xl'>Questionnaire Translator</Heading>
        {translation.length > 0 && <Button rightIcon={<DeleteIcon />} colorScheme='red' onClick={handleFullReset}>Start over</Button>}
      </Flex>
      <Divider mt="1rem" mb="4rem"/>
      {(translation.length < 1)
        ? <>
          <HStack align="stretch" spacing="4rem">
            <VStack align="start" spacing="0.25rem" width="50%">
              <Text>Translate from:</Text>
              <LangSelectDropdown handleSelect={setSourceLang} defaultValue={sourceLang} />
            </VStack>
            <VStack align="start" spacing="0.25rem" width="50%">
              <Text>Translate to:</Text>
              <LangSelectDropdown handleSelect={setTargetLang} defaultValue={targetLang} />
            </VStack>
          </HStack>
          <Divider mt="2rem" mb="2rem"/>
          <Text mb="0.25rem">Enter questionnaire items:</Text>
          <Textarea 
            height="lg"
            onChange={handleInput}
            value={original.join('\n')} mb='2em'
            placeholder={'Questionnaire items separated by a newline, e.g. \n\nThis is a questionnaire item.\nThis is another questionnaire item.\nThis is a third questionnaire item.'}
          />
          <Button onClick={handleTranslate}>Translate</Button>
        </>
        : <> 
          <TranslationView 
            originalList={original} 
            translationList={translation} 
            setTranslationList={setTranslation} 
            backTranslationList={backTranslation}
            backTranslate={handleBacktranslate}
            reset={handleReset}
            evaluate={handleEvaluate}
          />
          {isEvaluating && <Spinner size='xl' alignSelf='center' mt='2rem' thickness='4px' color='teal.400'/>}
          {evaluationResult.length > 0 && <EvaluationResultList results={evaluationResult} />}
        </>
      }
    </Flex>
  )
}

export default App