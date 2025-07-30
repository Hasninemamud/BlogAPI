import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("accounts/profile/")
      .then((res) => setUser(res.data))
      .catch(() => {
        alert("Please login first");
        navigate("/login");
      });
  }, [navigate]);

  if (!user) return <p className="text-center mt-6">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}

export default Profile;
