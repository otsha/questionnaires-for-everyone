import { React } from 'react'
import { VStack, Button, HStack, Divider, Heading, Tooltip, useBoolean, Flex } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import TranslationResultField from './TranslationResultField'
import BacktranslationResultField from './BacktranslationResultField'
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
    <Flex flexDir='column' justify='center' align='stretch'>
      <HStack align="stretch" spacing="2rem" height='100%'>
        <VStack width='50%' align="start">
          <Heading size='md'>Tweak the translation</Heading>
          <Divider mt="0.1rem" mb="1rem"/>
          {translationList.map((i) => {
            return <TranslationResultField key={`tl-result-${translationList.indexOf(i)}`} result={i} handleTweak={tweakTranslationItem} loading={leftSideUpdating}/>
          })}
        </VStack>
        <Divider orientation='vertical' />
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
      <HStack justify='center' mt="2rem">
        <ResetButton handleReset={() => handleLoad(reset, false)} />
        <Tooltip label='Translates the translation back to the original language for comparison.'>
          <Button rightIcon={<RepeatIcon />} onClick={() => handleLoad(backTranslate, true)} width="10rem" colorScheme='teal'>Backtranslate</Button>
        </Tooltip>
        <Tooltip label='Prompts GPT-4 to assess the translation quality by comparing the target language version against the original.'>
          <Button rightIcon={<ChatIcon />} onClick={() => handleLoad(evaluate, false)} width="10rem" colorScheme='orange' variant='solid'>Evaluate</Button>
        </Tooltip>
      </HStack>
    </Flex>
  )
}

export default TranslationView