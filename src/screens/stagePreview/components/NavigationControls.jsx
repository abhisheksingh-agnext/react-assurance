import React from "react";
import {
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

/**
 * Navigation controls component for moving between stages
 * @param {Object} props - Component props
 * @param {number} props.currentStep - Current active step
 * @param {number} props.totalSteps - Total number of steps
 * @param {Function} props.onPrevStep - Function to handle previous step
 * @param {Function} props.onNextStep - Function to handle next step
 * @returns {JSX.Element} Navigation controls component
 */
const NavigationControls = ({ currentStep, totalSteps, onPrevStep, onNextStep }) => (
  <Flex justify="center" mt={4} mb={4}>
    <Flex
      bg="white"
      borderRadius="full"
      shadow="md"
      p={2}
      position="relative"
    >
      <IconButton
        icon={<ChevronLeftIcon />}
        size="sm"
        variant="ghost"
        borderRadius="full"
        color="green.500"
        aria-label="Previous stage"
        isDisabled={currentStep === 1}
        onClick={onPrevStep}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        size="sm"
        variant="ghost"
        borderRadius="full"
        color="green.500"
        aria-label="Next stage"
        ml={2}
        isDisabled={currentStep === totalSteps}
        onClick={onNextStep}
      />
    </Flex>
  </Flex>
);

export default NavigationControls; 