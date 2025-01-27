import ButtonPrimary from "../general/ButtonPrimary";
import InputAuth from "./InputAuth";

// Define the types for the props
interface FormAuthPropsInterface<T> {
  onSubmit: SubmitHandler<T>;
  inputFields: InputField[];
  buttonText: string;
  isLoading: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

// Form component for the authentication pages
function FormAuth({
  onSubmit,
  inputFields,
  buttonText,
  isLoading,
  register,
  errors,
}: FormAuthPropsInterface) {
  return (
    
  );
}

export default FormAuth;
