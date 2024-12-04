import React, { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const GroupPanel = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isGroupOpen, onOpen: onGroupOpen, onClose: onGroupClose } = useDisclosure();
  const toast = useToast();
  const [groups, setGroups] = useState([]); // Initialize as an empty array
  const [groupForm, setGroupForm] = useState({ name: '', description: '' });
  const [selectedGroup, setSelectedGroup] = useState(null); // State for the selected group

  // Fetch user's groups on mount
  useEffect(() => {
    if (user?.userId) {
      axios
        .get(`http://localhost:8080/api/get_user_groups/${user.userId}`)
        .then((response) => setGroups(response.data.groups || [])) // Fallback to empty array
        .catch((error) => console.error('Error fetching groups:', error));
    }
  }, [user]);

  const handleGroupFormChange = (e) => {
    const { name, value } = e.target;
    setGroupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateGroup = () => {
    if (!groupForm.name || !groupForm.description) {
      toast({
        title: 'Validation Error',
        description: 'Group name and description are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    axios
      .post('http://localhost:8080/api/create_group', {
        name: groupForm.name,
        description: groupForm.description,
      })
      .then((response) => {
        setGroups((prev) => [...prev, response.data]); // Append new group
        toast({
          title: 'Group Created',
          description: `Group "${response.data.name}" created successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setGroupForm({ name: '', description: '' }); // Reset form
      })
      .catch((error) => {
        console.error('Error creating group:', error);
        toast({
          title: 'Error',
          description: 'Failed to create group.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleDeleteGroup = (groupId) => {
    axios
      .delete(`http://localhost:8080/api/delete_group/${groupId}`)
      .then(() => {
        setGroups((prev) => prev.filter((group) => group.groupId !== groupId));
        toast({
          title: 'Group Deleted',
          description: 'The group was deleted successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error deleting group:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete group.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group); // Set the selected group
    onGroupOpen(); // Open the modal for the selected group
  };

  return (
    <>
      <Button
        onClick={onOpen}
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
        Group Panel
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Group Panel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h3 className="font-bold mb-2">Your Groups</h3>
            {groups.length > 0 ? (
              <ul>
                {groups.map((group) => (
                  <li key={group.groupId} className="flex justify-between items-center my-2">
                    <span
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleGroupClick(group)}
                    >
                      {group.name}
                    </span>
                    <IconButton
                      aria-label="Delete Group"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteGroup(group.groupId)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No groups found.</p>
            )}
            <div className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="Group Name"
                value={groupForm.name}
                onChange={handleGroupFormChange}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="description"
                placeholder="Group Description"
                value={groupForm.description}
                onChange={handleGroupFormChange}
                className="w-full p-2 border rounded mb-2"
              />
              <Button colorScheme="blue" onClick={handleCreateGroup} width="full">
                Create Group
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

{/* Modal for displaying group description */}
<Modal isOpen={isGroupOpen} onClose={onGroupClose}>
  <ModalOverlay />
  <ModalContent bg="gray.100" rounded="lg" shadow="lg">
    <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center" color="blue.600">
      {selectedGroup?.name}
    </ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-lg font-medium text-gray-800">
          <span className="font-semibold text-blue-500">Group Description:</span>
        </p>
        <p className="mt-2 text-gray-600 text-base">{selectedGroup?.description}</p>
      </div>
    </ModalBody>
    <ModalFooter justifyContent="center">
      <Button
        onClick={onGroupClose}
        colorScheme="blue"
        px={6}
        py={2}
        fontSize="sm"
        fontWeight="semibold"
        shadow="md"
        _hover={{ bg: 'blue.600' }}
      >
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  );
};

export default GroupPanel;
