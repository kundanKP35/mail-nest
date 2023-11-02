import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useGetAllTemplateMutation,
  useGetUserTemplatesMutation,
} from "../slice/templateApiSlices";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useSelector } from "react-redux";

import { Alert, AlertIcon, useDisclosure } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import TemplateDialog from "../components/templateDialog";
import Loader from "../components/Loader/loader";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const MailPage = () => {
  const [userTemplates, setUserTemplates] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [mailData, setMailData] = useState({
    from: "",
    to: "",
    subject: "",
    body: "",
    password: "",
    emailService: "Gmail",
  });

  const handleFormChange = (e) => {
    setMailData({
      ...mailData,
      [e.target.name]: e.target.value,
    });
  };

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [preTemplates, setPreTemplates] = useState([]);

  const [getUserTemplatesApi, { error }] = useGetUserTemplatesMutation();
  const [getAllTemplatesApi,{isLoading}] = useGetAllTemplateMutation();
  const [createTemplateApi] = useCreateTemplateMutation();
  const [deleteTemplateApi] = useDeleteTemplateMutation();

  const { userInfo } = useSelector((state) => state.login);

  const fetchUserTemplates = async () => {
    try {
      const response = await getUserTemplatesApi().unwrap();
      setUserTemplates(response);
    } catch (error) {
      console.log("Error fetching user templates", error);
    }
  };
  const fecthPreTemplates = async () => {
    try {
      const preTemplates = await getAllTemplatesApi().unwrap();
      setPreTemplates(preTemplates);
    } catch (error) {
      console.log("Error fetching templates", error);
    }
  };

  useEffect(() => {
    fetchUserTemplates();
    fecthPreTemplates();
  }, []);

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setMailData({
      ...mailData,
      subject: template.subject,
      body: template.body,
    });

    toast.success("Template selected successfully");
  };

  // Send email function
  const sendEmail = async () => {
    const emailPassword = prompt("Enter your app password");
    mailData.password = emailPassword;

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/send-mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailData),
        });

        if (response.ok) {
          resolve("Email sent successfully");
        } else {
          const data = await response.json();
          reject(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Error sending email:", error);
        reject("Error sending email");
      }
    });
  };

  // Handle submit mail with loading toast
  const handleSubmitMail = async (e) => {
    e.preventDefault();
    toast.promise(sendEmail(), {
      loading: "Sending...",
      success: (message) => <b>{message}</b>,
      error: (error) => <b>{error}</b>,
    });
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleOpenTemplate = (event) => {
    onOpen();
  };

  const handleSaveTemplate = async (templateInfo) => {
    if (
      !templateInfo.name ||
      !templateInfo.description ||
      !templateInfo.subject ||
      !templateInfo.body
    ) {
      toast.error("Please fill out all fields");
    } else {
      try {
        await createTemplateApi(templateInfo);
        toast.success("Template saved successfully");
        onClose();
        fetchUserTemplates();
      } catch (error) {
        toast.error("Error saving template");
      }
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      await deleteTemplateApi(templateId);
      toast.success("Template deleted successfully");
      fetchUserTemplates();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-[90vh]  gap-x-8 px-4 font-poppins">
      {/* form */}
      <div className="md:w-1/2 mt-8">
        <h1 className="text-2xl font-bold pb-2">Send Mail</h1>

        <form onSubmit={handleSubmitMail}>
          <div className="flex flex-row justify-between pt-2">
            <div className="mb-4 flex flex-row items-center justify-center">
              <label
                className="block text-gray-700 text-sm font-bold mr-2"
                htmlFor="from"
              >
                From :
              </label>
              <input
                className="px-2 placeholder:text-gray-400 focus:outline-gray-300 focus:rounded-full"
                name="from"
                id="from"
                type="text"
                placeholder="From"
                value={mailData.from}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-4 flex flex-row items-center justify-center">
              <label
                className="block text-gray-700 text-sm font-bold mr-2"
                htmlFor="to"
              >
                To :
              </label>
              <input
                className="px-2 placeholder:text-gray-400 focus:outline-gray-300 focus:rounded-full"
                name="to"
                id="to"
                type="text"
                placeholder="To"
                value={mailData.to}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <input
              className="w-full h-12 bg-slate-100 rounded-md text-center"
              name="subject"
              id="subject"
              type="text"
              placeholder="Subject"
              value={mailData.subject}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Body
            </label>
            <textarea
              className="h-60 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="body"
              id="body"
              type="text"
              placeholder="Body"
              value={mailData.body}
              onChange={handleFormChange}
            />
          </div>
          <div className="relative">
            <div className="flex items-center justify-between gap-x-3">
              <div>
                <div
                  className="bg-black hover:bg-gray-900 hover:cursor-pointer text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline flex flex-row items-center gap-2"
                  onClick={handleOpenTemplate}
                >
                  Save Template <MdOutlineBookmarkAdd />
                </div>
              </div>
              <div className="flex flex-row justify-end items-center gap-3">
                <GrAttachment />
                <BsEmojiSmile onClick={toggleEmojiPicker} />
                {showEmojiPicker && (
                  <div className="absolute top-0 right-0 mt-10">
                    <EmojiPicker />
                  </div>
                )}
                <button
                  className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </form>

        <TemplateDialog
          isOpen={isOpen}
          onClose={onClose}
          onSaveTemplate={handleSaveTemplate}
          mailData={mailData}
        />
      </div>
      <div className="flex flex-col md:w-1/2 mt-8 gap-x-2 gap-y-8">
        <Link to="/instructions">
        <Alert status="warning" className="rounded-xl -z-30">
          <AlertIcon />
          Since May 30, 2022, Google no longer supports less secure apps. Follow
          the link to get started with your own app password . Don't worry, it's
          easy and one-time setup !<br />
          <Link>
            <FiExternalLink />
          </Link>
        </Alert>
        </Link>
        {/* userTemplates */}
        <div>
          {userTemplates && (
            <div>
              <h1 className="text-2xl font-bold mb-4">User Templates</h1>
              <Accordion allowToggle>
                {userTemplates && userTemplates.length !== 0 ? (
                  <div>
                    <Accordion allowToggle>
                      {userTemplates.map((template) => (
                        <AccordionItem key={template._id}>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                {template.name}
                                <br />
                                <span className="text-sm text-gray-400">
                                  {template.description}
                                </span>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <div className="border border-gray-200 p-4 rounded-xl">
                              <pre>{`${template.body}`}</pre>
                            </div>
                            <div className="flex flex-row justify-between pt-2">
                              <button
                                className="bg-black  hover:bg-gray-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => handleTemplateSelect(template)}
                              >
                                Use
                              </button>

                              <Tooltip title="Delete template" placement="top">
                                <IconButton>
                                  <AiFillDelete
                                    className="text-2xl hover:text-red-500 hover:cursor-pointer"
                                    onClick={() =>
                                      handleDeleteTemplate(template._id)
                                    }
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">
                    No user templates found.
                  </div>
                )}
              </Accordion>
            </div>
          )}
        </div>
        {/* preTemplates */}
        {isLoading ? (<Loader />) : (<div>
          {preTemplates && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Premade Templates</h1>
              <Accordion allowToggle>
                {preTemplates && preTemplates.length !== 0 ? (
                  <div>
                    <Accordion allowToggle>
                      {preTemplates.map((template, index) => (
                        <AccordionItem key={index}>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                {template.name}
                                <br />
                                <span className="text-sm text-gray-400">
                                  {template.description}
                                </span>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <div className="border border-gray-200 p-4 rounded-xl">
                              <pre>{`${template.body}`}</pre>
                            </div>
                            <button
                              className="bg-black  hover:bg-gray-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              onClick={() => handleTemplateSelect(template)}
                            >
                              Use
                            </button>
                          </AccordionPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">Comming soon.</div>
                )}
              </Accordion>
            </div>
          )}
        </div>)}
      </div>
    </div>
  );
};

export default MailPage;
