import { React, useState } from 'react'
import { Button, Flex, Text, Textarea } from '@chakra-ui/react'

const baseURL = import.meta.env.VITE_API_URL

const App = () => {
  const [original, setOriginal] = useState('')
  const [translated, setTranslated] = useState('')

  const handleInput = (e) => {
    const newValue = e.target.value
    setOriginal(newValue)
  }

  const handleTranslate = async () => {
    const response = await fetch(`${baseURL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [original],
        listType: 'single',
        sourceLang: 'EN',
        targetLang: 'FI'
      }),
    })

    const result = await response.json()
    setTranslated(result.translated)
  }

  return (
    <Flex flexDir='column' justifyContent='center' width="50%">
      <Text fontSize='4xl'>Translator</Text>
      <Textarea onChange={handleInput} value={original} />
      <Textarea isDisabled={true} value={translated} onChange={() => {}}/>
      <Button onClick={handleTranslate}>Translate</Button>
    </Flex>
  )
}

export default App