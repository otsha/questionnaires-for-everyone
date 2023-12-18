import { React, useState } from 'react'
import { Button, Container, Flex, Text, Textarea, VStack } from '@chakra-ui/react'
import LangSelectDropdown from './LangSelectDropdown'
import TranslationView from './TranslationView'

const baseURL = import.meta.env.VITE_API_URL

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

  const translate = async (text, from, to) => {
    const response = await fetch(`${baseURL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: text,
        listType: 'single',
        sourceLang: from,
        targetLang: to
      }),
    })

    const result = await response.json()
    return result.translated
  }

  const handleTranslate = async () => {
    const fwTranslated = await translate(original, sourceLang, targetLang)
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

  if (translation.length < 1) {
    return (
      <Flex flexDir='column' justifyContent='center' width="50%">
        <Text fontSize='4xl'>Translator</Text>
        <Text>From:</Text>
        <LangSelectDropdown handleSelect={setSourceLang} defaultValue={sourceLang} />
        <Text>To:</Text>
        <LangSelectDropdown handleSelect={setTargetLang} defaultValue={targetLang} />
        <Textarea onChange={handleInput} value={original.join('\n')} mb='2em'/>
        <Button onClick={handleTranslate}>Translate</Button>
      </Flex>
    )
  } return (
    <Flex flexDir='column' justifyContent='center' width="50%">
      <Text fontSize='4xl'>Translator</Text>
      <TranslationView 
        originalList={original} 
        translationList={translation} 
        setTranslationList={setTranslation} 
        backTranslationList={backTranslation}
        backTranslate={handleBacktranslate}
      />
    </Flex>
  )
}

export default App