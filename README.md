# Task Management App

## Project Features
- User login and authentication (client-side mock)
- Add, edit, and delete tasks
- Form validation with Formik and Yup
- Private routing for authenticated pages
- In-memory backend server with Express
- Fully unit tested components with 100% coverage
- E2E tests simulating real user flows using Cypress

## Tech Stack
- **Frontend**: React, Vite, TypeScript, TailwindCSS
- **Backend**: Node.js, Express
- **Form Handling**: Formik, Yup
- **Testing**: Vitest, @testing-library/react, Cypress
- **Styling**: TailwindCSS

## Project Setup Instructions
1. Clone the Repository
   ```bash
   git clone https://github.com/Yanothai11/task-app.git
   cd task-app
   ```

2. Install Dependencies
   ```bash
   npm install
   ```

3. Start the Backend Server (http://localhost:5001)
   ```bash
   node backend.js
   ```

4. Start the Frontend (Vite Dev Server) (http://localhost:5173)
   ```bash
   npm run dev
   ```

5. Run Unit Tests with Vitest
   ```bash
   npx vitest --coverage
   ```

6. Open Cypress for E2E Testing
   ```bash
   npx cypress open
   ```

---

## Key Architectural Decisions

### Frontend
Built using **React** with **Vite** and **TypeScript** for a fast and scalable development experience.

### State Management
Managed locally within components for simplicity, no Redux or Zustand used.

### Backend
Simple **Node.js** and **Express** server (`backend.js`) that handles in-memory task operations.

### Form Validation
Used **Formik** and **Yup** for robust form handling and validation.

### Authentication
Client-side authentication mock with `auth.ts` utilities and `PrivateRoute` component.

### Testing
- **Unit Testing**:  
  Done with **Vitest** and **@testing-library/react**.
- **E2E Testing**:  
  Using **Cypress** to simulate real user flows.

### Styling
Using **Tailwind CSS** for fast and clean UI development.

### Folder Structure
```
src/
├── components/    # Reusable React components
├── pages/         # Page-level components (e.g., Dashboard)
├── services/      # API service functions (e.g., taskService.ts)
├── utils/         # Utility functions (e.g., auth.ts)
├── App.tsx        # App router setup
└── main.tsx       # App entry point
```

---

## Testing Coverage
- Components (e.g., Login, TaskList, AddTaskForm) have **100% coverage**.
- Services and utils have partial coverage.
- E2E tests pass on critical user flows (login, task management).
