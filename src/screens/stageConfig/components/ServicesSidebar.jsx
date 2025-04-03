import { Box, Text, VStack } from "@chakra-ui/react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

/**
 * ServicesSidebar component that displays the list of available services
 * @param {Object} props - Component props
 * @param {Array} props.services - List of available services
 * @returns {JSX.Element} The ServicesSidebar component
 */
export default function ServicesSidebar({ services }) {
  return (
    <Box w="250px"  bgGradient={ "linear(to-br, gray.500, gray.300)"  } color="white" p={5} boxShadow="lg" display="flex" flexDirection="column" height="100%">
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
              bg={snapshot.isDraggingOver ? "gray.700" : "transparent"}
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
                      bg={snapshot.isDragging ? "gray.500" : "gray.500"}
                      borderRadius="md"
                      boxShadow={snapshot.isDragging ? "lg" : "md"}
                      _hover={{ bg: "gray.700" }}
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
  );
} 