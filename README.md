# Online Resume Builder

This project provides facility to create resume with selection from given 3 templates.
Where we focuses to distribution client and server directory separation for better readability.  


## Project Structure
`./server` consists proper backend infrastructure (built with MongoDB Atllas, Node + express.js)
`./client` consists frontend structure (built with React.js Tech)

---

## Getting Started

Follow these steps to run the project locally.

---

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local or Atlas)

---

## Overview of project

1. **Clone the repository**
```cmd
git clone https://github.com/Sudhirkumar6009/Resume-Builder.git
```
2. **put cmd in root directory. Then create node modules for both directories `./server` and `./client`**
```cmd
cd ./Resume-Builder

cd ./server
npm install


cd ../

cd ./client
npm install
```

3. **Running the Project**
Use two separate terminals to run the frontend and backend.

3.1. Start Backend (Server)
```cmd
cd ./server
npm nodemon
```
Backend will run at port 5000
(If you don't have nodemon: npm install -g nodemon)

`cd ../` (come agian to root directory)

3.2. Start Frontend (Client)
```cmd
cd ./client
npm run dev
```
Frontend will run at: `http://localhost:8080`
(Future Enhancement Idea : We can also put this as environment variable for proper pratice)

### Environment Variables
Created .env in `./server` with:
```cmd
MONGO_URI=mongodb+srv://sudhirkumarkiller1011:0Q0eIu7IkUMfgQcr@resumebuilder.ymfjyyh.mongodb.net/?retryWrites=true&w=majority&appName=ResumeBuilder
```

### Contact
For questions or issues,
MAIL ME : sudhir.kuchara@gmail.com :)

