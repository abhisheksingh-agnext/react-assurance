import { Flex } from "@chakra-ui/react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import ServicesSidebar from "./components/ServicesSidebar";
import StagesContainer from "./components/StagesContainer";

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
    { id: 1, name: "Stage 1", detail: "", services: [] }
  ]);

  /** @type {boolean} State to track if a service is being dragged */
  const [isDraggingService, setIsDraggingService] = useState(false);

  const toast = useToast();

  const showDuplicateError = () => {
    toast({
      title: "Duplicate Service",
      description: "This service is already added to this stage",
      status: "error",
      duration: 1000,
      isClosable: true,
      position: "top"
    });
  };

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
        // Check if service already exists in the stage
        const targetStage = stages.find(stage => stage.id === stageId);
        const isDuplicate = targetStage.services.some(
          service => service.id === draggedService.id
        );

        if (isDuplicate) {
          showDuplicateError();
          return;
        }
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
      detail: "",
      services: []
    }]);
  };

  /**
   * Adds a new stage after the specified stage
   * @param {number} afterStageId - ID of the stage after which to add the new stage
   */
  const addStageAfter = (afterStageId) => {
    const newStageId = Math.max(...stages.map(s => s.id)) + 1;
    const afterStageIndex = stages.findIndex(s => s.id === afterStageId);

    const newStages = [...stages];
    newStages.splice(afterStageIndex + 1, 0, {
      id: newStageId,
      name: `Stage ${newStageId}`,
      detail: "",
      services: []
    });

    setStages(newStages);
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
        <ServicesSidebar services={services} />
        <StagesContainer
          stages={stages}
          updateStageName={updateStageName}
          updateStageDetail={updateStageDetail}
          removeService={removeService}
          addStageAfter={addStageAfter}
          removeStage={removeStage}
          addStage={addStage}
          isDraggingService={isDraggingService}
        />
      </Flex>
    </DragDropContext>
  );
}
