# 💬 Real-Time Chat App

This is a full-stack real-time chat application built using **React** (frontend) and **Django** (backend). It supports user authentication, profile image upload, friend requests, and one-on-one real-time messaging using WebSockets via Django Channels.

---

## 🌐 Live Demo

- 🔗 Frontend: [https://real-time-chat-app-frontend-eu0j.onrender.com](https://real-time-chat-app-frontend-eu0j.onrender.com)  
- 🔗 Backend API: [https://chat-app-61j5.onrender.com](https://chat-app-61j5.onrender.com)

---

## 🔐 Demo Login Credentials

> You can use the following demo account to explore the app:

- **Username:** `huda`  
- **Password:** `Huda@123`

---

## 🚀 Features

- 🔐 User Registration & JWT Authentication  
- 🖼️ Upload Profile Picture  
- 👫 Send & Accept Friend Requests  
- 💬 Real-Time Messaging via WebSockets  
- 🎨 Responsive UI built with Tailwind CSS  
- 🌐 Hosted on Render (both frontend & backend)

---

## 🧰 Tech Stack

| Layer       | Technology               |
|-------------|---------------------------|
| Frontend    | React + Vite, Tailwind CSS |
| Backend     | Django, Django REST Framework |
| Real-Time   | Django Channels + WebSockets |
| Auth        | JWT Authentication        |
| Hosting     | Render.com                |

---

Project Structure : 

real-time-chat-app/
├── backend/
│   └── chat/
│       ├── manage.py
│       ├── chat/           # Django settings + routing
│       ├── core/           # Models, views, urls
│       └── requirements.txt

├── frontend/
│   └── chat/               # React frontend with Vite
│       ├── src/
│       ├── public/
│       └── package.json

├── README.md

