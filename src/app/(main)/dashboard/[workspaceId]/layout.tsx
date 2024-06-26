import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import Sidebar from "@/components/sidebar/sidebar";
import UserCard from "@/components/sidebar/user-card";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  params: any;
}
const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  return (
    <main
      className="flex
  overflow-hidden
  h-screen
  w-screen"
    >
      <Sidebar params={params} />
      <MobileSidebar>
        <Sidebar params={params} className="w-screen inline-block sm:hidden" />
      </MobileSidebar>
      <div
        className="dark:border-Nuetrals/nuetrals-12/70
        border-l-[1px]
        w-full
        relative
        overflow-scroll"
      >
        {children}
      </div>
    </main>
  );
};

export default Layout;
