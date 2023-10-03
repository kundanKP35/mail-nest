import React, { useEffect, useState } from "react";
import { useGetUserTemplatesMutation } from "../slice/templateApiSlices";
import { useGetAllTemplateMutation } from "../slice/templateApiSlices";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const MailPage = () => {
  const [userTemplates, setUserTemplates] = useState([]);
  const [from, setFrom] = useState(""); // [TODO] : set from to user email
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [preTemplates, setPreTemplates] = useState([]);

  const [getUserTemplatesApi, { error }] = useGetUserTemplatesMutation();
  const [getAllTemplatesApi] = useGetAllTemplateMutation();

  const { userInfo } = useSelector((state) => state.login);

  useEffect(() => {
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
    
    fetchUserTemplates();
    fecthPreTemplates();
  }, []);

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setBody(template.body);

    toast.success("Template selected successfully");
  };

  function handleSubmitMail(e) {
    e.preventDefault();
    console.log("Send Mail:", { to, subject, body });
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="flex flex-row w-full h-[90vh]  gap-x-8 px-4 font-poppins">
      {/* form */}
      <div className="w-1/2 mt-8">
        <h1 className="text-2xl font-bold pb-2">Send Mail</h1>
        <form onSubmit={handleSubmitMail}>
          <div className="flex flex-row justify-between">
            <div className="mb-4 flex flex-row items-center justify-center">
              <label
                className="block text-gray-700 text-sm font-bold mr-2"
                htmlFor="from"
              >
                From :
              </label>
              <input
                className="px-2 placeholder:text-gray-400 focus:outline-gray-300 focus:rounded-full"
                id="from"
                type="text"
                placeholder="From"
                value={userInfo.email}
                onChange={(e) => setFrom(e.target.value)}
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
                id="to"
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Subject
            </label> */}
            <input
              className="w-full h-12 bg-slate-100 rounded-md text-center"
              id="subject"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
              id="body"
              type="text"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="flex items-center justify-end gap-x-3">
              <GrAttachment />
              <BsEmojiSmile onClick={toggleEmojiPicker} />{" "}
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
        </form>
      </div>
      <div className="flex flex-col w-1/2 mt-8 gap-x-2 gap-y-8">
        {/* userTemplates */}
        <div>
          {userTemplates && (
            <div>
              <h1 className="text-2xl font-bold mb-4">User Templates</h1>
              <Accordion allowToggle>
                {userTemplates && userTemplates.length !== 0 ? (
                  <div>
                    <Accordion allowToggle>
                      {userTemplates.map((template, index) => (
                        <AccordionItem key={index}>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                {template.name}<br/>
                                <span className="text-sm text-gray-400">{template.description}</span>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <p>{template.body}</p>
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
                  <div className="text-sm text-gray-400">
                    No user templates found.
                  </div>
                )}
              </Accordion>
            </div>
          )}
        </div>
        {/* preTemplates */}
        <div>
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
                            <p>{template.body}</p>
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
        </div>
      </div>
    </div>
  );
};

export default MailPage;
