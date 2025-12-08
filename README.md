# After-School Web App — Backend API  
**CST3144 Full Stack Development Coursework**

This backend provides the API for the After-School Lessons application.  
It is built with **Node.js**, **Express.js**, and **MongoDB Atlas**, and handles lesson retrieval, order processing, validation, and database updates.

The backend is fully deployed and accessible through Render.com.

---

## Live API URL
https://after-school-backend-tuu4.onrender.com/

### Testable Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/lessons` | Returns all lesson documents from MongoDB |
| **POST** | `/orders` | Creates a new order + updates lesson spaces |
| **GET** | `/orders` | Returns all stored orders (for testing only) |

---

## Technologies Used
- **Node.js** (runtime)
- **Express.js** (web framework)
- **MongoDB Atlas** (database)
- **dotenv** (environment variables)
- **CORS** (frontend → backend communication)
- **Render.com** (deployment)

---

## 🧪 Features Implemented

### ✔ Lesson Management
- Fetch all lessons from MongoDB (`GET /lessons`)
- Used by the frontend to display subjects, prices, locations, spaces, etc.

### ✔ Order Processing
- Accepts checkout form data from frontend
- Validates:
  - Name → letters only  
  - Phone → digits only  
  - Cart → must contain items
- Inserts the order into the **orders** collection
- Updates lesson **spaces** in the **lessons** collection

### ✔ Middleware Used
- **express.json()** → parse JSON bodies  
- **CORS** → allow only authorised frontend origins  
- **Custom Logger** → logs every incoming request  
- **Static file hosting** → `/images` (if needed)  
- **Error handler** → global fallback for unexpected errors  