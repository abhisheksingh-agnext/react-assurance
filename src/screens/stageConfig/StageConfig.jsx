import { Flex, useToast } from "@chakra-ui/react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServicesSidebar from "./components/ServicesSidebar";
import StagesContainer from "./components/StagesContainer";
import StageTimeline from "./components/StageTimeline";
import { FaSeedling, FaWarehouse, FaShip, FaIndustry, FaStore, FaUsers, FaCheckCircle } from "react-icons/fa";


{/* 
2 Views in this screen
<ServicesSidebar 
<StagesContainer */}

/**
 * ServicesDashboard component for managing service stages configuration
 * Allows dragging services into different stages and reordering stages
 * @returns {JSX.Element} The ServicesDashboard component
 */
export default function ServicesDashboard() {
  const navigate = useNavigate();
  /** @type {Array<{id: string, name: string}>} List of available services */
  const services = [
    { id: "1", name: "Farming inspection" },
    { id: "2", name: "Cold store" },
    { id: "3", name: "Bank audit" },
    { id: "4", name: "Lab certification" },
    { id: "5", name: "Commodity Analysis" },
  ];

  const initialStagesData = [
    {
      id: 1,
      name: "Farm Inspection",
      detail: "Initial inspection of avocado farms",
      services: [],
      phase: "Origin Phase",
      icon: "FaSeedling",
      location: "Farm Location",
      mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-74.006,40.707,-73.997,40.715&layer=mapnik"
    },
    {
      id: 2,
      name: "Storage & Processing",
      detail: "Storage and initial processing of harvested avocados",
      services: [],
      phase: "Processing Phase",
      icon: "FaWarehouse",
      location: "Warehouse Location",
      mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-74.006,40.707,-73.997,40.715&layer=mapnik"
    },
    {
      id: 3,
      name: "Export Preparation",
      detail: "Preparation for international shipping",
      services: [],
      phase: "Shipping Phase",
      icon: "FaShip",
      location: "Port Location",
      mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-74.006,40.707,-73.997,40.715&layer=mapnik"
    },
    {
      id: 4,
      name: "Import Processing",
      detail: "Processing at import destination",
      services: [],
      phase: "Import Phase",
      icon: "FaIndustry",
      location: "Import Facility",
      mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-74.006,40.707,-73.997,40.715&layer=mapnik"
    },
    {
      id: 5,
      name: "Distribution Center",
      detail: "Distribution to local retailers",
      services: [],
      phase: "Distribution Phase",
      icon: "FaStore",
      location: "Distribution Center",
      mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-74.006,40.707,-73.997,40.715&layer=mapnik"
    },
    {
      id: 6,
      name: "Retail Outlets",
      detail: "Final retail distribution points",
      services: [],
      phase: "Retail Phase",
      icon: "FaUsers",
      location: "Retail Locations",
      mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-74.006,40.707,-73.997,40.715&layer=mapnik"
    },
    {
      id: 7,
      name: "Quality Verification",
      detail: "Final quality checks and verification",
      services: [],
      phase: "Verification Phase",
      icon: "FaCheckCircle",
      location: "Quality Center",
      mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-74.006,40.707,-73.997,40.715&layer=mapnik"
    }
  ];

  /** @type {Array<{id: number, name: string, detail: string, services: Array}>} State for managing stages */
  const [stages, setStages] = useState(() => {
    const savedStages = localStorage.getItem('configuredStages');
    return savedStages ? JSON.parse(savedStages) : initialStagesData;
  });

  /** @type {boolean} State to track if a service is being dragged */
  const [isDraggingService, setIsDraggingService] = useState(false);

  /** @type {number} State to track current stage */
  const [currentStage, setCurrentStage] = useState(1);

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
   * Handles saving the stage configuration
   */
  const handleSave = () => {
    // Validate stages
    const invalidStages = stages.filter(stage => !stage.name.trim());
    if (invalidStages.length > 0) {
      toast({
        title: "Validation Error",
        description: "All stages must have a name",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    // Store stages in localStorage or context/state management if needed
    localStorage.setItem('configuredStages', JSON.stringify(stages));
    
    // Log the saved configuration
    console.log('Saved Configuration Stages:', stages);
    
    // Navigate to the preview screen
    navigate('/stage-preview');
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
      services: [],
      phase: "Origin Phase",
      icon: "FaSeedling"
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
      services: [],
      phase: "Origin Phase",
      icon: "FaSeedling"
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
        w="100vw"
        bg="gray.100"
        direction="column"
        overflow="hidden"
      >
      

        {/* Main Content Area */}
        <Flex 
          flex={1} 
          overflow="hidden"
          position="relative"
        >
          <ServicesSidebar services={services} />
          <StagesContainer
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
            stages={stages}
            updateStageName={updateStageName}
            updateStageDetail={updateStageDetail}
            removeService={removeService}
            addStageAfter={addStageAfter}
            removeStage={removeStage}
            addStage={addStage}
            onSave={handleSave}
            isDraggingService={isDraggingService}
          />
        </Flex>
      </Flex>
    </DragDropContext>
  );
}
