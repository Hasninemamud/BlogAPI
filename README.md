
# BlogApp MVP

A **full-stack blog application** built with **Django REST Framework (backend)** and **React (frontend)**.  
Includes authentication, CRUD for posts, comments, and a **rich text editor** for writing formatted posts.  



## Features

### Core MVP
- ✅ **User Authentication**
  - Register, Login, Logout
  - Profile page with basic info
- ✅ **Blog Posts**
  - Create, Read, Edit, Delete posts (CRUD)
  - Upload optional images
- ✅ **Comments**
  - Add, view, and delete own comments

##  Project Structure

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

##  Backend Setup (Django + DRF)

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

## Frontend Setup (React + Vite)

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



>  Convert BlockNote JSON to HTML on the backend before sending to frontend.


## ✅ Deployment Notes

* Serve React build files with Django **or**
* Deploy separately:

  * Backend → Render, Railway, or Heroku
  * Frontend → Vercel or Netlify
* Configure **CORS** with `django-cors-headers`



##  Tech Stack

* **Backend**: Django, Django REST Framework, PostgreSQL
* **Frontend**: React 19 (Vite), Tailwind CSS, BlockNote Editor
* **Auth**: JWT / Session-based



##  Next Steps

* [ ] Add Likes/Reactions
* [ ] Add Categories & Tags
* [ ] Add Search + Pagination
* [ ] Add Profile customization (bio, avatar)





