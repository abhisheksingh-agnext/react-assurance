import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { 
    FaStore,
  } from "react-icons/fa";
/**
 * StageTimeline component that displays a timeline view of stages
 * @param {Object} props - Component props
 * @param {Array} props.stages - Array of stage objects
 * @param {number} props.currentStage - Current active stage
 * @returns {JSX.Element} StageTimeline component
 */
const StageTimeline = ({ stages, currentStage }) => {
  // Calculate progress percentage
  const progressPercentage = ((currentStage - 1) / (stages.length - 1)) * 100;

  return (
    <Box mb={8} mt={4} px={6}>
      <Flex justify="center" position="relative">
        <Flex w="full" justify="space-between" position="relative">
          {/* Progress Track */}
          <Box
            position="absolute"
            h="2px"
            bg="gray.200"
            top="18px"
            left="40px"
            right="40px"
            zIndex={1}
          />
          <Box
            position="absolute"
            h="2px"
            bg="blue.500"
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
            >
              <Box
                bgGradient={"linear(to-br, gray.500, gray.300)"  }
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
                <Icon as={FaStore} boxSize={4} />

        
              </Box>

            

              {/* Stage Label */}
              <Badge
                mt={1}
                px={2}
                py={1}
                bg="white"
                color="gray.600"
                fontWeight="medium"
                fontSize="xs"
                borderRadius="full"
                boxShadow="sm"
                borderWidth={1}
                borderColor="gray.200"
                minWidth="50px" 
                minHeight="30px"
                textAlign="center"
              >
                {stage.name}
              </Badge>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default StageTimeline; 