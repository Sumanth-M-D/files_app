import AuthLayout from "../components/authentication/AuthLayout";
import Login from "../components/authentication/Login";

function LoginPage() {
  return (
    <div>
      <AuthLayout>
        <Login />
      </AuthLayout>
    </div>
  );
}

export default LoginPage;
