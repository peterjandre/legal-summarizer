"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check if file is a PDF or text document
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "text/plain" ||
        selectedFile.type === "application/msword" ||
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile)
        setError("")
      } else {
        setError("Please upload a PDF or text document")
        setFile(null)
      }
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    setLoading(true)
    setSummary("")
    setError("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summarize`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to summarize document")
      }

      const data = await response.json()
      setSummary(data.summary)
      toast({
        title: "Success",
        description: "Document has been successfully summarized",
      })
    } catch (err) {
      setError("An error occurred while summarizing the document. Please try again.")
      console.error(err)
      toast({
        title: "Error",
        description: "Failed to summarize the document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Legal Document Summarizer</CardTitle>
            <CardDescription>Upload a legal document to get a simplified summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.txt,.doc,.docx"
              />
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-lg font-medium">{file ? file.name : "Click to upload or drag and drop"}</p>
                <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX, or TXT (Max 10MB)</p>
              </label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleSubmit} disabled={!file || loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Summarize Document
                </>
              )}
            </Button>

            {summary && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Simplified Summary</h3>
                <Textarea value={summary} readOnly className="min-h-[200px] p-4" />
              </div>
            )}
          </CardContent>
          {/* <CardFooter className="text-center text-sm text-gray-500">
            Your document will be discarded immediately after processing.
          </CardFooter> */}
        </Card>
      </div>
    </main>
  )
}
