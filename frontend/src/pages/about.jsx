import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaBitbucket } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";
import { akash, kundan } from "../assets/index";

const About = () => {
  return (
    <div className="w-full  p-8">
      <div className="w-full max-w-screen-md mx-auto text-center ">
        <h1 className="font-bold text-4xl ">Mail Nest</h1>
        <p className="text-gray-600 text-lg mb-4">
          Your Ultimate Mailing Solution
        </p>
        <p className="text-gray-600 text-sm mb-4 text-justify ">
          Mail Nest is your go-to email management platform, offering a
          versatile array of features that include pre-defined templates and
          customizable templates to cater to your unique email needs. Whether
          you prefer the convenience of ready-made templates or wish to craft
          bespoke emails, our platform empowers you with the flexibility to
          create and send emails that resonate with your audience, saving you
          time and ensuring your messages are professional and impactful.
        </p>
        <div className="flex flex-row justify-center gap-2">
          <Link to='/login'>
            <button className="py-2 px-4 bg-black text-white hover:bg-white hover:text-black hover:border border-black font-bold rounded-full">
              Get Started
            </button>
          </Link>
          <button className="py-2 px-4 border border-black bg-white font-bold rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-all">
            <BsGithub size={20} /> Code <GoLinkExternal size={15} />
            <a href="https://github.com/kundanKP35/mail-nest"></a>
          </button>
        </div>
        <div className="border-t-2 border-gray-300 mt-5"></div>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-4 p-4">
        <h1 className="text-purple-600 uppercase text-xl">Contributers</h1>
      </div>

      {/* Contributors Section */}
      <div className="flex items-center justify-center flex-wrap gap-8 p-4">
        <div className="card bg-white p-4 rounded-xl shadow-2xl w-[250px] text-center">
          <img
            src={akash}
            alt="Contributor 1"
            className="w-24 h-24 rounded-full object-cover transition duration-200 hover:scale-110 mx-auto"
          />
          <div className="text-gray-900 text-lg font-bold p-4">
            Akash Parida
          </div>
          <div className="flex items-center justify-center gap-3 mt-2 w-auto h-5 text-gray-600">
            <a href="https://www.linkedin.com/in/akash-parida-ap">
              <FaLinkedin className="cursor-pointer transition duration-200 hover:text-black" />
            </a>
            <a href="https://github.com/akash5k">
              <BsGithub className="cursor-pointer transition duration-200 hover:text-black" />
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter className="cursor-pointer transition duration-200 hover:text-black" />
            </a>
          </div>
        </div>

        <div className="card bg-white p-4 rounded-xl shadow-2xl w-[250px] text-center">
          <img
            src={kundan}
            alt="Contributor 2"
            className="w-24 h-24 rounded-full object-cover transition duration-200 hover:scale-110 mx-auto"
          />
          <div className="text-gray-900 text-lg font-bold p-4">
            Kundan Prasad
          </div>
          <div className="flex items-center justify-center gap-3 mt-2 w-auto h-5 text-gray-600">
            <a href="https://www.linkedin.com/in/kundan-prasad-kp">
              <FaLinkedin className="cursor-pointer transition duration-200 hover:text-black" />
            </a>
            <a href="https://github.com/kundanKP35">
              <BsGithub className="cursor-pointer transition duration-200 hover:text-black" />
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter className="cursor-pointer transition duration-200 hover:text-black" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
