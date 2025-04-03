import { Box, Text, Input, IconButton, Flex } from "@chakra-ui/react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { AddIcon, CloseIcon, DragHandleIcon } from "@chakra-ui/icons";

/**
 * StageWidget component that displays a single stage with its services
 * @param {Object} props - Component props
 * @param {Object} props.stage - Stage object containing id, name, detail, and services
 * @param {number} props.index - Index of the stage in the stages array
 * @param {Function} props.updateStageName - Function to update stage name
 * @param {Function} props.updateStageDetail - Function to update stage details
 * @param {Function} props.removeService - Function to remove a service from the stage
 * @param {Function} props.addStageAfter - Function to add a new stage after this one
 * @param {Function} props.removeStage - Function to remove this stage
 * @param {boolean} props.isDraggingService - Flag indicating if a service is being dragged
 * @returns {JSX.Element} The StageWidget component
 */
export default function StageWidget({
  stage,
  index,
  updateStageName,
  updateStageDetail,
  removeService,
  addStageAfter,
  removeStage,
  isDraggingService
}) {
  return (
    <Draggable
      draggableId={`stage-draggable-${stage.id}`}
      index={index}
      isDragDisabled={isDraggingService}
    >
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          key={stage.id}
          w="350px"
          minW="350px"
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          overflow="hidden"
          mr={6}
          mb={2}
          position="relative"
          transition="box-shadow 0.2s"
          _hover={{
            boxShadow: "lg"
          }}
          height="600px"
          maxH="80vh"
          display="flex"
          flexDirection="column"
        >
          {/* Stage Control Buttons */}
          <IconButton
            icon={<AddIcon />}
            size="sm"
            colorScheme="green"
            aria-label="Add stage after"
            position="absolute"
            top={2}
            right={12}
            zIndex={2}
            onClick={(e) => {
              e.stopPropagation();
              addStageAfter(stage.id);
            }}
            _hover={{ bg: "green.500" }}
            title="Add stage after this one"
          />
          <IconButton
            icon={<CloseIcon />}
            size="sm"
            colorScheme="red"
            aria-label="Remove stage"
            position="absolute"
            top={2}
            right={2}
            zIndex={2}
            onClick={() => removeStage(stage.id)}
            _hover={{ bg: "red.500" }}
            title="Remove stage"
          />

          {/* Stage Header */}
          <Box
            {...provided.dragHandleProps}
            bgGradient={
             "linear(to-br, gray.500, gray.300)"  
            }
            color="white"
            p={4}
            fontWeight="bold"
            cursor="grab"
            display="flex"
            alignItems="center"
            flexShrink={0}
          >
            <DragHandleIcon mr={2} />
            <Input
              value={stage.name}
              onChange={(e) => updateStageName(stage.id, e.target.value)}
              color="white"
              fontWeight="bold"
              variant="flushed"
              placeholder="Stage name"
              size="lg"
              _placeholder={{ color: "gray.200" }}
              borderColor="blue.400"
              mb={0}
              onClick={(e) => e.stopPropagation()}
            />
          </Box>

          {/* Stage Content */}
          <Box p={5} display="flex" flexDirection="column" height="calc(100% - 60px)">
            <Input
              value={stage.detail}
              onChange={(e) => updateStageDetail(stage.id, e.target.value)}
              placeholder="Enter stage details"
              size="md"
              mb={5}
              borderColor="gray.300"
              fontWeight="medium"
            />

            <Flex justify="space-between" mb={4} align="center">
              <Text fontWeight="medium">Services Required:</Text>
              <Text fontSize="sm" color="gray.500">
                {stage.services.length} services
              </Text>
            </Flex>

            {/* Droppable Area for Services */}
            <Droppable droppableId={`stage-${stage.id}`}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  minH="200px"
                  flex="1"
                  bg={snapshot.isDraggingOver ? "blue.50" : "gray.50"}
                  borderRadius="md"
                  border="2px dashed"
                  borderColor={snapshot.isDraggingOver ? "blue.300" : "gray.300"}
                  p={3}
                  display="flex"
                  flexDirection="column"
                  alignItems="stretch"
                  gap={2}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseOver={(e) => e.stopPropagation()}
                  onMouseMove={(e) => isDraggingService && e.stopPropagation()}
                  transition="all 0.2s"
                  zIndex={snapshot.isDraggingOver ? 10 : 1}
                  overflowY="auto"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '6px',
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
                    'scrollbarWidth': 'thin',
                    'scrollbarColor': 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {stage.services.length > 0 ? (
                    stage.services.map(service => (
                      <Box
                        key={service.uniqueId || service.id}
                        bg="blue.100"
                        p={2}
                        pr={7}
                        borderRadius="md"
                        position="relative"
                        boxShadow="sm"
                        _hover={{ bg: "blue.200" }}
                        transition="all 0.2s"
                        width="100%"
                        pointerEvents="auto"
                      >
                        <Text fontWeight="medium">{service.name}</Text>
                        <IconButton
                          icon={<CloseIcon />}
                          size="xs"
                          colorScheme="red"
                          position="absolute"
                          top={2}
                          right={2}
                          aria-label="Remove service"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeService(stage.id, service.uniqueId);
                          }}
                        />
                      </Box>
                    ))
                  ) : (
                    <Text color="gray.400" alignSelf="center" mx="auto" my={10}>
                      Drag services here
                    </Text>
                  )}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        </Box>
      )}
    </Draggable>
  );
} 