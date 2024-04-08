import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import CypressHomeIcon from "../icons/cypressHomeIcon";
import CypressSettingsIcon from "../icons/cypressSettingsIcon";
import CypressTrashIcon from "../icons/cypressTrashIcon";
import Settings from "../settings/settings";
import Trash from "../trash/trash";
import UserCard from "./user-card";
import LogoutButton from "../global/logout-button";
import { LogOutIcon, SparkleIcon, Sparkles } from "lucide-react";
import AllspaceAI from "../AI/Allspace-Ai";

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation: React.FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native
            flex
            text-Nuetrals/nuetrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}`}
          >
            <CypressHomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>
        <Settings>
          <li
            className="group/native
            flex
            text-Nuetrals/nuetrals-7
            transition-all
            gap-2
          "
          >
            <CypressSettingsIcon />
            <span>Settings</span>
          </li>
        </Settings>
        <Trash>
          <li
            className="group/native
        flex
        text-Nuetrals/nuetrals-7
        transition-all
        gap-2
        cursor-pointer"
          >
            <CypressTrashIcon />
            <span>Trash</span>
          </li>
        </Trash>
        <AllspaceAI>
          <li
            className="group/native
        flex
        text-Nuetrals/nuetrals-6
        transition-all
        gap-2
        cursor-pointer
        font-bold"
          >
            <Sparkles />
            <span>AllSpace AI</span>
          </li>
        </AllspaceAI>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
