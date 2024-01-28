import TitleSection from "@/components/landing-page/title-section";
import React from "react";
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <section>
      <div
        className="overflow-hidden
            px-4
            sm:px-6
            mt-10
            sm:flex
            sm:flex-col
            gap-4
            md:justify-center
            md:items-center"
      >
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="Productivity, it's like a game"
        />
        <div
          className="bg-white
        p-[2px]
        mt-6
        rounded-xl
        bg-gradient-to-r
        from-primary
        to-brand/brand-primaryBlue
        sm:w-[300px]
        "
        >
          <Button
            variant="btn-secondary"
            className="w-full
            rounded-[10px]
            p-6
            text-2xl
            bg-background"
          >
            AllSpace
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
