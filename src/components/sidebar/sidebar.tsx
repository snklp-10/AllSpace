import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import {
  getCollaboratedWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import WorkspaceDropdown from "./Workspace-dropdown";
import PlanUsage from "./plan-usage";
import NativeNavigation from "./native-navigation";
import { ScrollArea } from "../ui/scroll-area";

interface Sidebarprops {
  params: { workspaceId: string };
  className?: string;
}
const Sidebar: React.FC<Sidebarprops> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });
  //user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  //subscription
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  //folder
  const { data: workspaceFolderData, error: folderError } = await getFolders(
    params.workspaceId
  );

  //error
  if (subscriptionError || folderError) redirect("/dashboard");

  const [privateWorkspaces, collaboratedWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratedWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <aside
      className={twMerge(
        "hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between ",
        className
      )}
    >
      <div>
        <WorkspaceDropdown
          privateWorkspaces={privateWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
          collaboratedWorkspaces={collaboratedWorkspaces}
          defaultvalue={[
            ...privateWorkspaces,
            ...collaboratedWorkspaces,
            ...sharedWorkspaces,
          ].find((workspace) => workspace.id === params.workspaceId)}
        />
        <PlanUsage
          foldersLength={workspaceFolderData?.length || 0}
          subscription={subscriptionData}
        />
        <NativeNavigation myWorkspaceId={params.workspaceId} />
        <ScrollArea
          className="overflow-scroll relative
          h-[450px]
        "
        >
          <div
            className="pointer-events-none 
          w-full 
          absolute 
          bottom-0 
          h-20 
          bg-gradient-to-t 
          from-background 
          to-transparent 
          z-40"
          />
        </ScrollArea>
      </div>
    </aside>
  );
};

export default Sidebar;
