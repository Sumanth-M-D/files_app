import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ChangeAuthLink from "./ChangeAuthLink";
import { API_BASE_URL } from "../../config/config";
import { setUserData } from "../../features/userSlice";
import {
  InputFieldInterface,
  LoginFormInputsInterface,
} from "../../interfaces/authenticationInterfac";
import { RootState } from "../../store";
import InputAuth from "./InputAuth";
import { useEffect } from "react";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputsInterface>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     toast.info("User already logged in");
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  // Input fields for the login form
  const inputFields: InputFieldInterface[] = [
    {
      name: "email",
      placeholder: "Email address",
      type: "text",
      validators: {
        required: { value: true, message: "Can't be empty" },
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "password",
      placeholder: "Password",
      type: "text",
      validators: {
        required: { value: true, message: "Can't be empty" },
        minLength: { value: 8, message: "Min 8 chars" },
        maxLength: {
          value: 15,
          message: "Max 15 chars",
        },
      },
    },
  ];

  // Function to handle the form submission
  async function onSubmit(body: LoginFormInputsInterface) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up.");
      }
      const userData = await response.json();
      console.log(userData);

      dispatch(setUserData(userData.data.user));
      navigate("/user", { replace: true });
      toast.success("User logged in successfully", { autoClose: 1000 });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="border-gray-500 border-4 xs:w-96 w-80 p-10 rounded-xl flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Login to Files App
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {inputFields.map((field, index) => (
          <div key={index} className="relative ">
            <InputAuth fieldData={field} register={register} errors={errors} />
          </div>
        ))}

        <button
          type="submit"
          className="rounded-md py-2 mt-4 font-semibold bg-primary text-white transition-all duration-200 hover:scale-105 active:scale-95 px-6"
          disabled={isLoading}
        >
          Login
        </button>
      </form>
      <ChangeAuthLink toAuthType="signup" />
    </div>
  );
}
export default Login;
