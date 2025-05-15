# Legal Document Summarizer

A web application that simplifies legal documents using AI.

## Features

- Upload legal documents (PDF, DOCX, TXT)
- AI-powered summarization with Google Gemini
- Simple, easy-to-understand summaries
- Immediate document disposal after processing

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: FastAPI
- **AI**: Google Gemini

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Python (v3.8+)
- Google Gemini API key

### Frontend Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Access the frontend at http://localhost:3000

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Configure your environment variables:
   - Create a new `.env` file
   - Add your Google Gemini API key to the `.env` file:
     ```
     GOOGLE_API_KEY=your_api_key_here
     ```

5. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

6. The backend will be available at http://localhost:8000

## Usage

1. Open the web application in your browser
2. Upload a legal document using the upload area
3. Click "Summarize Document"
4. View the simplified summary
