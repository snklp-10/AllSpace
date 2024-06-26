"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AuthUser } from "@supabase/supabase-js";
import Emojipicker from "../global/emoji-picker";
import { Label } from "../ui/label";
import { Emoji } from "emoji-picker-react";
import { Input } from "../ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { workspace } from "@/lib/supabase/supabase.types";
import { CreateWorkspaceFormSchema } from "@/lib/types";
import { z } from "zod";
import { useAppState } from "@/lib/providers/state-providers";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { createWorkspace } from "@/lib/supabase/queries";
import { v4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Loader } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardSetupProps {
  user: AuthUser;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({ user }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { dispatch } = useAppState();
  const [selectedEmoji, setSelectedEmoji] = useState("👺");
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      workspaceName: "",
    },
  });

  const supabase = createClientComponentClient();

  const onSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspaceFormSchema>
  > = async (value) => {
    const file = value.logo?.[0];
    let filePath = null;
    const workspaceUUID = v4();

    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("workspace-logos")
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error();
        filePath = data.path;
      } catch (error) {
        console.log("Error", error);
        toast({
          variant: "destructive",
          title: "Error! Could not upload workspace logo",
        });
      }
      try {
        const newWorkspace: workspace = {
          data: null,
          createdAt: new Date().toISOString(),
          iconId: selectedEmoji,
          id: workspaceUUID,
          inTrash: "",
          title: value.workspaceName,
          workspaceOwner: user.id,
          logo: filePath || null,
          bannerURL: "",
        };

        const { data, error: createError } = await createWorkspace(
          newWorkspace
        );

        if (createError) {
          throw new Error();
        }

        dispatch({
          type: "ADD_WORKSPACE",
          payload: { ...newWorkspace, folders: [] },
        });

        toast({
          title: "Workspace Created",
          description: `${newWorkspace.title} has been created successfully.`,
        });
        router.replace(`/dashboard/${newWorkspace.id}`);
      } catch (error) {
        console.log(error, "Error");
        toast({
          variant: "destructive",
          title: "Could not create your workspace",
          description:
            "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
        });
      } finally {
        reset();
      }
    }
  };

  return (
    <Card className="w-[800px] h-screen sm:h-auto">
      <CardHeader>
        <CardTitle> Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started. You can add
          collabarators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div
              className="flex 
            items-center 
            gap-4"
            >
              <div className="text-5xl">
                <Emojipicker getvalue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </Emojipicker>
              </div>
              <div className="w-full">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm
                text-muted-foreground"
                >
                  Name
                </Label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="workspace Name"
                  disabled={isLoading}
                  {...register("workspaceName", {
                    required: "Workspace name is required",
                  })}
                />
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label
                htmlFor="logo"
                className="text-sm
                text-muted-foreground"
              >
                Workspace Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                placeholder="workspace Name"
                disabled={isLoading}
                {...register("logo", {
                  required: "Workspace name is required",
                })}
              />
              <small className="text-red-600">
                {errors?.workspaceName?.message?.toString()}
              </small>
              <small
                className="
                  text-muted-foreground
                  block
              "
              >
                Upload a logo to the workspace
              </small>
            </div>
            <div className="self-end">
              <Button disabled={isLoading} type="submit">
                {!isLoading ? "Create Workspace" : <Loader />}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
