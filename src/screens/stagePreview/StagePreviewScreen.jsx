import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Import components
import Header from "./components/Header";
import TimelineNavigation from "./components/TimelineNavigation";
import StageCardsContainer from "./components/StageCardsContainer";
import NavigationControls from "./components/NavigationControls";
import MapModal from "./components/MapModal";

/**
 * StagePreviewScreen component that displays a visual flow diagram of stages
 * @returns {JSX.Element} The StagePreviewScreen component
 */
export default function StagePreviewScreen() {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [mapLocation, setMapLocation] = useState(null);
  const [stages, setStages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardsContainerRef = useRef(null);
  
  // Load configured stages from localStorage
  useEffect(() => {
    const storedStages = JSON.parse(localStorage.getItem('configuredStages'));
    if (!storedStages || storedStages.length === 0) {
      toast({
        title: "No Configuration Found",
        description: "Please configure stages first",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      navigate('/stage-config');
      return;
    }
    setStages(storedStages);
  }, [navigate, toast]);

  // Force center first card immediately at page load
  useEffect(() => {
    const forceInitialCentering = () => {
      if (cardsContainerRef.current && stages.length > 0) {
        const cards = cardsContainerRef.current.querySelectorAll('.stage-card');
        const firstCard = cards[0];
        if (firstCard) {
          const cardWidth = firstCard.offsetWidth;
          const containerWidth = cardsContainerRef.current.offsetWidth;
          const scrollLeft = firstCard.offsetLeft - (containerWidth - cardWidth) / 2;
          
          // Force immediate scroll without animation
          cardsContainerRef.current.scrollLeft = scrollLeft;
          
          // Apply again to ensure it works
          setTimeout(() => {
            if (cardsContainerRef.current) {
              cardsContainerRef.current.scrollLeft = scrollLeft;
            }
          }, 100);
        }
      }
    };
    
    forceInitialCentering();
    window.addEventListener('resize', forceInitialCentering);
    
    return () => {
      window.removeEventListener('resize', forceInitialCentering);
    };
  }, [stages]);
  
  // Handle step change
  const handleStepChange = (newStep) => {
    // Validate step
    if (newStep < 1 || newStep > stages.length) return;
    
    // Update current step
    setCurrentStep(newStep);
    
    // Center the active card
    setTimeout(() => {
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.stage-card');
        const activeCard = cards[newStep - 1];
        if (activeCard) {
          const cardWidth = activeCard.offsetWidth;
          const containerWidth = cardsContainerRef.current.offsetWidth;
          const scrollLeft = activeCard.offsetLeft - (containerWidth - cardWidth) / 2;
          cardsContainerRef.current.scrollLeft = scrollLeft;
        }
      }
    }, 50);
  };
  
  // Handle map preview click
  const handleMapPreviewClick = (location, mapUrl) => {
    setMapLocation({ location, mapUrl });
    onOpen();
  };
  
  if (stages.length === 0) {
    return null; // or a loading state
  }
  
  return (
    <Box minH="100vh" bg="gray.50" w="100vw" h="100vh" overflow="auto" position="fixed" top={0} left={0}>
      {/* Header */}
      <Header onBack={() => navigate(-1)} />

      <Box pt={20} pb={8} minH="100vh" display="flex" flexDirection="column">
        {/* Timeline Navigation */}
        <TimelineNavigation 
          stages={stages} 
          currentStep={currentStep} 
          onStepChange={handleStepChange} 
        />

        {/* Stage Cards Container */}
        <StageCardsContainer 
          stages={stages}
          currentStep={currentStep}
          onMapClick={handleMapPreviewClick}
          containerRef={cardsContainerRef}
        />

        {/* Navigation Buttons */}
        <NavigationControls 
          currentStep={currentStep}
          totalSteps={stages.length}
          onPrevStep={() => handleStepChange(currentStep - 1)}
          onNextStep={() => handleStepChange(currentStep + 1)}
        />
      </Box>
      
      {/* Map Modal */}
      <MapModal 
        isOpen={isOpen} 
        onClose={onClose} 
        mapLocation={mapLocation} 
      />
    </Box>
  );
} 