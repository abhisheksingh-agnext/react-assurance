import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import * as FaIcons from "react-icons/fa";

/**
 * Timeline navigation component displays the progress bar and stage icons
 * @param {Object} props - Component props
 * @param {Array} props.stages - Array of stage data
 * @param {number} props.currentStep - Current active step
 * @param {Function} props.onStepChange - Function to handle step change
 * @returns {JSX.Element} Timeline navigation component
 */
const TimelineNavigation = ({ stages, currentStep, onStepChange }) => {
  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (stages.length - 1)) * 100;

  // Get icon component from string name
  const getIconComponent = (iconName) => {
    return FaIcons[iconName] || FaIcons.FaCircle;
  };

  return (
    <Box mb={8} mt={4} px={6}>
      <Flex justify="center" position="relative">
        <Flex w="full" justify="space-between" position="relative">
          {/* Progress Track */}
          <Box
            position="absolute"
            h="2px"
            bg="green.200"
            top="18px"
            left="40px"
            right="40px"
            zIndex={1}
          />
          <Box
            position="absolute"
            h="2px"
            bg="green.500"
            top="18px"
            left="40px"
            width={`${progressPercentage}%`}
            zIndex={1}
            transition="width 0.3s ease"
          />

          {/* Steps */}
          {stages.map((stage) => (
            <Flex
              key={stage.id}
              direction="column"
              align="center"
              zIndex={2}
              flex={1}
              cursor="pointer"
              onClick={() => onStepChange(stage.id)}
            >
              <Box
                bgGradient={
                  currentStep >= stage.id 
                    ? "linear(to-br, green.500, green.300)"
                    : "linear(to-br, gray.400, gray.300)"  
                }
                rounded="full"
                color="white"
                mb={2}
                position="relative"
                transition="background-color 0.3s ease"
                aspectRatio={1}
                w={10}  
                h={10}  
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={getIconComponent(stage.icon)} boxSize={4} />

                {/* Small checkmark badge */}
                {currentStep > stage.id && (
                  <Box
                    position="absolute"
                    bg="green.500"
                    w="18px"
                    h="18px"
                    rounded="full"
                    top={-1}
                    right={-1}
                    borderWidth={2}
                    borderColor="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CheckIcon color="white" fontSize="10px" />
                  </Box>

                  
                )}
              </Box>

              <Text
                fontSize="sm"
                fontWeight={currentStep === stage.id ? "bold" : "medium"}
                color={currentStep === stage.id ? "green.600" : "gray.600"}
                textAlign="center"
              >
                {stage.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TimelineNavigation; 