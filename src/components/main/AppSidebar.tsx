"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, PanelLeftClose } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { sidebarData } from "@/constants";
import Icon from "../icon";

export default function AppSidebar() {
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative">
      {/* Persistent sidebar (desktop view) */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen bg-[#121212] text-gray-200 border-r border-gray-800 p-3 transition-all duration-300 overflow-hidden",
          isCollapsed ? "w-20" : "min-w-72"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white"
        >
          <PanelLeftClose className="w-5 h-5 text-white" />
        </Button>
        <div className="flex items-center justify-between mb-6 mt-2 px-2">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-white" />
            {!isCollapsed && (
              <h1 className="text-lg font-semibold text-white">RFP</h1>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {sidebarData.map((item, idx) =>
            item.children ? (
              <Accordion
                key={idx}
                type="single"
                collapsible
                value={openAccordion}
                onValueChange={setOpenAccordion}
                className="w-full"
              >
                <AccordionItem value={item.title} className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-800 transition-all"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon name={item.icon} className="w-4 h-4" />
                      {!isCollapsed && item.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 mt-1">
                      {item.children.map((sub, subIdx) => (
                        <Link
                          key={subIdx}
                          href={sub.href}
                          className="block px-8 py-1.5 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={idx}
                href={item.href ?? "#"}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-800 transition-all"
              >
                <Icon name={item.icon} className="w-4 h-4" />

                {!isCollapsed && item.title}
              </Link>
            )
          )}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="text-xs text-gray-500 text-center mt-auto pt-4 border-t border-gray-800">
            Powered By{" "}
            <span className="font-semibold text-gray-300">KEROSS</span> | 2025
          </div>
        )}
      </aside>
    </div>
  );
}