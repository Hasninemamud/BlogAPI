import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    API.get(`blog/posts/?search=${search}`)
      .then((res) => setPosts(res.data.results || res.data))
      .catch(() => setError("Failed to fetch posts"))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {loading && <p className="text-center">Loading posts...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-600">No posts found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
