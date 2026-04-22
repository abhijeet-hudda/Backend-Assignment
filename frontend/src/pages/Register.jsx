import { useState } from "react";
import { API } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../components/Input.components";
import Button from "../components/Button.components";
import Card from "../components/Card";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      await API.post("/users/register", form);

      toast.success("Registered successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <Card>
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Create your account
        </h2>

        {/* Subtext */}
        <p className="text-center text-gray-400 mb-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500 hover:underline"
          >
            Sign in
          </Link>
        </p>

        {/* Form */}
        <div className="space-y-4 text-gray-400 ">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* 🔥 Role Selection */}
          <select
            className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <Button onClick={handleRegister}>
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
}