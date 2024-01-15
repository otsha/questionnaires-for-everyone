import { Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, Box, StepSeparator, StepTitle, StepDescription, useSteps } from "@chakra-ui/react";

const steps = [
  { title: 'First', description: 'Enter questionnaire items to translate' },
  { title: 'Second', description: 'Edit and evaluate the translation' }
]

const Progress = ({activeStep}) => {
  return (<Stepper index={activeStep}>
      <Step key={activeStep}>
        <StepIndicator>
          <StepStatus 
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>

        <Box flexShrink='0'>
          <StepTitle>{steps[activeStep].title}</StepTitle>
          <StepDescription>{steps[activeStep].description}</StepDescription>
        </Box>
      </Step>
  </Stepper>)
}

export default Progress