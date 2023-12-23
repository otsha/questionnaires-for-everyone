import { React, useEffect } from 'react'
import { Flex, VStack, Button, useBoolean, Switch } from '@chakra-ui/react'
import TranslationResultField from './TranslationResultField'

const TranslationView = ({ originalList, translationList, setTranslationList, backTranslationList, backTranslate }) => {
  const [showOriginal, setShowOriginal] = useBoolean(true)

  useEffect(() => {
    console.log('bt changed')
  }, [backTranslationList])

  const tweakTranslationItem = (oldItem, newItem) => {
    const newList = translationList.map((i) => {
      if (i === oldItem) {
        return newItem
      } else {
        return i
      }
    })

    setTranslationList(newList)
  }

  const handleBacktranslate = () => {
    setShowOriginal.off()
    backTranslate()
  }

  return (
    <Flex flexDir='row' justifyContent='top'>
      <Switch isChecked={showOriginal} onChange={setShowOriginal.toggle} />
      <VStack width='50%'>
        {showOriginal
          ? originalList.map((i) => {
            return <TranslationResultField key={`og-item-${originalList.indexOf(i)}`} result={i} disabled={true} handleTweak={undefined}/>
          })
          : backTranslationList.map((i) => {
            return <TranslationResultField key={`bt-item-${backTranslationList.indexOf(i)}`} result={i} disabled={true} handleTweak={undefined}/>
          })
        }
      </VStack>
      <Button onClick={handleBacktranslate}>Reverse</Button>
      <VStack width='50%'>
        {translationList.map((i) => {
          return <TranslationResultField key={`tl-result-${translationList.indexOf(i)}`} result={i} handleTweak={tweakTranslationItem} />
        })}
      </VStack>
    </Flex>
  )
}

export default TranslationView