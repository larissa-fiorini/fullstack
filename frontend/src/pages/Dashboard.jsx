import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const API_URL = import.meta.env.VITE_API_URL;
  const tokenAPI = import.meta.env.VITE_JWT_TOKEN;
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token")
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!email) return;

    console.log("Email to fetch:", email);

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${email}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenAPI}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json();
        setUsername(data.user.name);

      } catch (error) {
        setUsername('failed');
        console.error("Fetch error:", error);
      }
    };

    fetchData();

  }, [email]);

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className='min-h-screen w-full bg-black'>
      <h1 className="text-white">Dashboard</h1>
      {username ? (
        <h1 className="text-white">Welcome {username}</h1>
      ) : (
        <h1 className="text-white">Loading user info...</h1>
      )}
      <br></br>
      <button className="text-white bg-cyan-600 p-4 " onClick={handleLogout}>Log out</button>

    </div>
  )
}
