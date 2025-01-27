import {
  InputInterface,
  UserAccountInterface,
} from "../../interfaces/userAccountInterface";
import { Path, UseFormRegister, FieldError } from "react-hook-form";

interface InputPropsInterface {
  ele: InputInterface;
  register: UseFormRegister<UserAccountInterface>;
  errors: Partial<Record<Path<UserAccountInterface>, FieldError>>;
}

function Input({ ele, register, errors }: InputPropsInterface) {
  return (
    <div
      className={`${ele.span === 1 ? "col-span-2 md:col-span-1" : ele.span === 2 ? "col-span-4 md:col-span-2" : "col-span-4"}`}
    >
      <label htmlFor={ele.id} className="block text-sm font-medium mb-1">
        {ele.label}
      </label>
      <input
        id={ele.id}
        type="text"
        {...register(ele.id, ele.validators)}
        className={`w-full border-2 border-opacity-60 shadow-sm py-2 px-3 rounded-lg outline-none ${errors[ele.id] ? "border-primary" : "border-black "}`}
      />
      {errors[ele.id] && (
        <p className="text-sm text-red-500 mt-1">{errors[ele.id]?.message}</p>
      )}
    </div>
  );
}

export default Input;
