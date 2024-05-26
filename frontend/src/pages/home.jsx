import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { GoNorthStar } from "react-icons/go";
import Footer from "../components/footer";
import FeaturesSection from "../components/homeFeatures";
import { hero2 } from "../assets/index";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.login.userInfo);

  return (
    <>
      <div className="h-[90vh] flex flex-col  px-4 pb-4">
        <div
          className="flex flex-col justify-center  h-[100vh] rounded-3xl"
          style={{
            backgroundImage: `url(${hero2})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-row justify-between h-full">
            {/* left side */}
            <div className="text-gray-900 tracking-wider my-auto">
              <div className="flex items-left justify-left space-x-4 p-6 pb-8 mt-4 gap-4 ">
                <a href="https://www.facebook.com" rel="noreferrer" target="_blank">

                  <FaFacebook className="text-4xl rounded-full bg-white p-2 hover:bg-black hover:text-white transitionall hover:cursor-pointer" />
                </a>
                <a href="https://www.instagram.com">                
                  <FaInstagram className="text-4xl rounded-full bg-white p-2 hover:bg-black hover:text-white transitionall hover:cursor-pointer" />
                </a>
                <a href="https://www.twitter.com">             
                  <FaTwitter className="text-4xl rounded-full bg-white p-2 hover:bg-black hover:text-white transitionall hover:cursor-pointer" />
                </a>   
              </div>
              <div className="items-left text-white px-6  pb-8">
                <h1 className="text-5xl font-extrabold font-poppins my-2 leading-[3.5rem]">
                  Sophisticated <br />
                  Mail Templates,
                  <br /> Instant Delivery
                </h1>
                <span className="text-gray-200 text-sm tracking-widest">
                  Elevate Your Email Experience. <br />
                </span>
                {!isLoggedIn ? (
                  <Link to="/login">
                    <button className="px-6 py-2 bg-violet-600 hover:bg-black text-white rounded-full mt-4">
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
              <div className="flex flex-col gap-y-2 pb-6">
                <div className="flex gap-2 ">
                  <button className="flex items-center gap-2 px-2 py-1 border border-white rounded-full  text-white hover:bg-white hover:text-violet-600 transition-all">
                    Hasstle free
                    <GoNorthStar />
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 border border-white rounded-full hover:bg-transparent hover:text-white bg-white text-violet-600 transition-all">
                    Fast
                    <GoNorthStar />
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 border border-white rounded-full text-white hover:bg-white hover:text-violet-600 transition-all">
                    Customizeable
                    <GoNorthStar />
                  </button>
                  <br />
                </div>
                <div className="flex gap-2 ">
                  <button className="flex items-center gap-2 px-2 py-1 border border-white rounded-full text-white hover:bg-white hover:text-violet-600 transition-all">
                    Secure
                    <GoNorthStar />
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 border border-white rounded-full text-white hover:bg-white hover:text-violet-600 transition-all">
                    Open Source <GoNorthStar />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <FeaturesSection />
      <Footer />
    </>
  );
};

export default Home;
