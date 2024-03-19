"use client";
import { useAppState } from "@/lib/providers/state-providers";
import { workspace } from "@/lib/supabase/supabase.types";
import { is } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import WorkspaceCreator from "../global/workspace-creator";

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
  return (
    <div
      className="relative inline-block
  text-left"
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
      bg-black/10
      backdrop-blur-lg
      group
      overflow-scroll
      border-[1px]
      border-muted"
        >
          <div
            className="rounded-md
          flex
          flex-col"
          >
            <div className="!p-2">
              {!!privateWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Private</p>
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
                  <p className="text-muted-foreground">Shared</p>
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
                  <p className="text-muted-foreground">Shared</p>
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
            <CustomDialogTrigger
              header="Create A Workspace"
              content={<WorkspaceCreator />}
              description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
            >
              <div
                className="flex 
              transition-all 
              hover:bg-muted 
              justify-center 
              items-center 
              gap-2 
              p-2 
              w-full"
              >
                <article
                  className="text-slate-500 
                rounded-full
                 bg-slate-800 
                 w-4 
                 h-4 
                 flex 
                 items-center 
                 justify-center"
                >
                  +
                </article>
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