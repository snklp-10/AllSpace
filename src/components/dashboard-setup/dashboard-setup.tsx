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
import { FieldValues, useForm } from "react-hook-form";
import { Subscription } from "@/lib/supabase/supabase.types";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
  user,
  subscription,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState("👺");
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      workspaceName: "",
    },
  });
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
        <form onSubmit={() => {}}>
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
                disabled={isLoading || subscription?.status !== "active"}
                {...register("logo", {
                  required: "Workspace name is required",
                })}
              />
              <small className="text-red-600">
                {errors?.workspaceName?.message?.toString()}
              </small>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
