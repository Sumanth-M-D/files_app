import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Protected from "./components/general/Protected";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserAccountPage from "./pages/UserAccountPage";
import { useLoadLoggedInUserData } from "./custom_hooks/useLoadLoggedInUserData";
import Loader from "./components/general/Loader";
import { useLoadFolderData } from "./custom_hooks/useLoadFolderData";

function App() {
  const { isUserDataLoading } = useLoadLoggedInUserData();
  const { isFolderDataLoading } = useLoadFolderData();

  if (isUserDataLoading || isFolderDataLoading) {
    return (
      <div className="my-56 w-screen flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`/`}
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route
          path="/user"
          element={
            <Protected>
              <UserAccountPage />
            </Protected>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
