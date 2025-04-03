import React from "react";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import StageCard from "./StageCard";

/**
 * Stage cards container component for displaying all stage cards
 * @param {Object} props - Component props
 * @param {Array} props.stages - Array of stage data
 * @param {number} props.currentStep - Current active step
 * @param {Function} props.onMapClick - Function to handle map preview click
 * @param {React.RefObject} props.containerRef - Reference to the container element
 * @returns {JSX.Element} Stage cards container component
 */
const StageCardsContainer = ({ stages, currentStep, onMapClick, containerRef }) => (
  <Box 
    ref={containerRef}
    overflowX="auto"
    overflowY="visible"
    whiteSpace="nowrap"
    flex="1"
    css={{
      '&::-webkit-scrollbar': {
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }}
    pb={4}
    px={6}
    pt={8}
  >
    <Flex 
      display="inline-flex" 
      minW="100%" 
      spacing={6}
      pb={2}
      position="relative"
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

export default StageCardsContainer; 