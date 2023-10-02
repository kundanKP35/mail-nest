import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { inbox, hero, notification, joinUs } from "../assets/index";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { GoNorthStar } from "react-icons/go";
import Footer from "../components/footer";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.login.userInfo);

  return (
    <>
      <div className="h-[90vh] flex flex-col  px-4 pb-4">
        <div
          className="flex flex-col justify-center  h-[100vh] rounded-3xl"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-row justify-between h-full">
            {/* left side */}
            <div className="text-gray-900 tracking-wider my-auto">
              <div className="flex items-left justify-left space-x-4 p-6 pb-2 mt-4 gap-4 ">
                <FaFacebook className="text-4xl rounded-full bg-white p-2 hover:bg-black hover:text-white transitionall hover:cursor-pointer" />
                <FaInstagram className="text-4xl rounded-full bg-white p-2 hover:bg-black hover:text-white transitionall hover:cursor-pointer" />
                <FaTwitter className="text-4xl rounded-full bg-white p-2 hover:bg-black hover:text-white transitionall hover:cursor-pointer" />
              </div>
              <div className="items-left text-gray-900 px-6  pb-8">
                <h1 className="text-5xl font-extrabold font-poppins my-2">
                  Sophisticated <br />
                  Mail Templates,
                  <br /> Instant Delivery
                </h1>
                <span className="text-gray-500 text-sm tracking-widest">
                  Elevate Your Email Experience. <br />
                </span>
                {!isLoggedIn ? (
                  <Link to="/login">
                    <button className="px-6 py-2 bg-gray-900 hover:bg-black text-white rounded-full mt-4">
                      Get Started
                    </button>
                  </Link>
                ) : (
                  <Link to="/dashboard">
                    <button className="px-6 py-2 bg-gray-900 hover:bg-black text-white rounded-full mt-4">
                      Go to Dashboard
                    </button>
                  </Link>
                )}
              </div>
            </div>
            {/* right side */}
            <div className="hidden md:flex flex-col px-8 items-center justify-end h-full ">
              {/* <div className="p-2 my-auto rounded-full border border-gray-600 w-[200px]">
                  <img src={notification} alt="" className="rounded-full w-[200px]" />
                </div>  */}
              <div className="flex flex-col gap-y-2 pb-6">
                <div className="flex gap-2 ">
                  <button className="flex items-center gap-2 px-2 py-1 border border-black rounded-full hover:bg-black hover:text-white transition-all">
                    Hasstle free
                    <GoNorthStar />
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 border border-black rounded-full hover:bg-transparent hover:text-black bg-black text-white transition-all">
                    Fast
                    <GoNorthStar />
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 border border-black rounded-full hover:bg-black hover:text-white transition-all">
                    Customizeable
                    <GoNorthStar />
                  </button>
                  <br />
                </div>
                <div className="flex gap-2 ">
                  <button className="flex items-center gap-2 px-2 py-1 border border-black rounded-full hover:bg-black hover:text-white transition-all">
                    Secure
                    <GoNorthStar />
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 border border-black rounded-full hover:bg-black hover:text-white transition-all">
                    Open Source <GoNorthStar />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-10 flex flex-col md:flex-row items-start font-poppins">
        <div className="flex flex-row md:w-1/2 justify-start ">
          <div className="flex flex-col">
            <span className="border border-gray-400 h-0 w-full my-4"></span>
            <h1 className="text-2xl font-bold font-poppins text-gray-900">
              Create your profile
            </h1>
            <div className="flex flex-col md:flex-row gap-x-4">
            <span className="my-auto text-justify">
              Sign up for our Mail App to streamline your email experience.
              Access advanced features and simplify your communication. Join us
              today!
            </span>
            <img src={joinUs} alt="" className="h-[10rem] rounded-2xl"/>
            </div>
            <span className="border border-gray-400 h-0 w-full my-4"></span>
          </div>
        </div>
        <div className="flex flex-row w-1/2 justify-end text-end">
          <h1 className="text-2xl  font-poppins text-gray-900">
            WHAT ARE THE KEY<br/> FEATURES OF <span className="font-bold">MAIL NEST</span>?
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
