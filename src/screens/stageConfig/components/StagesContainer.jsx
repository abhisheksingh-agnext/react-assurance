import { Box, Flex, Text, IconButton, Heading } from "@chakra-ui/react";
import { Droppable } from "@hello-pangea/dnd";
import { AddIcon } from "@chakra-ui/icons";
import StageWidget from "./StageWidget";

/**
 * StagesContainer component that displays the horizontal scrollable container for stages
 * @param {Object} props - Component props
 * @param {Array} props.stages - Array of stage objects
 * @param {Function} props.updateStageName - Function to update stage name
 * @param {Function} props.updateStageDetail - Function to update stage details
 * @param {Function} props.removeService - Function to remove a service from a stage
 * @param {Function} props.addStageAfter - Function to add a new stage after a specified stage
 * @param {Function} props.removeStage - Function to remove a stage
 * @param {Function} props.addStage - Function to add a new stage
 * @param {boolean} props.isDraggingService - Flag indicating if a service is being dragged
 * @returns {JSX.Element} The StagesContainer component
 */
export default function StagesContainer({
  stages,
  updateStageName,
  updateStageDetail,
  removeService,
  addStageAfter,
  removeStage,
  addStage,
  isDraggingService
}) {
  return (
    <Flex
      flex={1}
      p={10}
      direction="column"
      align="center"
      bg="white"
      overflow="hidden"
      height="100%"
    >
      <Box w="full" mb={4}>
        <Flex w="full" justify="space-between" align="center" mb={4}>
          <Heading size="lg" color="gray.700">Stage Configuration</Heading>
          <IconButton
            icon={<AddIcon />}
            colorScheme="blue"
            size="md"
            aria-label="Add stage"
            onClick={addStage}
            _hover={{ bg: "blue.600" }}
            title="Add Stage" 
          />
        </Flex>

        {/* Scroll indicator */}
        {stages.length > 1 && (
          <Text fontSize="sm" color="gray.500" mb={2} alignSelf="flex-end" textAlign="right" width="full">
            ← Scroll horizontally to see all stages →
          </Text>
        )}
      </Box>

      {/* Horizontal Scrollable Container for Stages */}
      <Box
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
        <Droppable
          droppableId="stagesContainer"
          direction="horizontal"
          isDropDisabled={isDraggingService}
        >
          {(provided) => (
            <Flex
              ref={provided.innerRef}
              {...provided.droppableProps}
              direction="row"
              minW="max-content"
              p={2}
              align="flex-start"
              height="100%"
            >
              {stages.map((stage, index) => (
                <StageWidget
                  key={stage.id}
                  stage={stage}
                  index={index}
                  updateStageName={updateStageName}
                  updateStageDetail={updateStageDetail}
                  removeService={removeService}
                  addStageAfter={addStageAfter}
                  removeStage={removeStage}
                  isDraggingService={isDraggingService}
                />
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Box>
    </Flex>
  );
} 