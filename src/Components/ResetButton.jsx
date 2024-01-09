import { React } from 'react'
import { Button, Tooltip, useBoolean } from '@chakra-ui/react'
import { RepeatClockIcon } from '@chakra-ui/icons'

const ResetButton = ({ handleReset }) => {
  const [isResetting, setIsResetting] = useBoolean(false)

  const reset = () => {
    handleReset()

    setIsResetting.on()
    setTimeout(() => {
      setIsResetting.off()
    }, 500)
  }

  return (
    <Tooltip label='Resets the translation back to the initial translation.'>
      <Button 
        rightIcon={<RepeatClockIcon />} 
        onClick={reset} 
        width="10rem" 
        variant='outline'
        isLoading={isResetting}
      >
        Reset
      </Button>
    </Tooltip>
  )
}
  
export default ResetButton