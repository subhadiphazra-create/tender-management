// components/workflow/PlaceholderModal.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

/**
 * Small wrapper modal to avoid repeating Dialog markup.
 * Children render inside the content area.
 */
export default function PlaceholderModal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="py-2">{children}</div>

        <DialogFooter>
          {/* optionally add a close button if you'd like */}
          <button className="px-3 py-1 rounded border" onClick={onClose}>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
