import { Link } from "react-router-dom";

interface ChangeAuthLinkInterface {
  toAuthType: string;
}

// Component to change the authentication link :- Login <-> Sign up
function ChangeAuthLink({ toAuthType }: ChangeAuthLinkInterface) {
  return (
    <div className="flex justify-center gap-3 text-sm">
      <p>
        {toAuthType === "login"
          ? "Already have an account?"
          : "Don't have an account"}
      </p>
      <Link
        to={`/${toAuthType}`}
        className="text-primary font-semibold hover:scale-125 transition-all duration-100"
      >
        {toAuthType === "login" ? "Login" : "sign up"}
      </Link>
    </div>
  );
}

export default ChangeAuthLink;
