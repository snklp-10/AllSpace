import React from "react";

interface TitleSectionProps {
  title: string;
  subheading?: string;
  pill: string;
}
const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subheading,
  pill,
}) => {
  return (
    <React.Fragment>
      <section
        className="flex
        flex-col
        gap-4
        justify-center
        items-center
        md:items-center
        "
      >
        <article
          className="rounded-full
            p-[1px]
            text-lg
            bg-gradient-to-r
            from-LogoGradient1
            via-LogoGradient2         
            to-LogoGradient3
            text-center
            "
        >
          <div
            className="rounded-full
                px-3
                py-1
                bg-background
                "
          >
            {pill}
          </div>
        </article>
        {subheading ? (
          <>
            <h2
              className="text-center
                text-3xl
                sm:text-5xl
                sm:max-w-[750px]
                md:text-center
                font-semibold"
            >
              {title}
            </h2>
            <p
              className="dark:text-washed-Purple/washed-purple-700 sm:max-w-[450px]
                md:text-center
                text-center"
            >
              {subheading}
            </p>
          </>
        ) : (
          <h1
            className="text-center 
            text-5xl
            sm:text-7xl
            sm:max-w-[850px]
            md:text-center
            font-semibold
            sm:font-bold"
          >
            {title}
          </h1>
        )}
      </section>
    </React.Fragment>
  );
};

export default TitleSection;
