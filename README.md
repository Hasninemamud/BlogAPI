Perfect 👍 — below is a ready-to-use **`README.md`** in proper Markdown format for your BlogApp project.

Save this as `README.md` in your project root.

```markdown
# 📖 BlogApp MVP

A **full-stack blog application** built with **Django REST Framework (backend)** and **React (frontend)**.  
Includes authentication, CRUD for posts, comments, and a **rich text editor** for writing formatted posts.  

---

## 🚀 Features

### Core MVP
- ✅ **User Authentication**
  - Register, Login, Logout
  - Profile page with basic info
- ✅ **Blog Posts**
  - Create, Read, Edit, Delete posts (CRUD)
  - Upload optional images
- ✅ **Comments**
  - Add, view, and delete own comments
- ✅ **Rich Text Editor**
  - Create and edit posts with formatting (headings, bold, italic, links, lists)

### Post-MVP (Nice-to-Have)
- 👍 Likes & Reactions  
- 👍 Categories & Tags  
- 👍 Search & Pagination  
- 👍 Profile customization (bio, avatar)  

---

## 🏗️ Project Structure

```

BlogAPI/
│
├── backend/                  # Django REST Framework backend
│   ├── blog/                 # Blog app (models, views, serializers)
│   ├── accounts/             # User authentication
│   ├── settings.py           # Django settings (PostgreSQL, media)
│   └── urls.py               # Project routes
│
└── blog-frontend/            # React frontend (Vite)
├── src/
│   ├── components/       # Reusable components (PostCard, NavBar)
│   ├── pages/            # Pages (Home, PostDetail, CreatePost, Profile)
│   ├── services/         # API configuration
│   └── App.jsx           # Main App
└── package.json

````

---

## ⚙️ Backend Setup (Django + DRF)

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
````

### 2. Install Dependencies

```bash
pip install django djangorestframework psycopg2-binary Pillow django-cors-headers
```

### 3. Configure Database (PostgreSQL)

In `backend/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'blogdb',
        'USER': 'postgres',
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

INSTALLED_APPS += ["corsheaders"]
MIDDLEWARE.insert(0, "corsheaders.middleware.CorsMiddleware")
CORS_ALLOW_ALL_ORIGINS = True
```

### 4. Run Migrations & Start Server

```bash
python manage.py migrate
python manage.py runserver
```

Backend will run at: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 🎨 Frontend Setup (React + Vite)

### 1. Install Dependencies

```bash
cd blog-frontend
npm install
```

### 2. Install Rich Text Editor

```bash
npm install @blocknote/react @blocknote/core
```

### 3. Configure API Base URL

Create `.env` in `blog-frontend`:

```
VITE_API_URL=http://127.0.0.1:8000/api/
```

In `src/services/api.js`:

```js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/",
  withCredentials: true,
});

export default API;
```

### 4. Run Frontend

```bash
npm run dev
```

Frontend will run at: **[http://127.0.0.1:5173](http://127.0.0.1:5173)**

---

## ✍️ Creating a Post with Rich Text Editor

In `src/pages/CreatePost.jsx`:

```jsx
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: [] });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const editor = useBlockNote({
    onChange: (ed) => setForm({ ...form, content: ed.topLevelBlocks }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", JSON.stringify(form.content));
    if (image) formData.append("image", image);

    API.post("blog/posts/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(() => navigate("/"));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="block w-full border rounded p-2"
          required
        />
        <BlockNoteView editor={editor} className="h-60" />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
```

---

## 🔍 Rendering Rich Text Content

In `PostDetail.jsx`:

```jsx
import DOMPurify from "dompurify";

<div
  className="prose max-w-none"
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content_html) }}
></div>
```

> 💡 Convert BlockNote JSON to HTML on the backend before sending to frontend.

---

## ✅ Deployment Notes

* Serve React build files with Django **or**
* Deploy separately:

  * Backend → Render, Railway, or Heroku
  * Frontend → Vercel or Netlify
* Configure **CORS** with `django-cors-headers`

---

## 🛠️ Tech Stack

* **Backend**: Django, Django REST Framework, PostgreSQL
* **Frontend**: React 19 (Vite), Tailwind CSS, BlockNote Editor
* **Auth**: JWT / Session-based

---

## 📌 Next Steps

* [ ] Add Likes/Reactions
* [ ] Add Categories & Tags
* [ ] Add Search + Pagination
* [ ] Add Profile customization (bio, avatar)

---

## 👨‍💻 Author

Developed with ❤️ using Django & React.

```

---

