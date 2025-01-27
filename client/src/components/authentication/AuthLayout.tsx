// Layout for the authentication pages

interface AuthLayoutInterface {
  children: React.ReactElement;
}

function AuthLayout({ children }: AuthLayoutInterface) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
}

export default AuthLayout;
