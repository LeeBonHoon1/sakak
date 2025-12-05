"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-background border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <h1 className="font-bold text-lg">Sakak</h1>
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  );
};

