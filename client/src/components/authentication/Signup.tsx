import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ChangeAuthLink from "./ChangeAuthLink";
import { API_BASE_URL } from "../../config/config";
import { setUserData } from "../../features/userSlice";
import {
  InputFieldInterface,
  SignupFormInputsInterface,
} from "../../interfaces/authenticationInterfac";
import { RootState } from "../../store";
import InputAuth from "./InputAuth";

function Signup() {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<SignupFormInputsInterface>();

  const password = watch("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.user);

  // Input fields for the signup form
  const inputFields: InputFieldInterface[] = [
    {
      name: "fName",
      placeholder: "First Name",
      type: "text",
      validators: {
        required: { value: true, message: "Can't be empty" },
      },
    },
    {
      name: "lName",
      placeholder: "Last Name",
      type: "text",
      validators: {
        required: { value: true, message: "Can't be empty" },
      },
    },
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
      name: "phone",
      placeholder: "Phone Number",
      type: "text",
      validators: {
        required: { value: true, message: "Can't be empty" },
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
    {
      name: "passwordConfirm",
      placeholder: "Repeat password",
      type: "text",
      validators: {
        required: { value: true, message: "Can't be empty" },
        validate: (value: string) =>
          value === password || "Passwords do not match",
      },
    },
  ];

  // Function to handle the form submission
  async function onSubmit(body: SignupFormInputsInterface) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up.");
      }
      const userData = await response.json();

      dispatch(setUserData(userData.data.user));
      navigate("/", { replace: true });
      toast.success("Account created successfully", { autoClose: 1000 });
    } catch (error: any) {
      if (error.message.startsWith("Duplicate field")) {
        return toast.error("User is already registerd try logging in");
      }
      toast.error(error.message);
    }
  }

  return (
    <div className="border-4 border-gray-500 xs:w-96 w-80 p-10 rounded-xl flex flex-col gap-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Sign Up to Files App
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {inputFields.map((field, index) => (
          <div key={index} className="relative ">
            <InputAuth<SignupFormInputsInterface>
              fieldData={field}
              register={register}
              errors={errors}
            />
          </div>
        ))}

        <button
          type="submit"
          className="rounded-md py-2 mt-4 font-semibold bg-primary text-white transition-all duration-200 hover:scale-105 active:scale-95 px-6"
          disabled={isLoading}
        >
          Create an account
        </button>
      </form>
      <ChangeAuthLink toAuthType="login" />
    </div>
  );
}
export default Signup;
