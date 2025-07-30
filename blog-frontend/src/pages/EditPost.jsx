import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`blog/posts/${id}/`)
      .then((res) => setForm({ title: res.data.title, content: res.data.content }))
      .catch(() => setError("Could not load post"));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (image) formData.append("image", image);

    API.put(`blog/posts/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        alert("Post updated successfully!");
        navigate(`/post/${id}`);
      })
      .catch(() => setError("You are not authorized to edit this post"));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="block w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="block w-full border rounded p-2 h-32"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
