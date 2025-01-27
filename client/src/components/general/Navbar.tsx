import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { API_BASE_URL } from "../../config/config";
import { resetUserData } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch(`${API_BASE_URL}/user/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up.");
      }
      const userData = await response.json();
      console.log(response);
      console.log(userData);

      dispatch(resetUserData(userData.data.user));
      navigate("/login", { replace: true });
      toast.success("User logged out successfully", { autoClose: 1000 });
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
    }
  }

  return (
    <nav className="bg-primary text-white text-4xl md:text-5xl px-5 sm:px-10 py-4 sm:py-8">
      <div className="flex justify-between items-center">
        <NavLink to="/" className=" ">
          <FaHome className="" />
        </NavLink>

        <div className="flex gap-5 sm:gap-10 items-center">
          <NavLink to="/user" className="">
            <FaUserCircle />
          </NavLink>
          <button className="text-5xl md:text-6xl" onClick={handleLogout}>
            <IoLogOut />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
