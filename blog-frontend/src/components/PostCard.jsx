import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="text-gray-600">by {post.author}</p>
      <p>{post.content.slice(0, 100)}...</p>
      <p className="text-sm text-gray-500">{post.comments_count} comments</p>
    </div>
  );
}
export default PostCard;
