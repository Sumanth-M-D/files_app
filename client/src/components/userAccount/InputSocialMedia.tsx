import {
  SocialMediaInputInterface,
  UserAccountInterface,
} from "../../interfaces/userAccountInterface";
import { UseFormRegister } from "react-hook-form";

interface InputSocialMediaProps {
  input: SocialMediaInputInterface;
  register: UseFormRegister<UserAccountInterface>;
}
function InputSocialMedia({ input, register }: InputSocialMediaProps) {
  return (
    <div className="border-2 border-black border-opacity-60 shadow-sm rounded-lg py-2 px-3 flex items-center gap-3">
      {input.icon}
      <input className="w-full outline-none" {...register(input.id)} />
    </div>
  );
}

export default InputSocialMedia;
