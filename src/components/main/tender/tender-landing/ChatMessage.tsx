import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const ChatMessage = ({
  message,
  isBot,
  onCopy,
}: {
  message: string;
  isBot: boolean;
  onCopy: (text: string) => void;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    onCopy(message); // Call parent function to update the textbox
    //toast({ title: "Copied!", description: "Response copied to textbox." });
  };

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`relative bg-gray-100 dark:bg-gray-800 p-3 rounded-lg w-auto text-sm shadow-md ${
          !isBot ? "bg-secondary text-gray-200" : "bg-gray text-gray-200"
        }`}
      >
        <div
          className="prose prose-sm dark:prose-invert max-w-none pr-8"
          dangerouslySetInnerHTML={{ __html: message }}
        ></div>

        {isBot && (
          <Button
            type="button"
            onClick={handleCopy}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Copy className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
