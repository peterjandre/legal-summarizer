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

## Deployment

### Frontend Deployment (GitHub Pages)

This project is configured to automatically deploy the frontend to GitHub Pages using GitHub Actions.

#### Setup Instructions:

1. **Enable GitHub Pages** in your repository:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select **"Deploy from a branch"**
   - Choose the **`gh-pages`** branch
   - Select the root folder (/) and click Save

2. **Push your code** to the main branch:
   ```bash
   git add .
   git commit -m "Add GitHub Actions deployment"
   git push origin main
   ```

3. **Monitor the deployment**:
   - Go to the "Actions" tab in your repository
   - You should see a "Build and Deploy to GitHub Pages" workflow running
   - The workflow will create a `gh-pages` branch with your built files
   - Once complete, your site will be available at: `https://[your-username].github.io/legal-summarizer/`

#### How it works:

- The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically runs on every push to the main branch
- It builds the Next.js application with static export enabled
- The built files are pushed to the `gh-pages` branch
- GitHub Pages serves the site from the `gh-pages` branch
- The site is configured with the correct base path for the repository name

### Backend Deployment (Vercel)

The backend is configured for deployment to Vercel for serverless hosting.

#### Setup Instructions:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy the backend**:
   ```bash
   cd backend
   vercel
   ```

3. **Configure environment variables** in the Vercel dashboard:
   - Go to your project in the Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add `GOOGLE_API_KEY` with your Google Gemini API key

4. **Update frontend API calls**:
   - Once deployed, Vercel will provide a URL like: `https://your-project.vercel.app`
   - Update your frontend API calls to use this URL instead of `localhost:8000`

#### Vercel Configuration Files:

- `vercel.json`: Configures the Python runtime and routing
- `requirements.txt`: Python dependencies for Vercel
- `runtime.txt`: Specifies Python 3.11 runtime
- Updated CORS settings to allow GitHub Pages domain

## Usage

1. Open the web application in your browser
2. Upload a legal document using the upload area
3. Click "Summarize Document"
4. View the simplified summary
