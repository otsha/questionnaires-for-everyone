import { React } from 'react'
import { VStack, Button, HStack, Divider, Box, AbsoluteCenter, Heading, Tooltip, useBoolean } from '@chakra-ui/react'
import TranslationResultField from './TranslationResultField'
import BacktranslationResultField from './BacktranslationResultField'
import ExportControls from './ExportControls'
import { ChatIcon, RepeatIcon } from '@chakra-ui/icons'
import ResetButton from '../ResetButton'

const TranslationView = ({ originalList, translationList, setTranslationList, backTranslationList, backTranslate, reset, evaluate }) => {
  const [leftSideUpdating, setLeftSideUpdating] = useBoolean(false)
  const [rightSideUpdating, setRightSideUpdating] = useBoolean(false)

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

  const handleLoad = async (handleAction, rightOnly) => {
    setRightSideUpdating.on()
    !rightOnly && setLeftSideUpdating.on()
    await handleAction()
    setTimeout(() => {
      setRightSideUpdating.off()
      !rightOnly && setLeftSideUpdating.off()
    }, 1000)
  }

  return (
    <>
      <HStack align="stretch" spacing="2rem">
        <VStack width='50%' align="start">
        <Heading size='md'>Tweak translation</Heading>
          <Divider mt="0.1rem" mb="1rem"/>
          {translationList.map((i) => {
            return <TranslationResultField key={`tl-result-${translationList.indexOf(i)}`} result={i} handleTweak={tweakTranslationItem} loading={leftSideUpdating}/>
          })}
        </VStack>
        <Box position='relative' mx='4rem' height='100%'>
          <Divider orientation='vertical'/>
          <AbsoluteCenter bg='white' p='1rem'>
            <VStack>
              <Tooltip label='Translates the translation back to the original language for comparison.'>
                <Button rightIcon={<RepeatIcon />} onClick={() => handleLoad(backTranslate, true)} width="10rem" colorScheme='teal'>Backtranslate</Button>
              </Tooltip>
              <Tooltip label='Propmpts GPT-4 to assess the translation quality.'>
                <Button rightIcon={<ChatIcon />} onClick={() => handleLoad(evaluate, false)} width="10rem" colorScheme='teal' variant='outline'>Evaluate</Button>
              </Tooltip>
              <ResetButton handleReset={() => handleLoad(reset, false)} />
            </VStack>
          </AbsoluteCenter>
        </Box>
        <VStack width='50%' align='start'>
          <Heading size='md'>Compare to original</Heading>
          <Divider mt="0.1rem" mb="1rem"/>
          {backTranslationList.length < 1
            ? originalList.map((i) => {
              return <TranslationResultField key={`og-item-${originalList.indexOf(i)}`} result={i} disabled={true} handleTweak={undefined} loading={rightSideUpdating}/>
            })
            : backTranslationList.map((i) => {
              return <BacktranslationResultField key={`bt-item-${backTranslationList.indexOf(i)}`} result={i} original={originalList[backTranslationList.indexOf(i)]} list={backTranslationList} loading={rightSideUpdating}/>
            })
          }
        </VStack>
      </HStack>
      <ExportControls originalItems={originalList} translatedItems={translationList} />
    </>
  )
}

export default TranslationView