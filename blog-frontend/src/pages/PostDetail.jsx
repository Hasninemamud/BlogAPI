import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import DOMPurify from "dompurify";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      API.get(`blog/posts/${id}/`),
      API.get(`blog/posts/${id}/comments/`),
      API.get("accounts/profile/").catch(() => null),
    ])
      .then(([postRes, commentsRes, userRes]) => {
        setPost(postRes.data);
        // Ensure comments is always an array
        setComments(Array.isArray(commentsRes.data) ? commentsRes.data : []);
        if (userRes) setCurrentUser(userRes.data);
      })
      .catch(() => setError("Failed to load post"));
  }, [id, navigate]);

  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment) return;

    API.post(`blog/posts/${id}/comments/`, { content: newComment })
      .then((res) => setComments([res.data, ...comments]))
      .finally(() => setNewComment(""));
  };

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!post) return <p className="text-center mt-6">Loading...</p>;

  const isAuthor = currentUser && currentUser.username === post.author;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6 prose prose-lg">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">by {post.author}</p>

      {post.image && (
  <img
    src={
      post.image.startsWith("http")
        ? post.image
        : `${import.meta.env.VITE_API_URL}${post.image}`
    }
    alt="Post"
    className="w-full h-64 object-cover rounded mb-4"
  />
)}
      <div
        className="prose max-w-none mb-6"
         dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      ></div>

      {isAuthor && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate(`/edit/${post.id}`)}
            className="bg-yellow-500 text-white px-4 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this post?")) {
                API.delete(`blog/posts/${id}/`).then(() => navigate("/"));
              }
            }}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <form onSubmit={handleComment} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Add a comment..."
        />
        <button className="bg-blue-500 text-white px-4 rounded">Post</button>
      </form>

      <ul>
        {Array.isArray(comments) &&
          comments.map((c) => (
            <li key={c.id} className="border-b py-2">
              <b>{c.author}:</b>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(c.content),
                }}
              ></span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PostDetail;