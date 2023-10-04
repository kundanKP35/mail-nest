import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const TemplateDialog = ({ isOpen, onClose, onSaveTemplate, mailData }) => {
  const [templateInfo, setTemplateInfo] = useState({
    name: "",
    description: "",
    subject: mailData.subject,
    body: mailData.body,
  });

  useEffect(() => {
    setTemplateInfo({
      ...templateInfo,
      subject: mailData.subject,
      body: mailData.body,
    });
  }, [mailData]);
  

  const handleInputChange = (e) => {
    setTemplateInfo({
      ...templateInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveTemplate = () => {
    onSaveTemplate(templateInfo);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save as Template</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Template Name</FormLabel>
            <Input
              placeholder="Enter template name"
              name="name"
              value={templateInfo.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Enter description"
              name="description"
              value={templateInfo.description}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Subject</FormLabel>
            <Input
              placeholder="Enter Subject"
              name="subject"
              value={templateInfo.subject}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Body</FormLabel>
            <Input
              placeholder="Enter Body"
              name="body"
              value={templateInfo.body}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveTemplate}>
            Save Template
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TemplateDialog;
