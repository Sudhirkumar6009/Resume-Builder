# Online Resume Builder

This project provides facility to create resume with selection from given 3 templates.
Where we focuses to distribution client and server directory separation for better readability.  


## Project Structure
./server consists proper backend infrastructure (built with MongoDB Atllas, Node + express.js)
./client consists frontend structure (built with React.js Tech)

---

## Getting Started

Follow these steps to run the project locally.

---

### ✅ Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local or Atlas)

---

## 📦 Installation

1. **Clone the repository**
```cmd

git clone https://github.com/Sudhirkumar6009/Resume-Builder.git

cd ./Resume-Builder

cd ./server
npm install

cd ../

cd ./client
npm install

🧑‍💻 Running the Project
Use two separate terminals to run the frontend and backend.

🖥️ Start Backend (Server)

cd ./server
npm nodemon
Backend will run at port 5000
(If you don't have nodemon: npm install -g nodemon)

cd ../
(come agian to root directory)

🌐 Start Frontend (Client)

cd ./client
npm run dev
Frontend will run at: http://localhost:8080

🔐 Environment Variables
Create .env in server/ with:

env
MONGO_URI=mongodb+srv://sudhirkumarkiller1011:0Q0eIu7IkUMfgQcr@resumebuilder.ymfjyyh.mongodb.net/?retryWrites=true&w=majority&appName=ResumeBuilder

📬 Contact
For questions or issues:
📧 sudhir.kuchara@example.com
