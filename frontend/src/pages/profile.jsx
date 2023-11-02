import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slice/loginSlice";
import { useUpdateProfileMutation } from "../slice/usersApiSlice";
import UserDetails from "../components/userDetails";
import Loader from "../components/Loader/loader";
import { AiFillEye, AiFillEyeInvisible, AiFillInfoCircle } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [emailAppPassword, setEmailAppPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.login);

  const [updateProfileApi, { error, isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const response = await updateProfileApi({
          _id: userInfo._id,
          name,
          email,
          password,
          appEmail,
          emailAppPassword,
        }).unwrap();
        dispatch(setCredentials({ ...response }));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (<Loader />) : (<div className="flex  flex-col md:flex-row justify-around m-auto md:mt-6 font-poppins md:px-10 gap-x-4">
        <div className="w-1/2 font-poppins">
          <h1 className="text-2xl font-bold mb-6">Update Profile</h1>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-4 flex gap-4 w-full justify-between">
              <div className="w-full">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-3 py-2 mt-1"
                />
              </div>
              <div className="w-full">
                <label htmlFor="confirmPassword" className="block text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border px-3 py-2 mt-1"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="appEmail" className="block text-gray-700">
                App Email
              </label>
              <input
                type="email"
                id="appEmail"
                placeholder="Enter your app email used for emailing"
                value={appEmail}
                onChange={(e) => setAppEmail(e.target.value)}
                className="w-full border px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="emailAppPassword" className="block text-gray-700">
                App Email Password
                <Tooltip title="Please use the app password corresponding to the email" placement="top">
                  <IconButton>
                    <AiFillInfoCircle size={15} />
                  </IconButton>
                </Tooltip>
              </label>
              {/* //password input filed */}
              <div className="flex w-full items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="emailAppPassword"
                  placeholder="Enter your 16 digit app password"
                  value={emailAppPassword}
                  onChange={(e) => setEmailAppPassword(e.target.value)}
                  className="w-full border px-3 py-2 mt-1"
                />
                <div
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  className="-m-10"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4  bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition-all"
            >
              Update
            </button>
          </form>
        </div>
        <div className="w-1/3">
          <UserDetails />
        </div>
      </div>)}
    </>
  );
};

export default Profile;
