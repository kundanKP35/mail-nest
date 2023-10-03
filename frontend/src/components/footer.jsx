import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="md:w-2/3 w-full px-4 text-white flex flex-col">
        <div className="w-full text-7xl font-bold">
          <h1 className="w-full md:w-2/3">How can we help you. get in touch</h1>
        </div>
        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
          <p className="w-full md:w-2/3 text-gray-400">
            To ensure that all Wikipedia content is verifiable, anyone may
            question an uncited claim. If your work has been tagged
          </p>
          <div className="w-44 pt-6 md:pt-0">
            <a className="bg-red-500 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center">
              Contact US
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex mt-24 mb-12 flex-row justify-between">
            <Link to='/about' className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">
              About
            </Link>
            <Link to='/' className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">
              Services
            </Link>
            <Link to='/' className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">
              Why us
            </Link>
            <Link to='/contact' className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">
              Contact
            </Link>
            <div className="flex flex-row space-x-8 items-center justify-between">
              <FaFacebook className="text-3xl" />
              <FaInstagram className="text-3xl" />
              <FaTwitter className="text-3xl" />
            </div>
          </div>
          <hr className="border-gray-600" />
          <p className="w-full text-center mt-12 text-gray-600">
            Copyright © 2023 Team Nest
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
