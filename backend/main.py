from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
import tempfile
import PyPDF2
import docx
import io
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://peterjandre.github.io",  # GitHub Pages
        "https://*.vercel.app"  # Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google Gemini API
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable not set. Please check your .env file.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.0-flash')

@app.get("/")
async def root():
    return {"message": "Welcome to the Legal Document Summarizer API. Use /summarize endpoint to process documents."}

def extract_text_from_pdf(file_content):
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
    text = ""
    for page_num in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page_num].extract_text()
    return text

def extract_text_from_docx(file_content):
    doc = docx.Document(io.BytesIO(file_content))
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

@app.post("/summarize")
async def summarize_document(file: UploadFile = File(...)):
    try:
        # Read file content
        content = await file.read()
        
        # Extract text based on file type
        if file.filename.endswith('.pdf'):
            document_text = extract_text_from_pdf(content)
        elif file.filename.endswith('.docx'):
            document_text = extract_text_from_docx(content)
        elif file.filename.endswith('.doc'):
            raise HTTPException(status_code=400, detail="DOC format requires additional processing. Please convert to DOCX or PDF.")
        elif file.filename.endswith('.txt'):
            document_text = content.decode('utf-8')
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
        # Truncate if document is too long
        if len(document_text) > 30000:
            document_text = document_text[:30000] + "..."
        
        # Generate summary with Google Gemini
        prompt = f"""
        You are a legal document summarizer. Your task is to:
        1. Summarize the following legal document in simple, easy-to-understand language
        2. Highlight the key points and obligations
        3. Explain any complex legal terms in plain English
        4. Keep the summary concise but comprehensive
        
        Here is the document:
        {document_text}
        """
        
        response = model.generate_content(prompt)
        summary = response.text
        
        return {"summary": summary}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
