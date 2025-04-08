import React from "react";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import StageCard from "./StageCard";

/**
 * StageCardsContainer component that displays all stage cards in a container
 * @param {Object} props - Component props
 * @param {Array} props.stages - Array of stage data
 * @param {number} props.currentStep - Current active step
 * @param {Function} props.onMapClick - Function to handle map preview clicks
 * @param {Object} props.containerRef - Reference to the container element
 * @returns {JSX.Element} The StageCardsContainer component
 */
export default function StageCardsContainer({
  stages,
  currentStep,
  onMapClick,
  containerRef
}) {
  return (
    <Box
      ref={containerRef}
      w="full"
      overflowX="auto"
      overflowY="hidden"
      pb={6}
      flex="1"
      css={{
        '&::-webkit-scrollbar': {
          height: '8px',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        '-ms-overflow-style': 'none',
        'scrollbarWidth': 'thin',
        'scrollbarColor': 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05)',
      }}
    >
      <Flex
        direction="row"
        minW="max-content"
        p={2}
        align="flex-start"
        height="100%"
        gap={8}
        px={8}
      >
        {stages.map((stage) => (
          <StageCard
            key={stage.id}
            stage={stage}
            isActive={currentStep === stage.id}
            onMapClick={onMapClick}
          />
        ))}
      </Flex>
    </Box>
  );
} 