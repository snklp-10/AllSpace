"use client";
import { useAppState } from "@/lib/providers/state-providers";
import { workspace } from "@/lib/supabase/supabase.types";
import { is } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import WorkspaceCreator from "../global/workspace-creator";
import {
  ArrowDown,
  ArrowDownNarrowWideIcon,
  ChevronDown,
  Plus,
} from "lucide-react";
import { PiUserCirclePlus, PiUserCirclePlusBold } from "react-icons/pi";
import { Separator } from "../ui/separator";

interface workspaceDropdownProps {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratedWorkspaces: workspace[] | [];
  defaultvalue: workspace | undefined;
}
const WorkspaceDropdown: React.FC<workspaceDropdownProps> = ({
  privateWorkspaces,
  sharedWorkspaces,
  collaboratedWorkspaces,
  defaultvalue,
}) => {
  const { dispatch, state } = useAppState();
  const [seletedOption, setSelecetdOption] = useState(defaultvalue);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratedWorkspaces,
          ].map((workspace) => ({ ...workspace, folders: [] })),
        },
      });
    }
  }, [privateWorkspaces, sharedWorkspaces, collaboratedWorkspaces]);

  const handleSelect = (option: workspace) => {
    setSelecetdOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const findSelectedWorkspace = state.workspaces.find(
      (workspace) => workspace.id === defaultvalue?.id
    );
    if (findSelectedWorkspace) setSelecetdOption(findSelectedWorkspace);
  }, [state, defaultvalue]);

  return (
    <div
      className="relative block
    text-left
    bg-Nuetrals/nuetrals-9/10
    rounded-md
    mb-[30px]
    "
    >
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>
          {seletedOption ? (
            <SelectedWorkspace workspace={seletedOption} />
          ) : (
            "Select a workspace"
          )}
        </span>
      </div>
      {isOpen && (
        <div
          className="origin-top-right
      absolute
      w-full
      rounded-md
      shadow-md
      z-50
      h-[190px]
      bg-gray-50/10
      backdrop-blur-lg
      group
      overflow-scroll
      border-[1px]
      border-muted"
        >
          <div
            className="rounded-md
          flex
          flex-col
          w-full"
          >
            <div className="!p-2">
              {!!privateWorkspaces.length && (
                <>
                  <p className="text-foreground font-semibold">Private</p>
                  <hr />
                  {privateWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              )}
              {!!sharedWorkspaces.length && (
                <>
                  <p className="text-foreground font-semibold">Shared</p>
                  <hr />
                  {sharedWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              )}
              {!!collaboratedWorkspaces.length && (
                <>
                  <p className="text-foreground font-semibold">Shared</p>
                  <hr />
                  {collaboratedWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              )}
            </div>
            <Separator className="bg-black/10" />
            <CustomDialogTrigger
              header="Create A Workspace"
              content={<WorkspaceCreator />}
              description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
            >
              <div
                className="flex 
              transition-all 
              hover:bg-muted 
              bg-gradient-to-r
              from-LogoGradient2
              via-LogoGradient3
              to-LogoGradient1
              justify-center 
              items-center 
              gap-2 
              p-2 
              w-full
              font-bold
              "
              >
                Create workspace
              </div>
            </CustomDialogTrigger>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;
