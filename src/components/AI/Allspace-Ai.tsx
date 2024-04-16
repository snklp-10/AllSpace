import React from "react";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import AllspaceAI from "./ai-component";

interface AllSpaceProps {
  children: React.ReactNode;
}

const AllSpace: React.FC<AllSpaceProps> = ({ children }) => {
  return (
    <CustomDialogTrigger header="AllSpace AI" content={<AllspaceAI />}>
      {children}
    </CustomDialogTrigger>
  );
};

export default AllSpace;
