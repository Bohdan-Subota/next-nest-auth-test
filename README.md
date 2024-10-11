# Next.js and NestJS Project

This project consists of a Next.js frontend and a NestJS backend, both using TypeScript.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-project-name.git
   cd your-project-name
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend && npm install
   cd ../backend && npm install
   ```

## Running the Project

### Backend (NestJS)

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Start the NestJS server:
   ```
   npm run start:dev
   ```

The NestJS server will run on `http://localhost:8000`.

### Frontend (Next.js)

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Start the Next.js development server:
   ```
   npm run dev
   ```

The Next.js application will be available at `http://localhost:3000`.

## Development

You can now make changes to your Next.js frontend and NestJS backend. The development servers will automatically reload when you save changes.

## Building for Production

### Backend
```
cd backend
npm run build
```

### Frontend
```
cd frontend
npm run build
```

For more detailed information, refer to the Next.js and NestJS documentation.
