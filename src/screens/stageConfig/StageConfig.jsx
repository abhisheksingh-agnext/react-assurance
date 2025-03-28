import { Box, Flex, VStack, Text, Button, IconButton, Heading, HStack, Input, Textarea } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { AddIcon, CloseIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";

/**
 * ServicesDashboard component for managing service stages configuration
 * Allows dragging services into different stages and reordering stages
 * @returns {JSX.Element} The ServicesDashboard component
 */
export default function ServicesDashboard() {
    /** @type {Array<{id: string, name: string}>} List of available services */
    const services = [
        { id: "1", name: "Farming inspection" },
        { id: "2", name: "Cold store" },
        { id: "3", name: "Bank audit" },
        { id: "4", name: "Lab certification" },
        { id: "5", name: "Commodity Analysis" },
    ];
      
    /** @type {Array<{id: number, name: string, detail: string, services: Array}>} State for managing stages */
    const [stages, setStages] = useState([
        { id: 1, name: "Stage 1", detail: "Enter stage details here", services: [] }
    ]);

    /** @type {boolean} State to track if a service is being dragged */
    const [isDraggingService, setIsDraggingService] = useState(false);

    /**
     * Handles the start of a drag operation
     * @param {Object} result - The drag start result object
     * @param {Object} result.source - Source information
     * @param {string} result.draggableId - ID of the dragged item
     */
    const onDragStart = (result) => {
        const { source, draggableId } = result;
        
        // Set flag when dragging from servicesList
        if (source.droppableId === "servicesList") {
          setIsDraggingService(true);
        }
        
        // Prevent stage dragging when dragging services
        if (draggableId.startsWith('stage-draggable-') && isDraggingService) {
          return false;
        }
    };

    /**
     * Handles the end of a drag operation
     * @param {Object} result - The drag end result object
     * @param {Object} result.source - Source information
     * @param {Object} result.destination - Destination information
     * @param {string} result.draggableId - ID of the dragged item
     */
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        
        // Reset dragging flag
        setIsDraggingService(false);
        
        // If there's no destination, we don't need to do anything
        if (!destination) return;
    
        // Prevent handling stage moves while dragging services
        if (draggableId.startsWith('stage-draggable-') && isDraggingService) {
          return;
        }
        
        // Handle service drops into stages
        if (source.droppableId === "servicesList" && destination.droppableId.startsWith("stage-")) {
          const stageId = parseInt(destination.droppableId.split("-")[1]);
          const draggedService = services.find(s => s.id === draggableId);
          
          if (draggedService) {
            setStages(stages.map(stage => {
              if (stage.id === stageId) {
                const serviceWithUniqueId = {
                  ...draggedService,
                  uniqueId: `${draggedService.id}-${Date.now()}`
                };
                return {
                  ...stage,
                  services: [...stage.services, serviceWithUniqueId]
                };
              }
              return stage;
            }));
          }
          return;
        }
        
        // Handle stage reordering only when not dragging services
        if (!isDraggingService && 
            source.droppableId === "stagesContainer" && 
            destination.droppableId === "stagesContainer") {
          const reorderedStages = Array.from(stages);
          const [removed] = reorderedStages.splice(source.index, 1);
          reorderedStages.splice(destination.index, 0, removed);
          setStages(reorderedStages);
        }
    };
    
    /**
     * Removes a service from a stage
     * @param {number} stageId - ID of the stage containing the service
     * @param {string} serviceUniqueId - Unique ID of the service to remove
     */
    const removeService = (stageId, serviceUniqueId) => {
        setStages(stages.map(stage => {
          if (stage.id === stageId) {
            return {
              ...stage,
              services: stage.services.filter(service => service.uniqueId !== serviceUniqueId)
            };
          }
          return stage;
        }));
    };

    /**
     * Adds a new stage to the configuration
     * Creates a stage with an incremented ID and default values
     */
    const addStage = () => {
        const newStageId = stages.length > 0 ? Math.max(...stages.map(s => s.id)) + 1 : 1;
        setStages([...stages, { 
          id: newStageId, 
          name: `Stage ${newStageId}`,
          detail: "Enter stage details here", 
          services: [] 
        }]);
    };

    /**
     * Removes a stage from the configuration
     * @param {number} stageId - ID of the stage to remove
     */
    const removeStage = (stageId) => {
        setStages(stages.filter(stage => stage.id !== stageId));
    };

    /**
     * Updates the name of a stage
     * @param {number} stageId - ID of the stage to update
     * @param {string} newName - New name for the stage
     */
    const updateStageName = (stageId, newName) => {
        setStages(stages.map(stage => 
          stage.id === stageId ? { ...stage, name: newName } : stage
        ));
    };

    /**
     * Updates the details of a stage
     * @param {number} stageId - ID of the stage to update
     * @param {string} newDetail - New details for the stage
     */
    const updateStageDetail = (stageId, newDetail) => {
        setStages(stages.map(stage => 
          stage.id === stageId ? { ...stage, detail: newDetail } : stage
        ));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Flex 
            minH="100vh" 
            h="100vh"
            w="100vw"
            overflow="hidden"
            bg="gray.100"
          >
            {/* Sidebar */}
            <Box w="250px" bg="blue.600" color="white" p={5} boxShadow="lg" display="flex" flexDirection="column" height="100%">
              <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
                Services
              </Text>
              <Text fontSize="sm" mb={4} textAlign="center" opacity="0.8">
                Drag services to stages (you can add any service multiple times)
              </Text>
              <Box flex="1" overflowY="auto" pr={2}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '6px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  'scrollbarWidth': 'thin',
                  'scrollbarColor': 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.1)',
                }}
              >
                <Droppable droppableId="servicesList">
                  {(provided, snapshot) => (
                    <VStack 
                      ref={provided.innerRef} 
                      {...provided.droppableProps} 
                      spacing={4} 
                      align="stretch"
                      bg={snapshot.isDraggingOver ? "blue.700" : "transparent"}
                      borderRadius="md"
                      transition="background 0.2s"
                      p={snapshot.isDraggingOver ? 2 : 0}
                      pb={4}
                    >
                      {services.map((service, index) => (
                        <Draggable key={service.id} draggableId={service.id} index={index}>
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              p={3}
                              bg={snapshot.isDragging ? "green.500" : "blue.500"}
                              borderRadius="md"
                              boxShadow={snapshot.isDragging ? "lg" : "md"}
                              _hover={{ bg: "blue.700" }}
                              cursor="grab"
                              transform={snapshot.isDragging ? "scale(1.05)" : "scale(1)"}
                              transition="all 0.2s"
                            >
                              {service.name}
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </VStack>
                  )}
                </Droppable>
              </Box>
            </Box>
    
            {/* Main Content with Stage Widgets */}
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
                  isDropDisabled={isDraggingService} // Add this line
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
                      {/* Draggable for Stages */}
                      {stages.map((stage, index) => (
                        <Draggable 
                          key={stage.id} 
                          draggableId={`stage-draggable-${stage.id}`} 
                          index={index}
                          isDragDisabled={isDraggingService} // Disable dragging when a service is being dragged
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
                              {/* X Button to Remove Stage */}
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
                              />
                              
                              {/* Stage Header */}
                              <Box
                                {...provided.dragHandleProps}
                                bg="blue.600"
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
                      ))}
                      {provided.placeholder}
                    </Flex>
                  )}
                </Droppable>
              </Box>
            </Flex>
          </Flex>
        </DragDropContext>
    );
}
