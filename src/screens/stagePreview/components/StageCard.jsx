import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";

/**
 * StageCard component that displays information for a single stage
 * @param {Object} props - Component props
 * @param {Object} props.stage - Stage data
 * @param {boolean} props.isActive - Whether this stage is currently active
 * @param {Function} props.onMapClick - Function to handle map preview clicks
 * @returns {JSX.Element} The StageCard component
 */
export default function StageCard({ stage, isActive, onMapClick }) {
  return (
    <Box
      className="stage-card"
      w="350px"
      h="500px"
      bg="white"
      borderRadius="lg"
      boxShadow={isActive ? "lg" : "md"}
      transform={isActive ? "scale(1.01)" : "scale(1)"}
      transition="all 0.2s"
      overflow="visible"
      position="relative"
      pt={10}
      borderWidth={isActive ? "2px" : "1px"}
      borderColor={isActive ? "green.500" : "gray.200"}
      display="flex"
      flexDirection="column"
    >
      {/* Phase Label */}
      <Badge
        position="absolute"
        top={-2}
        left="50%"
        transform="translateX(-50%)"
        colorScheme="green"
        px={3}
        py={1}
        borderRadius="full"
        textTransform="none"
        fontWeight="medium"
        fontSize="sm"
        borderWidth={1}
        borderColor="green.200"
        zIndex={2}
        boxShadow="sm"
      >
        {stage.phase}
      </Badge>

      {/* Card Header */}
      <Box p={6} pb={4} flex="0 0 auto">
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontSize="xl" fontWeight="bold" color="gray.700">
            {stage.name}
          </Text>
          <Icon
            as={FaMapMarkerAlt}
            boxSize={5}
            color="blue.500"
            cursor="pointer"
            onClick={() => onMapClick(stage.location, stage.mapUrl)}
            _hover={{ color: "blue.600" }}
          />
        </Flex>
        <Text color="gray.500" fontSize="sm" mb={4}>
          {stage.detail}
        </Text>
      </Box>

      {/* Services Section */}
      <Box p={6} pt={0} flex="1" overflowY="auto">
        <VStack align="stretch" spacing={4} height="100%">
          <Box>
            <Text fontWeight="semibold" color="gray.600" mb={2}>
              Services Required
            </Text>
            {stage.services && stage.services.map((service, index) => (
              <Flex
                key={service.uniqueId || index}
                align="center"
                bg="blue.50"
                p={2}
                borderRadius="md"
                mb={2}
              >
                <CheckIcon color="green.500" mr={2} />
                <Text color="gray.700" fontSize="sm">
                  {service.name}
                </Text>
              </Flex>
            ))}
            {(!stage.services || stage.services.length === 0) && (
              <Text color="gray.500" fontSize="sm" fontStyle="italic">
                No services configured
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
} 