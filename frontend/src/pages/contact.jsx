import React from 'react';
import { contact } from '../assets/index';

const Contact = () => {
  return (
    <div className="flex flex-row h-[90vh] font-poppins">
      <div
        className="w-[50%] bg-cover bg-center"
        style={{
          backgroundImage: `url(${contact})`,
        }}
      ></div>

      <div className="w-[50%] my-auto md:px-20">
        <h2 className="text-3xl pb-2 text-left">
          Contact Us
          <br />
          Send us a message
        </h2>

        <div className="text-left py-3">
          <span>
            Have a question or feedback? Feel free to get in touch with us.
          </span>
        </div>

        <form>
          <label htmlFor="name" className="text-xs">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border bg-gray-100 px-3 py-2 mt-1 focus:bg-white"
          />

          <label htmlFor="email" className="text-xs">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border bg-gray-100 px-3 py-2 mt-1 focus:bg-white"
          />

          <label htmlFor="message" className="text-xs">
            Message
          </label>
          <textarea
            id="message"
            className="w-full border bg-gray-100 px-3 py-2 mt-1 focus:bg-white"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 hover:bg-gray-900 mt-4 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
