import { React } from 'react'
import { Flex, VStack, Button } from '@chakra-ui/react'
import TranslationResultField from './TranslationResultField'
import BacktranslationResultField from './BacktranslationResultField'
import ExportControls from './ExportControls'

const TranslationView = ({ originalList, translationList, setTranslationList, backTranslationList, backTranslate }) => {

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

  return (
    <>
      <Flex flexDir='row' justifyContent='top'>
        <VStack width='50%'>
          {backTranslationList.length < 1
            ? originalList.map((i) => {
              return <TranslationResultField key={`og-item-${originalList.indexOf(i)}`} result={i} disabled={true} handleTweak={undefined}/>
            })
            : backTranslationList.map((i) => {
              return <BacktranslationResultField key={`bt-item-${backTranslationList.indexOf(i)}`} result={i} original={originalList[backTranslationList.indexOf(i)]} list={backTranslationList} />
            })
          }
        </VStack>
        <Button onClick={backTranslate}>Reverse</Button>
        <VStack width='50%'>
          {translationList.map((i) => {
            return <TranslationResultField key={`tl-result-${translationList.indexOf(i)}`} result={i} handleTweak={tweakTranslationItem} />
          })}
        </VStack>
      </Flex>
      <ExportControls originalItems={originalList} translatedItems={translationList} />
    </>
  )
}

export default TranslationView