import { React } from 'react'
import { Flex, VStack, Button, HStack, Divider, Box, AbsoluteCenter, Heading } from '@chakra-ui/react'
import TranslationResultField from './TranslationResultField'
import BacktranslationResultField from './BacktranslationResultField'
import ExportControls from './ExportControls'
import { RepeatClockIcon, RepeatIcon } from '@chakra-ui/icons'

const TranslationView = ({ originalList, translationList, setTranslationList, backTranslationList, backTranslate, reset }) => {

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
      <HStack align="stretch" spacing="2rem">
        <VStack width='50%' align="start">
        <Heading size='md'>Tweak translation</Heading>
          <Divider mt="0.1rem" mb="1rem"/>
          {translationList.map((i) => {
            return <TranslationResultField key={`tl-result-${translationList.indexOf(i)}`} result={i} handleTweak={tweakTranslationItem} />
          })}
        </VStack>
        <Box position='relative' mx='4rem' height='100%'>
          <Divider orientation='vertical'/>
          <AbsoluteCenter bg='white' p='1rem'>
            <VStack>
              <Button rightIcon={<RepeatIcon />} onClick={backTranslate} width="10rem">Backtranslate</Button>
              <Button rightIcon={<RepeatClockIcon />} onClick={reset} width="10rem" variant='outline'>{'Reset'}</Button>
            </VStack>
          </AbsoluteCenter>
        </Box>
        <VStack width='50%' align='start'>
          <Heading size='md'>Compare original & backtranslation</Heading>
          <Divider mt="0.1rem" mb="1rem"/>
          {backTranslationList.length < 1
            ? originalList.map((i) => {
              return <TranslationResultField key={`og-item-${originalList.indexOf(i)}`} result={i} disabled={true} handleTweak={undefined}/>
            })
            : backTranslationList.map((i) => {
              return <BacktranslationResultField key={`bt-item-${backTranslationList.indexOf(i)}`} result={i} original={originalList[backTranslationList.indexOf(i)]} list={backTranslationList} />
            })
          }
        </VStack>
      </HStack>
      <ExportControls originalItems={originalList} translatedItems={translationList} />
    </>
  )
}

export default TranslationView