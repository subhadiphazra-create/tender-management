// components/workflow/PlaceholderModal.tsx
"use client";
import React from "react";

const PlaceholderModal = ({ isOpen, title }: { isOpen: boolean; title: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[350px] text-center">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600">This is a placeholder modal.</p>
      </div>
    </div>
  );
};

export default PlaceholderModal;
