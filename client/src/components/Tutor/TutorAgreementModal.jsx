import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

const TutorAgreementModal = ({ isOpen, onClose, initiateAgreement }) => {
  const [price, setPrice] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!price || isNaN(price)) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid numeric price.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    initiateAgreement(price); // Trigger the agreement proposal
    setPrice(""); // Clear the input field
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Propose a Lesson Price</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Agreed Price</FormLabel>
            <Input
              type="number"
              placeholder="Enter agreed price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Propose
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TutorAgreementModal;
