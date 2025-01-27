import {
  InputFieldInterface,
  ValidatorInterface,
} from "../../interfaces/authenticationInterfac";
import {
  Path,
  UseFormRegister,
  FieldError,
  FieldValues,
} from "react-hook-form";

interface InputAuthPropsInterface<TFormInputs extends FieldValues> {
  fieldData: InputFieldInterface;
  register: UseFormRegister<TFormInputs>;
  errors: Partial<Record<Path<TFormInputs>, FieldError>>;
}

// Input component for authentication forms
function InputAuth<TFormInputs extends FieldValues>({
  fieldData,
  register,
  errors,
}: InputAuthPropsInterface<TFormInputs>) {
  const { type, name, validators, placeholder } = fieldData as {
    type: string;
    name: Path<TFormInputs>;
    validators: ValidatorInterface;
    placeholder: string;
  };

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
