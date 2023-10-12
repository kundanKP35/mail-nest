import React, { useEffect, useState } from "react";
import { useGetProfileQuery } from "../slice/usersApiSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiCopy } from "react-icons/fi"; // React Icons for copy icon
import toast from "react-hot-toast";

const UserDetails = () => {
  const { data, error, isLoading } = useGetProfileQuery();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [emailAppPassword, setEmailAppPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCopyPassword = () => {
    const passwordInput = document.getElementById("emailAppPasswordInput");
    if (passwordInput) {
      passwordInput.select();
      try {
        document.execCommand("copy");
        toast.success("Password copied to clipboard");
      } catch (err) {
        toast.error("Failed to copy password to clipboard");
      }
      document.getSelection().removeAllRanges();
    }
  };
  

  useEffect(() => {
    if (data) {
      const { name, email, appEmail, emailAppPassword } = data;
      setName(name);
      setEmail(email);
      setAppEmail(appEmail);
      setEmailAppPassword(emailAppPassword);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching user details.</div>;
  }

  return (
    <div className="border rounded-xl p-4 font-poppins text-gray-900 shadow-md">
      <h2 className="text-xl font-bold pb-3">User Details</h2>
      <div className="flex flex-col gap-y-2">
        <p className="font-semibold">
          Name: <span className="text-gray-600">{name}</span>
        </p>
        <p className="font-semibold">
          Email: <span className="text-gray-600">{email}</span>
        </p>
        <p className="font-semibold">
          App Email: <span className="text-gray-600">{appEmail}</span>
        </p>
        <div className="flex flex-row w-full justify-between items-center">
          <p className="font-semibold">Email App Password:</p>
          <input
            type={showPassword ? "text" : "password"}
            className="bg-transparent focus:outline-none flex-1"
            value={emailAppPassword}
            disabled
            id="emailAppPasswordInput"
          />
          <div className="cursor-pointer" onClick={handleClickShowPassword}>
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
