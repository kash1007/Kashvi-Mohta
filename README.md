# Quick run


## Backend (Flask)
1. cd backend
2. python3 -m venv venv
3. source venv/bin/activate # (Windows: venv\Scripts\activate)
4. pip install -r requirements.txt
5. export OPENAI_API_KEY="sk-..." # or set in env variables
6. flask run --port 5000


## Frontend (Vite + React)
1. cd frontend
2. npm install
3. npm run dev


Open http://localhost:5173 (or what Vite prints) and the frontend will connect to backend at http://localhost:5000.