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

2. Configure environment variables:
   - Create a `.env.local` file in the root directory
   - Add your backend API URL:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Access the frontend at http://localhost:3000

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

6. The backend will be available at the URL specified in your environment variables

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

2. **Fix Workflow Permissions** (IMPORTANT):
   - Go to Settings → Actions → General
   - Scroll down to "Workflow permissions"
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"**
   - Click Save

3. **Push your code** to the main branch:
   ```bash
   git add .
   git commit -m "Add GitHub Actions deployment"
   git push origin main
   ```

4. **Monitor the deployment**:
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



## Usage

1. Open the web application in your browser
2. Upload a legal document using the upload area
3. Click "Summarize Document"
4. View the simplified summary
