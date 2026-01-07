import { useSearchParams } from "react-router-dom";
import { ChatDemo } from "@/components/ChatDemo";
import { LinkGenerator } from "@/components/LinkGenerator";
import { ChatSidebar } from "@/components/ChatSidebar";

const Index = () => {
  const [searchParams] = useSearchParams();
  const prompt = searchParams.get("q");

  if (prompt) {
    return <ChatDemo prompt={decodeURIComponent(prompt)} />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ChatSidebar />
      <main className="flex-1 flex items-center justify-center">
        <LinkGenerator />
      </main>
    </div>
  );
};

export default Index;
