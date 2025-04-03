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
 * Stage card component displaying information for a single stage
 * @param {Object} props - Component props
 * @param {Object} props.stage - Stage data
 * @param {boolean} props.isActive - Whether this stage is currently active
 * @param {Function} props.onMapClick - Function to handle map preview click
 * @returns {JSX.Element} Stage card component
 */
const StageCard = ({ stage, isActive, onMapClick }) => (
  <Box
    className="stage-card"
    minW="350px"
    maxW="350px"
    mx={3}
    opacity={isActive ? 1 : 0.7}
    transform={isActive ? "scale(1.05)" : "scale(1)"}
    transition="all 0.3s ease"
    boxShadow={isActive ? "lg" : "md"}
    borderRadius="lg"
    overflow="visible"
    bg="white"
    position="relative"
    zIndex={isActive ? 2 : 1}
    pt={6}
  >
    {/* Phase Label */}
    <Flex justify="center" position="absolute" top={-3} left="50%" transform="translateX(-50%)">
      <Badge
        px={3}
        py={1}
        bg="white"
        color="gray.600"
        fontWeight="medium"
        fontSize="sm"
        borderRadius="full"
        boxShadow="sm"
        borderWidth={1}
        borderColor="gray.200"
      >
        {stage.phase}
      </Badge>
    </Flex>

    {/* Card Header */}
    <Flex
      align="center"
      p={4}
      borderBottomWidth={1}
      bg={isActive ? "green.50" : "white"}
    >
      <Flex
       bgGradient={isActive 
        ? "linear(to-r, green.500, green.300)" 
        : "linear(to-r, gray.500, gray.300)"}  
        color="white"
        p={2}
        borderRadius="md"
        mr={3}
      >
        <Icon as={stage.icon} boxSize={5} />
      </Flex>
      <Box flex={1}>
        <Text fontWeight="bold" fontSize="lg">{stage.name}</Text>
        <Flex align="center" mt={1} color="gray.500" fontSize="sm">
          <Icon as={FaMapMarkerAlt} mr={1} />
          <Text>{stage.location}</Text>
        </Flex>
      </Box>
      <Box
        bg="gray.100"
        borderRadius="md"
        p={1}
        cursor="pointer"
        onClick={() => onMapClick(stage.location, stage.mapUrl)}
      >
        <Icon as={FaMapMarkerAlt} color="gray.500" />
      </Box>
    </Flex>

    {/* Summary Section */}
    <Box p={4} borderRadius="lg"
      boxShadow="-3px 0px 0px rgba(34, 197, 94, 0.5)"  
      bg="gray.100"
      borderWidth={1}
      m={2}
    >
      <Flex align="center" mb={3}>
        <Box
          bg="orange.100"
          p={1}
          borderRadius="md"
          fontSize="xs"
          fontWeight="bold"
          color="orange.700"
          mr={2}
        >
          SUMMARY
        </Box>
        <Box flex={1} h="1px" bg="gray.200" />
      </Flex>

      <VStack align="stretch" spacing={3}>
        {stage.summaryItems.map((item, i) => (
          <Flex key={i} align="center" fontSize="sm">
            <Box w="2px" h="2px" bg="green.500" borderRadius="full" mr={2} />
            <Text flex={1} color="gray.600">{item.label}:</Text>
            <Badge
              bg="rgba(116, 198, 157, 0.2)"
              color="green.900"
              variant="subtle"
              px={2}
              py={1}
              borderRadius="md"
              fontWeight="medium"
              borderWidth={1}
              borderColor="green.200"
            >
              {item.value}
            </Badge>
            <Text ml={4} fontSize="xs" color="gray.500" noOfLines={2}>{item.suffix}</Text>
          </Flex>
        ))}
      </VStack>
      <Box flex={1} h="1px" bg="gray.200" mt={1} />

    </Box>

    {/* Quality Checks Section */}
    <Box p={4}
      borderRadius="lg"
      boxShadow="-3px 0px 0px rgba(34, 197, 94, 0.5)"  
      bg="gray.100"
      borderWidth={1}
      m={2}
    >
      <Flex align="center" mb={3}>
        <Box
          bg="orange.100"
          p={1}
          borderRadius="md"
          fontSize="xs"
          fontWeight="bold"
          color="orange.700"
          mr={2}
        >
          QUALITY CHECKS
        </Box>
        <Box flex={1} h="1px" bg="gray.200" />
      </Flex>

      <VStack align="stretch" spacing={3}>
        {stage.qualityChecks.map((check, i) => (
          <Flex key={i} align="center" fontSize="sm">
            <CheckIcon color="green.500" mr={2} boxSize={3} />
            <Text flex={1} color="gray.600">{check.label}:</Text>
            <Badge
              bg="rgba(116, 198, 157, 0.2)"
              color="green.900"
              variant="subtle"
              px={2}
              py={1}
              borderRadius="md"
              fontWeight="medium"
              borderWidth={1}
              borderColor="green.200"
            >
              {check.value}
            </Badge>
            <Text ml={2} fontSize="xs" color="gray.500" noOfLines={2}>{check.suffix}</Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  </Box>
);

export default StageCard; 