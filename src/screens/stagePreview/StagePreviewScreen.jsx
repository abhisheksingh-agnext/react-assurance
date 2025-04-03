import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  Button,
  Heading,
  Grid,
  GridItem,
  Divider,
  IconButton,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { 
  FaIndustry, 
  FaWarehouse, 
  FaTruck, 
  FaShip, 
  FaBox, 
  FaLeaf, 
  FaMapMarkerAlt,
  FaSeedling,
  FaHandHoldingHeart,
  FaAnchor,
  FaStore,
  FaChartLine,
  FaCheckCircle,
  FaTimes
} from "react-icons/fa";
import { GiFarmTractor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

// Import components
import Header from "./components/Header";
import TimelineNavigation from "./components/TimelineNavigation";
import StageCardsContainer from "./components/StageCardsContainer";
import NavigationControls from "./components/NavigationControls";
import MapModal from "./components/MapModal";

// Import data
import stagesData from "./data/stagesData";

/**
 * StagePreviewScreen component that displays a visual flow diagram of stages
 * @returns {JSX.Element} The StagePreviewScreen component
 */
export default function StagePreviewScreen() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [mapLocation, setMapLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardsContainerRef = useRef(null);
  
  // Force center first card immediately at page load
  useEffect(() => {
    const forceInitialCentering = () => {
      if (cardsContainerRef.current) {
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
  }, []);
  
  // Handle step change
  const handleStepChange = (newStep) => {
    // Validate step
    if (newStep < 1 || newStep > stagesData.length) return;
    
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
  
  return (
    <Box minH="100vh" bg="gray.50" w="100vw" h="100vh" overflow="hidden" position="fixed" top={0} left={0}>
      {/* Header */}
      <Header onBack={() => navigate(-1)} />

      <Box pt={20} pb={8} h="100vh" overflow="hidden" display="flex" flexDirection="column">
        {/* Timeline Navigation */}
        <TimelineNavigation 
          stages={stagesData} 
          currentStep={currentStep} 
          onStepChange={handleStepChange} 
        />

        {/* Stage Cards Container */}
        <StageCardsContainer 
          stages={stagesData}
          currentStep={currentStep}
          onMapClick={handleMapPreviewClick}
          containerRef={cardsContainerRef}
        />

        {/* Navigation Buttons */}
        <NavigationControls 
          currentStep={currentStep}
          totalSteps={stagesData.length}
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