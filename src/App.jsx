import { React, useState } from 'react'
import { Button, Flex, Text, Textarea, HStack, VStack, Divider, Heading } from '@chakra-ui/react'
import { translate } from './Scripts/translationService'

import LangSelectDropdown from './Components/Translation/LangSelectDropdown'
import TranslationView from './Components/Translation/TranslationView'

const App = () => {
  const [original, setOriginal] = useState([])
  const [translation, setTranslation] = useState([])
  const [backTranslation, setBackTranslation] = useState([])
  const [sourceLang, setSourceLang] = useState('EN')
  const [targetLang, setTargetLang] = useState('FI')

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

  return (
    <Flex flexDir='column' justifyContent='flex-start' width={['95%', '95%', '80%', '50%']}>
      <Heading fontSize='4xl' mt="4rem">Questionnaire Translator</Heading>
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
            />
        </>
      }
      
    </Flex>
  )
}

export default App