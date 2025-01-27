import { useForm, SubmitHandler } from "react-hook-form";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import InputSocialMedia from "./InputSocialMedia";
import Input from "./Input";
import {
  InputInterface,
  SocialMediaInputInterface,
  UserAccountInterface,
} from "../../interfaces/userAccountInterface";

import { setIsLoading, setUserData } from "../../features/userSlice";

import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/config";
import Loader from "../general/Loader";
import { useState } from "react";
import { storage } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UserAccount() {
  const dispatch = useDispatch<AppDispatch>();

  const { userData, isLoading: isUserDataLoading } = useSelector(
    (state: RootState) => state.user
  );

  const [coverPhoto, setCoverPhoto] = useState(userData?.coverPhoto || "");
  const [photo, setPhoto] = useState(userData?.photo || "user_placeholder.png");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserAccountInterface>({
    defaultValues: {
      ...userData,
    },
  });

  const socialMediaInputs: SocialMediaInputInterface[] = [
    {
      id: "facebook",
      icon: <FaFacebookF />,
    },
    {
      id: "twitterX",
      icon: <FaTwitter />,
    },
    {
      id: "instagram",
      icon: <FaInstagram />,
    },
  ];

  const inputs: InputInterface[] = [
    {
      label: "First Name",
      id: "fName",
      type: "text",
      validators: { required: "First name is required" },
      span: 2,
    },
    {
      label: "Last Name",
      id: "lName",
      type: "text",
      validators: { required: "Last name is required" },
      span: 2,
    },
    {
      label: "Bio Description",
      id: "bio",
      type: "text",
      validators: {},
      span: 4,
    },
    {
      label: "Email address",
      id: "email",
      type: "text",
      validators: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      },
      span: 2,
    },
    {
      label: "Phone number",
      id: "phone",
      type: "tel",
      validators: { required: "Phone number is required" },
      span: 2,
    },
    {
      label: "Address 1",
      id: "addressLine_1",
      type: "text",
      validators: { required: "Address 1 is required" },
      span: 2,
    },
    {
      label: "Address 2",
      id: "addressLine_2",
      type: "text",
      validators: {},
      span: 2,
    },
    {
      label: "City",
      id: "city",
      type: "text",
      validators: { required: "City is required" },
      span: 1,
    },
    {
      label: "State",
      id: "state",
      type: "text",
      validators: { required: "State is required" },
      span: 1,
    },
    {
      label: "Country",
      id: "country",
      type: "text",
      validators: { required: "Country is required" },
      span: 1,
    },
    {
      label: "Zipcode",
      id: "zipCode",
      type: "text",
      validators: { required: "Zipcode is required" },
      span: 1,
    },
  ];

  // Submit function
  const onSubmit: SubmitHandler<UserAccountInterface> = async (data) => {
    try {
      console.log(data);
      const response = await fetch(`${API_BASE_URL}/user/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error updating user data");
      }

      const userData = await response.json();
      console.log(userData);

      dispatch(setUserData(userData.data.user));
      toast.success("User data updated successfully");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message || "Error updating user data");
    } finally {
      dispatch(setIsLoading(false));
    }

    // Call an API or dispatch Redux action here with the updated data
  };

  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const storageRef = ref(storage, `photos/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Photo URL:", downloadURL);

      setPhoto(downloadURL); // Update local state

      // Send the download URL to your backend
      const response = await fetch(`${API_BASE_URL}/user/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo: downloadURL }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error uploading photo");
      }

      const userData = await response.json();
      console.log(userData);

      dispatch(setUserData(userData.data.user));
      toast.success("User photo updated successfully");
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleAddCoverPhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const storageRef = ref(storage, `coverPhotos/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Cover Photo URL:", downloadURL);

      setCoverPhoto(downloadURL); // Update local state

      // Send the download URL to your backend
      const response = await fetch(`${API_BASE_URL}/user/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coverPhoto: downloadURL }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error uploading cover photo");
      }

      const userData = await response.json();
      console.log(userData);

      dispatch(setUserData(userData.data.user));
      toast.success("User coverPhoto updated successfully");
    } catch (error) {
      console.error("Error uploading cover photo:", error);
    }
  };

  if (isUserDataLoading) {
    return (
      <div className="my-56 w-screen flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="my-3 mx-6 shadow-2xl rounded-lg">
      <div
        className={`text-white p-4 sm:p-8 pb-24 sm:pb-24 rounded-lg relative ${
          coverPhoto ? "" : "bg-primary"
        }`}
        style={
          coverPhoto
            ? {
                backgroundImage: `url(${coverPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <h1 className="text-2xl md:text-3xl font-semibold ">
          Personal details
        </h1>
        <p className="mt-2">
          Update your information and find out how it's used.
        </p>
        <div className="absolute right-4 bottom-4 sm:right-8 sm:bottom-8 text-sm w-24 sm:w-fit hover:scale-105">
          <input
            id="coverPhotoUpload"
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleAddCoverPhoto}
          />
          <label
            htmlFor="coverPhotoUpload"
            className="px-4 py-2 cursor-pointer text-black"
          >
            Upload Cover Photo
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pb-10 px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 ">
          <div className="md:col-span-3">
            <div className="flex flex-col items-center gap-4 ">
              <div className="border-white border-2 rounded-full overflow-hidden transform -translate-y-1/2">
                <img
                  src={photo}
                  alt="userImage"
                  className="border-gray-300 border-4 rounded-full object-cover w-28 h-28"
                />
              </div>

              <div className="text-sm hover:scale-105 transform -translate-y-[40px]">
                <input
                  id="photoUpload"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleAddPhoto}
                />
                <label
                  htmlFor="photoUpload"
                  className="px-4 py-2 cursor-pointer"
                >
                  Upload Photo
                </label>
              </div>
              {/* <button className="text-sm hover:scale-105 transform -translate-y-[40px]">
                Upload Photo
              </button> */}
            </div>

            <div className="w-full flex flex-col justify-end gap-8">
              {socialMediaInputs.map((ele) => (
                <InputSocialMedia
                  input={ele}
                  key={ele.id}
                  register={register}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-9 mt-10">
            <div className="grid grid-cols-4 gap-6">
              {inputs.map((input) => (
                <Input
                  ele={input}
                  key={input.id}
                  register={register}
                  errors={errors}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10 gap-5">
          <button
            className="border-2 border-black px-6 py-1 rounded-full"
            type="button"
            onClick={() => reset()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-1 rounded-full hover:bg-primary/95"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserAccount;
