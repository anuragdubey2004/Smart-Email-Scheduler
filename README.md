<div align="center">

# 🚀 Smart Email Scheduler
### *An Intelligent Full-Stack Application for Automated Email Management & Smart Scheduling*

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Celery](https://img.shields.io/badge/Celery-Task_Queue-37814A?style=for-the-badge&logo=celery&logoColor=white)](https://docs.celeryq.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-Frontend_Tooling-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[✨ **View Live Demo**](https://smart-email-scheduler-eight.vercel.app/)

</div>

---

## 📖 About The Project
**Smart Email Scheduler** is a full-stack productivity tool designed to help users compose, manage, and schedule emails seamlessly. Built with modern web architecture, it features robust user authentication, background task automation, and a clean, responsive user interface.

---

## ✨ Key Features
* **Secure Authentication:** JWT-based user authentication and secure password hashing.
* **Smart Scheduling:** Queue and schedule emails to be sent automatically at specified times using Celery and Redis.
* **Inbox & Tracking Management:** View inbox messages and monitor scheduled or sent items dynamically.
* **Modern UI/UX:** Built with React, Vite, and Tailwind/Custom styling for a seamless user experience.
* **Production-Ready Architecture:** Clean separation of concerns with a FastAPI backend and a Vercel-hosted React frontend.

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js** (with Vite)
* **Axios** (for API communication)
* **React Router** (for client-side routing)

### **Backend**
* **FastAPI** (Python web framework)
* **SQLAlchemy & Alembic** (ORM & Database migrations)
* **Celery & Redis** (Asynchronous background task processing)
* **PostgreSQL** (Relational database)

---

## 📸 Screenshots
> **Home View**
> <img width="1536" height="768" alt="image" src="https://github.com/user-attachments/assets/430119fe-2c0d-4fdd-aea8-a937c0d2bad4" />

<!-- TODO: Paste your dashboard screenshot here -->
> **Dashboard View**: A clean view displaying all your successfully received emails.
> <img width="1522" height="760" alt="image" src="https://github.com/user-attachments/assets/e18cf77d-840b-4826-9172-0306489ea323" />


<!-- TODO: Paste your scheduler/compose form screenshot here -->
> **Email Scheduling Interface**: A simple pop-up box where you can easily write messages and pick a future time to schedule them.
> <img width="1527" height="766" alt="image" src="https://github.com/user-attachments/assets/a5027feb-f30e-40df-99a6-2bd3843d9efc" />


> **Scheduled Mail Tab**: Tracks your outgoing emails and shows if they are pending or already sent using clear icons.
> <img width="1529" height="759" alt="image" src="https://github.com/user-attachments/assets/635fa5a4-4e11-45c6-a12f-070cddcc8c54" />


---

## ⚙️ System Architecture & Workflow
1. **Client Request:** The user interacts with the React frontend deployed on Vercel.
2. **API Gateway:** Requests are sent via Axios to the FastAPI backend hosted on Render.
3. **Database Operations:** User data and email states are securely stored and queried using PostgreSQL via SQLAlchemy.
4. **Background Automation:** Scheduled tasks are queued into **Redis** and processed asynchronously via **Celery** workers to ensure reliable delivery.


