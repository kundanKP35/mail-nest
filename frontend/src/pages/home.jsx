import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { inbox } from "../assets/index";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.login.userInfo);

  return (
    <div
      className="flex flex-col justify-center items-start h-[91vh] bg-cover bg-center md:pl-8"
      style={{
        backgroundImage: `url(${inbox})`,
        backgroundPosition: "top",
      }}
    >
      <div>
        <span className="text-gray-400 text-sm">
          Elevate Your Email Experience.
        </span>
        <h1 className="text-5xl font-extrabold font-poppins my-2">
          Sophisticated Mail Templates,
          <br /> Instant Delivery
        </h1>
        {!isLoggedIn ? (
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-400 text-white rounded-full mt-4">
              Get Started
            </button>
          </Link>
        ) : (
          <Link to="/dashboard">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-400 text-white rounded-full mt-4">
              Go to Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
