"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PageBackHeader({ title = "Create New Template" }: { title?: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 pb-4">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="w-10 h-10 rounded-md border"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
}
