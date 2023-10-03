import React, { useEffect, useState } from 'react';
import { useGetUserTemplatesMutation } from '../slice/templateApiSlices';
import { useGetAllTemplateMutation } from "../slice/templateApiSlices";  
import { useSelector } from 'react-redux';

const MailPage = () => {
  const [userTemplates, setUserTemplates] = useState([]);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [preTemplates, setPreTemplates] = useState([]);

  const [getUserTemplatesApi, { error }] = useGetUserTemplatesMutation();
  const [getAllTemplatesApi] = useGetAllTemplateMutation();

  const {userInfo} = useSelector((state) => state.login);

  useEffect(() => {
    const fetchUserTemplates = async () => {
      try {
        const response = await getUserTemplatesApi().unwrap();
        setUserTemplates(response);
      } catch (error) {
        console.log('Error fetching user templates', error);
      }
    };
    const fecthPreTemplates = async () => {
      try {
        const preTemplates = await getAllTemplatesApi().unwrap();
        setPreTemplates(preTemplates);
      } catch (error) {
        console.log('Error fetching templates',error);
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
  };

  function handleSubmitMail(e) {
    e.preventDefault();
    console.log('Send Mail:', { to, subject, body });
  }

  return (
    <div>
      <div className="templates flex flex-row">
        <div className="userTemplates">
          <h1 className="text-2xl font-bold mb-4">User Templates</h1>
          <ul>
            {userTemplates.map((template) => (
              <li
                key={template.id}
                className="bg-white rounded shadow p-4 cursor-pointer"
                onClick={() => handleTemplateSelect(template)}
              >
                <h2 className="text-xl font-bold mb-2">{template.name}</h2>
                <h4 className="text-gray-600 mb-2">{template.description}</h4>
                <h3 className="text-blue-500 mb-2">Subject: {template.subject}</h3>
                <p>{template.body}</p>
                <p className="text-gray-700 mt-2">Created By: {template.createdBy}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
      <h1 className="text-2xl font-bold mb-4">Premade Templates</h1>
          <ul>
            {preTemplates.map((template) => (
              <li
                key={template.id}
                className="bg-white rounded shadow p-4 cursor-pointer"
                onClick={() => handleTemplateSelect(template)}
              >
                <h2 className="text-xl font-bold mb-2">{template.name}</h2>
                <h4 className="text-gray-600 mb-2">{template.description}</h4>
                <h3 className="text-blue-500 mb-2">Subject: {template.subject}</h3>
                <p>{template.body}</p>
                <p className="text-gray-700 mt-2">Created By: {template.createdBy}</p>
              </li>
            ))}
          </ul>
    </div>
      </div>
      <div className="form">
        <h1 className="text-2xl font-bold">Send Mail</h1>
        <form onSubmit={handleSubmitMail}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from">
              From
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="from"
              type="text"
              placeholder="From"
              value={userInfo.email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
              To
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="to"
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
              Body
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="body"
              type="text"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailPage;
