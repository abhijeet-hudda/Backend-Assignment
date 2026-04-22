import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authslice";
import Button from "../components/Button.components";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center  h-screen bg-black text-white">
      <div className="p-8 bg-zinc-900 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Are you sure you want to logout?</h2>
        <Button onClick={handleLogout} className="w-full">Logout</Button>
      </div>
    </div>
  );
}
