import { useState } from "react";
import { API } from "../api/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authslice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../components/Input.components";
import Button from "../components/Button.components";
import Card from "../components/Card";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await API.post("/users/login", form);

      dispatch(loginSuccess(res.data.data.user));
      localStorage.setItem("accessToken", res.data.data.accessToken);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <Card>
        {/* Logo */}
        {/* <div className="mb-4 text-center text-white text-lg font-semibold">
          Your Logo
        </div> */}

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Sign in to your account
        </h2>

        {/* Subtext */}
        <p className="text-center text-gray-400 mb-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Form */}
        <div className="space-y-4 text-gray-400">
          <Input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Button onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
}