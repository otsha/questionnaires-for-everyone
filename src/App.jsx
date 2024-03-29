import { React, useState } from 'react'
import { Button, Flex, Text, Textarea, HStack, VStack, Divider, Heading, useBoolean, Stack, Alert, AlertIcon, Tooltip, Progress } from '@chakra-ui/react'
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { translate, evaluate } from './Scripts/translationService'

import LangSelectDropdown from './Components/Translation/LangSelectDropdown'
import TranslationView from './Components/Translation/TranslationView'
import EvaluationResultList from './Components/Evaluation/EvaluationResultList'
import ExportControls from './Components/ExportControls'

const App = () => {
  const [original, setOriginal] = useState([])
  const [initialTranslation, setInitialTranslation] = useState([])
  const [translation, setTranslation] = useState([])
  const [backTranslation, setBackTranslation] = useState([])
  const [sourceLang, setSourceLang] = useState('EN')
  const [targetLang, setTargetLang] = useState('FI')
  const [evaluationResult, setEvaluationResult] = useState([])
  const [isEvaluating, setIsEvaluating] = useBoolean(false)
  const [isTranslating, setIsTranslating] = useBoolean(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInput = (e) => {
    const items = e.target.value.split('\n')
    setOriginal(items)
  }

  const handleTranslate = async () => {
    const uniqueItems = [...new Set(original)].filter((i) => i.length > 0)

    if (uniqueItems.length < 1) {
      showError('Please enter at least one item.')
      return
    }

    let translateTo = targetLang
    if (targetLang.includes('EN')) {
      translateTo = 'EN-US'
    } else if (targetLang.includes('PT')) {
      translateTo = 'PT-PT'
    }

    setIsTranslating.on()
    setOriginal(uniqueItems)
    const fwTranslated = await translate(uniqueItems, sourceLang, translateTo)
    
    if (translation.length < 1) {
      setInitialTranslation(fwTranslated)
    }

    setTranslation(fwTranslated)
    setIsTranslating.off()
  }

  const handleBacktranslate = async () => {
    let backtranslateTo = sourceLang

    /* 
      Deepl target language cannot be EN, has to be either EN-GB or -US 
      Annoying, because source lang has to be EN, and cannot be EN-GB or -US
    */
   
    if (sourceLang.includes('EN')) {
      backtranslateTo = 'EN-US'
    } else if (sourceLang.includes('PT')) {
      backtranslateTo = 'PT-PT'
    }

    setIsTranslating.on()
    const bTranslated = await translate(translation, targetLang, backtranslateTo)
    setBackTranslation(bTranslated)
    setIsTranslating.off()
  }

  const handleEvaluate = async () => {
    try {
      setIsEvaluating.on()
      setEvaluationResult([])
      await handleBacktranslate()

      const evaluation = await evaluate(original, translation, backTranslation, sourceLang, targetLang)
      setEvaluationResult([
        { title: "GEMBA-DA", score: parseInt(evaluation.gemba)},
        { 
          title: "SSA", 
          score: parseInt(evaluation.semantic.score), 
          suggestions: evaluation.semantic.suggestion, 
          reasoning: evaluation.semantic.reasoning
        }
      ])
      setIsEvaluating.off()
    } catch (e) {
      showError(`An error occurred, likely due to the instability of GPT-4. Please try again.\n${e}`)
      setIsEvaluating.off()
      setEvaluationResult([])
    }
  }

  const handleReset = async () => {
    setBackTranslation([])
    setEvaluationResult([])
    setTranslation(initialTranslation)
  }

  const handleFullReset = async () => {
    setOriginal([])
    setTranslation([])
    setBackTranslation([])
    setEvaluationResult([])
    setInitialTranslation([])
  }

  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(undefined), 10000)
  }

  return (
    <Flex my="2rem" py="4rem" flexDir='column' justifyContent='flex-start' width={['95%', '95%', '80%', '50%']}>
      <Text fontSize='md' color="gray.500">Questionnaire Translator</Text>
      <Divider mt="1rem" mb="1rem" />
      <Flex flexDir='row' justifyContent='space-between' alignItems='center'>
        <Heading fontSize='4xl'>{translation.length < 1 ? 'Step 1: Initial Translation' : 'Step 2: Edit & Evaluate'}</Heading>
        {translation.length > 0 &&
        <Stack direction='horizontal' height="100%" align='center'>
          <ExportControls originalItems={original} translatedItems={translation} evaluations={evaluationResult} />
          <Divider orientation='vertical' />
           <Button rightIcon={<DeleteIcon />} colorScheme='red' onClick={handleFullReset}>Start over</Button>
        </Stack>}
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
          {errorMessage && <Alert status='warning' mb="1rem" variant="left-accent"><AlertIcon />{errorMessage}</Alert>}
          <Textarea 
            height="md"
            onChange={handleInput}
            value={original.join('\n')} mb='2em'
            placeholder={'Questionnaire items separated by a newline, e.g. \n\nThis is a questionnaire item.\nThis is another questionnaire item.\nThis is a third questionnaire item.'}
          />
          <HStack align='center' alignSelf='center'>
            <Button onClick={handleTranslate} colorScheme='teal' width="12rem" alignSelf='center' isLoading={isTranslating}>Translate</Button>
            <Tooltip label='Translations are performed using DeepL.'><InfoOutlineIcon ml="0.25rem" mb="0.25rem" /></Tooltip>
          </HStack>
        </>
        : <> 
          {errorMessage && <Alert status='warning' mb="1rem" variant="left-accent"><AlertIcon />{errorMessage}</Alert>}
          <TranslationView 
            originalList={original} 
            translationList={translation} 
            setTranslationList={setTranslation} 
            backTranslationList={backTranslation}
            backTranslate={handleBacktranslate}
            reset={handleReset}
            evaluate={handleEvaluate}
            isEvaluating={isEvaluating}
            isTranslating={isTranslating}
          />
          {isEvaluating &&  <VStack mt="2rem" align="center"><Text>Evaluating. This might take a bit...</Text><Progress width="50%" isIndeterminate size="sm" colorScheme='orange'/></VStack>}
          {evaluationResult.length > 0 && <EvaluationResultList results={evaluationResult} />}
        </>
      }
    </Flex>
  )
}

export default App