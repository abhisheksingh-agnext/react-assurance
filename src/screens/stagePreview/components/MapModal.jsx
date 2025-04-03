import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

/**
 * Map modal component for displaying location information
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to handle modal close
 * @param {Object} props.mapLocation - Location data for the map
 * @returns {JSX.Element} Map modal component
 */
const MapModal = ({ isOpen, onClose, mapLocation }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="xl">
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody p={0} h="500px">
        {mapLocation && (
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLocation.mapUrl}&layer=mapnik&marker=0%2C0&zoom=2`}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            title={`Map of ${mapLocation.location}`}
          />
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default MapModal; 