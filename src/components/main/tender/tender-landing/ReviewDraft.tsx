"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Expand, Minimize } from "lucide-react";
import KendoEditor from "../../text-editor-component";
import { ChatSection } from "./ChatSection";
import PageBackHeader from "../../AppBackHeader";
import { toast, Toaster } from "sonner";
import { sampleTemplates } from "@/constants";

interface TemplateEditorProps {
  id: string;
  templateId: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function DraftReview({ id, templateId }: TemplateEditorProps) {
  const router = useRouter();
  const editorRef = useRef<any>(null);

  const [editorValue, setEditorValue] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch template content from constants
  useEffect(() => {
    if (templateId) {
      const template = sampleTemplates.find((t) => t.id === templateId);
      if (template) {
        setEditorValue(template.editorValue);
      } else {
        toast.error("Template not found");
      }
    }
  }, [templateId]);

  const handleEditorChange = (content: string) => {
    setEditorValue(content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      console.log("Saving draft for editor content:", editorValue);
      toast.success("Draft Saved");
      router.replace(`/internal/my-tender/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to perform action");
    }
  };

  const handleCopyFromChat = (text: string) => {
    setEditorValue(text);
    setIsEditing(true);
  };

  return (
    <div className="max-w-full mx-auto p-3 space-y-4">
      <PageBackHeader title="Review Draft" />

      {/* Kendo Editor */}
      <div>
        <KendoEditor
          initialContent={editorValue}
          onChange={(e: any) => handleEditorChange(e.html)}
          height={640}
          ref={editorRef}
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button onClick={handleSave}>{isEditing ? "Save" : "Create"}</Button>

        {/* Chat AI Sheet */}
        <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Chat with AI</Button>
          </SheetTrigger>

          <SheetContent side="right" className="p-4" style={{ maxWidth: isFullWidth ? "200vw" : "30vw" }}>
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center justify-between mt-8">
                  <span>Chat AI</span>
                  <span className="ms-2 cursor-pointer" onClick={() => setIsFullWidth(!isFullWidth)}>
                    {isFullWidth ? <Minimize size={16} /> : <Expand size={16} />}
                  </span>
                </div>
              </SheetTitle>
              <SheetDescription>Chat with AI to get suggestions for your draft</SheetDescription>
            </SheetHeader>

            <ChatSection messages={messages} setMessages={setMessages} onCopy={handleCopyFromChat} />
          </SheetContent>
        </Sheet>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
