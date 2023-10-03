import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slice/usersApiSlice";
import { setCredentials } from "../slice/loginSlice";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { banner } from "../assets/index";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.login);

  const [registerApiCall, { error }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const response = await registerApiCall({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...response }));
        toast.success("Registration Successful");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div className="flex flex-row h-[90vh] font-poppins">
      <div className="w-[50%] hidden md:block px-2">
        <img
          src={banner}
          alt="Hero Image"
          className="w-full object-cover h-[88vh] rounded-2xl"
          style={{ margin: 0, padding: 0 }}
        />
      </div>
      <div className="md:w-[50%] my-auto md:px-20">
        <h2 className="text-3xl font-poppins pb-2 text-left">
          Welcome to MailNest,
          <br />
          Sign Up to get started
        </h2>
        <div className="text-left py-3">
          <span>
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline font-semibold cursor-pointer"
            >
              Login
            </Link>
          </span>
        </div>
        <form onSubmit={submitHandler}>
          <label htmlFor="name" className="text-xs font-poppins">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border bg-gray-100 px-3 py-2 mt-1 focus:bg-white"
          />
          <label htmlFor="email" className="text-xs font-poppins">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border bg-gray-100 px-3 py-2 mt-1 focus:bg-white"
          />
          <label htmlFor="password" className="text-xs font-poppins">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border bg-gray-100 px-3 py-2 mt-1 focus:bg-white"
          />
          <label htmlFor="confirmPassword" className="text-xs font-poppins">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border bg-gray-100 px-3 py-2 mt-1 focus:bg-white"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 hover:bg-gray-900 mt-4 transition-all"
          >
            Sign Up
          </button>
        </form>
        <span className="flex items-center justify-center space-x-2 pt-2">
          <span className="h-px bg-gray-400 w-14"></span>
          <span className="font-normal text-gray-400">or sign up with</span>
          <span className="h-px bg-gray-400 w-14"></span>
        </span>
        <button
          className="flex items-center justify-center px-6 py-2 w-full mt-4 bg-gray-200 hover:bg-gray-900 hover:text-white transition-all"
          onClick={() => toast.error("This feature is not available yet")}
        >
          <FcGoogle className="mr-2" />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
