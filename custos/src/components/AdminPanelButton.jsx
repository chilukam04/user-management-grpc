import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

const AdminPanelButton = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasDeleteAccess, setHasDeleteAccess] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    if (user.groups.includes('admin')) {
      setIsAdmin(true);
      setHasDeleteAccess(user.scopes.includes('delete:content'));
      onOpen(); // Open the modal if the user is an admin
    } else {
      toast({
        title: 'Access Denied',
        description: "You don't have access to the Admin Panel.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = () => {
    if (!hasDeleteAccess) {
      toast({
        title: 'Access Denied',
        description: "You don't have permission to delete content.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Handle delete action here
    toast({
      title: 'Content Deleted',
      description: "The content has been successfully deleted.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <>
      <Button
        onClick={handleClick}
        mt={6}
        px={4}
        py={2}
        bg="blue.500"
        color="white"
        fontWeight="semibold"
        rounded="lg"
        shadow="md"
        _hover={{ bg: 'blue.700' }}
        _focus={{ outline: 'none', ring: 2, ringColor: 'blue.400', ringOpacity: 0.75 }}
      >
        Admin Panel
      </Button>

      {/* Modal for Admin Panel */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Panel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Welcome to the Admin Panel! You have access to view the content.</p>
            {hasDeleteAccess && <p>You also have delete permissions.</p>}
          </ModalBody>

          <ModalFooter>
              <Button colorScheme="red" mr={3}onClick={handleDelete}>
                Delete Content
              </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminPanelButton;