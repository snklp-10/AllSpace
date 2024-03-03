"use client";

import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";

interface EmojiPickerProps {
  children: React.ReactNode;
  getvalue?: (emoji: string) => void;
}

const Emojipicker: React.FC<EmojiPickerProps> = ({ children, getvalue }) => {
  const route = useRouter();
  const Picker = dynamic(() => import("emoji-picker-react"));
  const onClick = (selectedEmoji: any) => {
    if (getvalue) getvalue(selectedEmoji.emoji);
  };
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
        <PopoverContent
          className="p-0
        border-none
        "
        >
          <Picker onEmojiClick={onClick} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default Emojipicker;
