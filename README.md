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

BlogAPI/
│
├── backend/ # Django REST Framework backend
│ ├── blog/ # Blog app (models, views, serializers)
│ ├── accounts/ # User authentication
│ ├── settings.py # Django settings (PostgreSQL, media)
│ └── urls.py # Project routes
│
└── blog-frontend/ # React frontend (Vite)
├── src/
│ ├── components/ # Reusable components (PostCard, NavBar)
│ ├── pages/ # Pages (Home, PostDetail, CreatePost, Profile)
│ ├── services/ # API configuration
│ └── App.jsx # Main App
└── package.json


---

## ⚙️ Backend Setup (Django + DRF)

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
```

 **Install Dependencies**

```pip install django djangorestframework psycopg2-binary Pillow django-cors-headers```

**Configure Database (PostgreSQL)**
```DATABASES = {
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
**Run Migrations & Start Server**
```
python manage.py migrate
python manage.py runserver
```
**Backend will run at: http://127.0.0.1:8000**
