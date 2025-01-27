import AuthLayout from "../components/authentication/AuthLayout";
import Signup from "../components/authentication/Signup";

function SignupPage() {
  return (
    <div>
      <AuthLayout>
        <Signup />
      </AuthLayout>
    </div>
  );
}

export default SignupPage;
