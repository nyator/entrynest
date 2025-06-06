# 📝 GROUP 46 - entrynest

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

> **entrynest** is a job search portal to discover internships, mentorships and entry-level jobs (entrynest). It is a web application that allows users to search for job openings, apply to positions, and connect with potential employers. The platform is designed to be user-friendly and accessible, making it easy for job seekers to find opportunities
---

## 📚 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [FAQ](#-faq)
- [License](#-license)
- [Author](#-author)
- [Contact](#contact)

---

## 🚀 Features

- ✨ **Beautiful UI:** Clean, responsive, and intuitive interface.
- 🗂️ **Organize Entries:** Create, edit, and categorize your notes or journal entries.
- 🔍 **Search & Filter:** Quickly find entries with powerful search and filter options.
- ☁️ **Cloud Sync:** (Optional) Sync your entries across devices.
- 🔒 **Privacy First:** Your data stays with you.

---

## 📸 Screenshots

<!-- Add your screenshots here -->
<p align="center">
  <img src="docs/client_1.png" width="600" alt="entrynest client"/>

  <img src="docs/client_2.png" width="600" alt="entrynest client"/>

  <img src="docs/client_3.png" width="600" alt="entrynest client"/>

  <img src="docs/employer.png" width="600" alt="entrynest employer"/>

  <img src="docs/mentor.png" width="600" alt="entrynest mentor"/>

  <img src="docs/admin.png" width="600" alt="entrynest admin"/>
</p>

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Atlas or local)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/nyator/entrynest.git
cd entrynest
```

#### 2. Setup the backend

```bash
cd backend
cp .env.example .env # Edit .env with your MongoDB URI and secrets
npm install
npm start
```

#### 3. Setup the frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:3000](http://localhost:3000) by default.

---

## 💡 Usage

### 👥 User Types & Capabilities

- **Jobseeker**

  - Sign up, create and manage a profile.
  - Search and apply for jobs.
  - Join mentorship programs and communicate with mentors.
  - Track application status by email notifications.

- **Employer**

  - Register and create a company profile.
  - Post job openings and manage job listings.
  - View and manage job applications.
  - Download and view application resumes.
  - Communicate with jobseekers and manage hiring process.

- **Mentor**

  - Register as a mentor and set up a mentorship profile.
  - Create mentorship opportunities and manage mentee applications.
  - Schedule and manage mentorship sessions.
  - Provide resource for mentees.
  - Communicate with mentees and provide guidance.

- **Admin**
  - Access the admin dashboard.
  - Manage users (jobseekers, employers, mentors).
  - Oversee job postings, mentorships, and platform statistics.
  - Moderate content and manage platform.

---

1. **Sign Up / Log In:** Create an account or log in to access your entries.
2. **Create Entries:** Click the "New Entry" button to add notes or journal logs.
3. **Organize:** Use categories and tags to organize your entries.
4. **Search & Filter:** Use the search bar or filters to quickly find entries.
5. **Edit/Delete:** Click on any entry to edit or delete it.

---

## 🛠️ Technologies Used

- **Frontend:** React, Vite, CSS/Tailwind/Styled Components
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, Nodemailer
- **Other:** REST API, Email notifications, File uploads

---

## 📦 Project Structure

```
entrynest/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── .env.example
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── README.md
```

---

## 🚀 Deployment

- **Frontend:** Deploy with Vercel, Netlify, or your preferred static host.
- **Backend:** Deploy with Render, Railway, Heroku, or a VPS.
  - Set environment variables for MongoDB, JWT, SMTP, and API URLs.
  - Make sure the backend `API_URL` and frontend `CLIENT_URL` are set correctly in `.env`.
- **Uploads:** If using file uploads, ensure the `/uploads` directory is writable and served as static files.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check [issues page](https://github.com/nyator/entrynest/issues) or submit a pull request.

---

## ❓ FAQ

**Q: Is my data private?**  
A: Yes, your data is stored securely and never shared.

**Q: Can I use entrynest on mobile?**  
A: Yes, entrynest is fully responsive and works on all devices.

**Q: How do I report a bug?**  
A: Please open an issue on the [GitHub Issues page](https://github.com/nyator/entrynest/issues).

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

- **Henry Nyator** – [@nyator](https://github.com/nyator)

---

## 📬 Contact

For questions or support, please email [nyatorhenry@gmail.com](mailto:nyatorhenry@gmail.com).
