import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = import.meta.env.VITE_JWT_TOKEN;
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email)
    console.log(password)

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("tokenAPI", token)
      localStorage.setItem("email", email)
      navigate("/dashboard");
    } else {
      alert("Login failed")
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-400 p-6 rounded-lg shadow-md w-full max-w-sm"
    >

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-32 bg-sky-600 text-white py-2 rounded-md hover:bg-sky-900 transition">
        Log In
      </button>
    </form >
  )
}