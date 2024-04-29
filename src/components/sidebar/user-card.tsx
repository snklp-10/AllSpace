import React, { Profiler } from "react";
import { Subscription } from "@/lib/supabase/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import db from "@/lib/supabase/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CypressProfileIcon from "../icons/cypressProfileIcon";
import ModeToggle from "../global/mode-toggle";
import { LogOut, User } from "lucide-react";
import LogoutButton from "../global/logout-button";
import { PiCarProfileLight, PiUserLight } from "react-icons/pi";

interface UserCardProps {
  subscription: Subscription | null;
}

const UserCard: React.FC<UserCardProps> = async ({ subscription }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const response = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, user.id),
  });
  let avatarPath;
  if (!response) return;
  if (!response.avatarUrl) avatarPath = "";
  else {
    avatarPath = supabase.storage
      .from("avatars")
      .getPublicUrl(response.avatarUrl)?.data.publicUrl;
  }
  const profile = {
    ...response,
    avatarUrl: avatarPath,
  };

  return (
    <article
      className="hidden
      sm:flex 
      justify-between 
      items-center 
     px-2
      py-2 
     bg-Nuetrals/nuetrals-7/10
      w-full
      rounded-2xl"
    >
      <aside className="flex justify-center items-center gap-2">
        <Avatar>
          <AvatarImage src={profile.avatarUrl} />
          <AvatarFallback>
            <div className="rounded-full border p-2 ">
              <User size={29} />
            </div>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <small
            className="w-[100px] 
          overflow-hidden 
          overflow-ellipsis
          "
          >
            {profile.email?.split("@")[0]}
          </small>
        </div>
      </aside>
      <div className="flex items-center justify-center gap-1">
        <LogoutButton>
          <LogOut />
        </LogoutButton>
        <ModeToggle />
      </div>
    </article>
  );
};

export default UserCard;
