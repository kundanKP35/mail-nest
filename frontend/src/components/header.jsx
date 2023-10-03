import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaCaretDown,
  FaUserCircle,
} from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearCredentials } from "../slice/loginSlice";
import { useLogoutMutation } from "../slice/usersApiSlice";
import toast from "react-hot-toast";

const Header = () => {
  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <header className="items-center h-[10vh] px-2 md:px-20 py-4 font-poppins">
      <div className="flex flex-row justify-between">
        <div className="hidden md:block">
          <Link to="/">
            <h2 className="tracking-widest text-2xl">MAIL NEST</h2>
          </Link>
        </div>
        {/* Nav Links */}
        <div>
          <ul className="flex flex-row justify-between gap-3">
            {navLinks.map((link) => (
              <li key={link.name} className="hover:font-bold transition-all">
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* auth part */}
        <div>
          <div>
            {userInfo ? (
              <>
                <div className="flex items-center">
                  <button
                    onClick={toggleDropdown}
                    className="ml-2 focus:outline-none flex items-center gap-2"
                  >
                    <span>{userInfo.name}</span>
                    <FaCaretDown />
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="absolute top-12 right-4 bg-white text-black shadow-md py-2 rounded-md">
                    <ul className="list-none p-0 m-0">
                      <li className="cursor-pointer hover:bg-gray-200 py-1 px-4">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2"
                          onClick={toggleDropdown}
                        >
                          <MdOutlineSpaceDashboard />
                          Dashboard
                        </Link>
                      </li>
                      <li className="cursor-pointer hover:bg-gray-200 py-1 px-4">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2"
                          onClick={toggleDropdown}
                        >
                          <FaUserCircle />
                          Profile
                        </Link>
                      </li>

                      <li
                        onClick={() => {
                          handleLogout();
                          toggleDropdown();
                        }}
                        className="cursor-pointer hover:bg-gray-200 py-1 px-4 flex items-center gap-2"
                      >
                        <FaSignOutAlt />
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4 ">
                  <ul className="hidden space-x-4 md:flex">
                    <li className="">
                      <Link
                        to="/login"
                        className="items-center text-sm rounded-full px-3 py-2 hover:bg-slate-100"
                      >
                        {/* <FaSignInAlt /> Sign In */}
                        Sign In
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="/register"
                        className="text-sm  rounded-full px-3 py-2 bg-slate-200 hover:bg-black hover:text-white transition-all"
                      >
                        {/* <FaSignOutAlt /> Sign Up */}
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
