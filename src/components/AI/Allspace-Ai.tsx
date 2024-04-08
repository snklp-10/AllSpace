import React from "react";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import SettingsForm from "../settings/settings-form";
import AllspaceAI from "./ai-component";

interface SettingsProps {
  children: React.ReactNode;
}

const Settings: React.FC<SettingsProps> = ({ children }) => {
  return (
    <CustomDialogTrigger header="Write with AI" content={<AllspaceAI />}>
      {children}
    </CustomDialogTrigger>
  );
};

export default Settings;
