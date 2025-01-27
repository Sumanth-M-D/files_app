import {
  InputFieldInterface,
  LoginFormInputsInterface,
  SignupFormInputsInterface,
} from "../../interfaces/authenticationInterfac";
import { Path, UseFormRegister, FieldError } from "react-hook-form";

interface InputAuthPropsInterface {
  fieldData: InputFieldInterface;
  register: UseFormRegister<
    SignupFormInputsInterface | LoginFormInputsInterface
  >;
  errors: Partial<Record<Path<SignupFormInputsInterface>, FieldError>>;
}
// Input component for authentication forms
function InputAuth({ fieldData, register, errors }: InputAuthPropsInterface) {
  const { type, name, validators, placeholder } = fieldData;

  return (
    <div>
      <input
        type={type}
        {...register(name, validators)}
        placeholder={placeholder}
        className={` w-full p-2 rounded-md border-2 border-gray-400  outline-none border-b-2"} transition-all duration-200`}
      />
      {errors?.[name] && (
        <p className="text-red-600 font-semibold  text-sm ">
          {errors?.[name].message || "Invalid input"}
        </p>
      )}
    </div>
  );
}

export default InputAuth;
