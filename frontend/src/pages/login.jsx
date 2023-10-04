import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { banner } from "../assets/index";
import { setCredentials } from "../slice/loginSlice";
import { useLoginMutation } from "../slice/usersApiSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginApiCall, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.login);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApiCall({ email, password }).unwrap(); // Making request to the bakend
      dispatch(setCredentials({ ...response }));
      toast(`Welcome Back ${response.name.split(" ")[0]} !`, {
        icon: '🙋',
      });
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex flex-row h-[90vh] font-poppins">
      <div className="w-[50%] hidden md:block px-2">
        <img
          src={banner}
          alt="Hero Image"
          className="w-full object-cover h-[88vh] rounded-2xl "
          style={{ margin: 0, padding: 0 }}
        />
      </div>
      <div className="md:w-[50%] my-auto md:px-20">
        <h2 className="text-3xl  pb-2 text-left">
          Welcome to MailNest,
          <br />
          Sign In to continue
        </h2>
        <div className="text-left py-3">
          <span>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline font-semibold cursor-pointer"
            >
              Create a account
            </Link>
            <br />
            It takes less than a minute.
          </span>
        </div>
        <form onSubmit={submitHandler}>
          <label htmlFor="email" className="text-xs ">
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
          <button
            type="submit"
            className="w-full bg-black text-white py-2 hover:bg-gray-900 mt-4 transition-all"
          >
            Sign In
          </button>
          <span className="flex items-center justify-center space-x-2 pt-2">
            <span className="h-px bg-gray-400 w-14"></span>
            <span className="font-normal text-gray-400">or login with</span>
            <span className="h-px bg-gray-400 w-14"></span>
          </span>
          <button
            className="flex items-center justify-center px-6 py-2 w-full mt-4 bg-gray-200 hover:bg-gray-900 hover:text-white transition-all"
            onClick={(e) => {
              e.preventDefault();
              toast.error("This feature is not available yet");
            }}
          >
            <FcGoogle className="mr-2" />
            <span>Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
