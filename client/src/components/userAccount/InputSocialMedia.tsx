import { SocialMediaInputInterface } from "../../interfaces/userAccountInterface";

interface InputSocialMediaProps {
  input: SocialMediaInputInterface;
}
function InputSocialMedia({ input }: InputSocialMediaProps) {
  return (
    <div className="border-2 border-black border-opacity-60 shadow-sm rounded-lg py-2 px-3 flex items-center gap-3">
      {input.icon}
      <input
        className="w-full outline-none"
        value={input.value}
        onChange={input.onChange}
      />
    </div>
  );
}

export default InputSocialMedia;
