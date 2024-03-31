"use client";
import TitleSection from "@/components/landing-page/title-section";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Banner from "../../../public/appBanner.png";
import { CLIENTS, USERS } from "@/lib/constants";
import Cal from "../../../public/cal.png";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import {
  PiArrowRight,
  PiBookOpenTextLight,
  PiFileThin,
  PiSparkleLight,
  PiTargetLight,
} from "react-icons/pi";
import CustomCard from "@/components/landing-page/custom-card";
import { randomUUID } from "crypto";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lora } from "next/font/google";
import ImageLogo from "../../../public/logoipsum-327.svg";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";

const font = Lora({
  subsets: ["latin"],
  weight: ["400"],
});

const tabs = [
  {
    icon: (
      <PiSparkleLight className="text-3xl mr-2 text-purple-600 bg-purple-100 p-1 rounded-md" />
    ),
    name: "AI",
    feature: "Now with Q&A",
    description: "Ask literally anything. Bird Will answer.",
    more: (
      <div className="text-purple-600 flex items-center">
        Learn more <PiArrowRight className="ml-1 text-sm" />
      </div>
    ),
    image: "/assets/GroovyDoodle.svg",
  },
  {
    icon: (
      <PiBookOpenTextLight className="text-3xl mr-2 text-red-600 bg-red-100 p-1 rounded-md" />
    ),
    name: "Wikis",
    description: "Centralize your knowledge. Make it accessible.",
    more: (
      <div className="text-red-600 flex items-center">
        Learn more <PiArrowRight className="ml-1 text-sm" />
      </div>
    ),
    image: "/assets/PlantDoodle.svg",
  },

  {
    icon: (
      <PiTargetLight className="text-3xl mr-2 text-blue-600 bg-blue-100 p-1 rounded-md" />
    ),
    name: "Projects",
    description: "Manage complex projects without the chaos",
    more: (
      <div className="text-blue-600 flex items-center">
        Learn more <PiArrowRight className="ml-1 text-sm" />
      </div>
    ),

    image: "/assets/CoffeeDoddle.svg",
  },
  {
    icon: (
      <PiFileThin className="text-3xl mr-2 text-yellow-600 bg-yellow-100 p-1 rounded-md" />
    ),
    name: "Docs",
    description: "Simple, powerfulm beautiful. Next-gen notes & docs.",
    more: (
      <div className="text-yellow-600 flex items-center">
        Learn more <PiArrowRight className="ml-1 text-sm" />
      </div>
    ),

    image: "/assets/RunningDoodle.svg",
  },
];

const HomePage = () => {
  const ref = useRef(null);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  return (
    <>
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
            title="Writing Together, in Perfect Sync!"
          />
          <div className="flex gap-4 pt-2 mt-[10px] items-center justify-center ">
            <Link href="/signup">
              <Button className="py-1">
                <div className="flex items-center justify-center">
                  <div className="text-lg">Get AllSpace free</div>
                  <div>
                    <PiArrowRight className="ml-2 " />
                  </div>
                </div>
              </Button>
            </Link>
          </div>
          <div className="pt-10 xl:pt-20 items-center justify-center">
            <Image
              src="/assets/ReadingSideDoodle.svg"
              alt="hero image"
              width={1000}
              height={1000}
              className="flex items-center justify-center mx-auto w-60 xl:w-80"
            />
          </div>
          {isSmallScreen ? (
            <div className="px-8">
              <div className="grid grid-cols-4   md:row-span-1  gap-4  xl:gap-6 mt-8   xl:px-0  ">
                {tabs.map((tab) => (
                  <motion.div
                    key={tab.name}
                    className={`
                    flex 
                    p-1
                    md:p-8
                    cursor-pointer
        
                ${
                  activeTab.name === tab.name
                    ? "rounded-md md:rounded-xl bg-background  md:bg-background border-gray-200 md:border items-center justify-center flex p-1 "
                    : "md:bg-[#f6f5f4] rounded-md xl:rounded-xl p-1 items-center justify-center hover:bg-[#eae7e7] "
                } `}
                    onClick={() => setActiveTab(tab)}
                  >
                    <div className="flex flex-col   items-center md:justify-center mx-auto">
                      <div className="hidden md:flex text-4xl">{tab.icon}</div>
                      <div className="font-medium text-sm  xl:text-lg mt-1">
                        {tab.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Display content based on the active tab */}
              <div className="pt-6 md:py-10   lg:px-16 xl:px-0 md:px-16  w-full ">
                {activeTab && (
                  <div className=" flex justify-center items-center flex-col  ">
                    <Image
                      src={activeTab.image}
                      width={1025}
                      height={500}
                      alt="logo"
                      className="
                w-full
             border
             p-20
             xl:p-40
             rounded-xl        
                "
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex  xl:space-x-4 items-center justify-between hover:cursor-pointer gap-4 w-4/5 xl:w-3/4 2xl:w-[55%]">
              {tabs.map((tab) => (
                <motion.div
                  key={tab.name}
                  className={`
                xl:flex 
                justify-center 
                space-x-4
                xl:pt-4
                sm:my-10
               
                xl:my-0
                w-60
                h-36
                ${
                  activeTab === tab
                    ? "border rounded-xl pt-2 bg-white "
                    : "rounded-xl pt-2  bg-[#f6f5f4] m"
                }
              `}
                  onMouseEnter={() => setActiveTab(tab)}
                >
                  <div className="px-4">
                    <div className="flex items-center">
                      <div>{tab.icon}</div>
                      <div className="text-2xl font-semibold text-black">
                        {tab.name}
                      </div>

                      {/* Render feature tag only for "AI" tab */}
                      {tab.name === "AI" && (
                        <div className="text-xs font-semibold text-gray-600 bg-purple-100 px-2 py-1 rounded-full ml-2 ">
                          {tab.feature}
                        </div>
                      )}
                    </div>

                    <motion.div
                      className="flex flex-col text-sm"
                      initial={{ y: 0 }}
                      animate={{ y: activeTab === tab ? 10 : 25 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        {/* Only animate the description */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {tab.description}
                        </motion.div>
                      </div>

                      {/* Conditional rendering for "Learn more" link */}
                      {activeTab === tab && (
                        <div className="text-sm mt-2">{tab.more}</div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Display content based on the active tab */}
          <div className="hidden md:flex py-10 px-8 md:px-0    lg:w-3/4 2xl:w-[55%]">
            {activeTab && (
              <div className=" md:flex  items-center justify-center space-x-6 hover:cursor-pointer w-full">
                <Image
                  src={activeTab.image}
                  width={500}
                  height={500}
                  alt="logo"
                  className="
                w-full
                p-20
                xl:p-40
                shadow-md
                rounded-xl
                bg-[#f6f5f4]
        "
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="relative">
        <div
          className="overflow-hidden
          flex
          after:content['']
          after:dark:from-brand/brand-dark
          after:to-transparent
          after:from-background
          after:bg-gradient-to-l
          after:right-0
          after:bottom-0
          after:top-0
          after:w-20
          after:z-10
          after:absolute

          before:content['']
          before:dark:from-brand/brand-dark
          before:to-transparent
          before:from-background
          before:bg-gradient-to-r
          before:left-0
          before:top-0
          before:bottom-0
          before:w-20
          before:z-10
          before:absolute
        "
        >
          {[...Array(2)].map((arr) => (
            <div
              key={arr}
              className="flex
                flex-nowrap
                animate-slide
          "
            >
              {CLIENTS.map((client) => (
                <div
                  key={client.alt}
                  className=" relative
                    w-[200px]
                    m-20
                    shrink-0
                    flex
                    items-center
                  "
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={200}
                    className="object-contain max-w-none"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section
        className="px-4
        sm:px-6
        flex
        justify-center
        items-center
        flex-col
        relative
      "
      >
        <TitleSection
          title="Keep track of your meetings all in one place"
          subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
          pill="Features"
        />
        <div
          className="mt-10
          max-w-[450px]
          flex
          justify-center
          items-center
          relative
          sm:ml-0
          rounded-3xl
          border-8
          border-washed-Purple/washed-purple-300
          border-opacity-10
        "
        >
          <Image src={Cal} alt="Banner" className="rounded-2xl" />
        </div>
        <div className="xl:pt-32 pt-24 relative flex justify-center items-center flex-col">
          <div className="xl:text-5xl text-3xl 2xl:w-3/5 w-3/5 font-medium xl:w-1/3 mx-auto text-center">
            Consolidate tools. Cut costs.
          </div>

          <Image
            src="/assets/canva-logo.png"
            alt="Canva logo"
            width={1000}
            height={1000}
            className="pt-10 xl:pt-10 
                xl:w-1/3
                w-4/5   
                "
          />

          <div
            className={cn(
              "flex items-center justify-center text-xl xl:text-2xl pt-10 pb-4  xl:py-10 px-8  text-center  w-4/5 ",
              font.className
            )}
          >
            &quot;We got rid of nearly a dozen different tools because of what
            AllSpace does for us.&quot;
          </div>

          <div className="items-center flex justify-center flex-col">
            <Image
              src={ImageLogo}
              alt="Canva logo"
              width={1000}
              height={1000}
              className="pt-2 xl:pt-0  w-10 xl:w-14 "
            />

            <div className=" text-center">
              <div className="text-sm  font-medium pt-4">Carlos Hernandez</div>
              <div className="text-sm">Marketing Director, Palium Software</div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative">
        <div
          className="mt-20
          px-4
          sm:px-6 
          flex
          flex-col
          overflow-x-hidden
          overflow-visible
        "
        >
          <TitleSection
            title="Trusted by all"
            subheading="Join thousands of satisfied users who rely on our platform for their 
          personal and professional productivity needs."
            pill="Testimonials"
          />
          {[...Array(1)].map((arr, index) => (
            <div
              key={crypto.randomUUID()}
              className={twMerge(
                clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                  "flex-row-reverse": index === 1,
                  "animate-[slide_250s_linear_infinite]": true,
                  "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                  "ml-[100vw]": index === 1,
                }),
                "hover:paused",
                "mb-[50px]"
              )}
            >
              {USERS.map((testimonial, index) => (
                <CustomCard
                  key={testimonial.name}
                  className="w-[500px]
                  shrink-0s
                  rounded-xl
                  bg-brand/brand-washedBlue/20
                  border-none

                "
                  cardHeader={
                    <div
                      className="flex
                      items-center
                      gap-4
                  "
                    >
                      <Avatar>
                        <AvatarImage src={`/avatars/${index + 1}.png`} />
                        <AvatarFallback>
                          {testimonial.name.slice(0, 1)[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-foreground">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="dark:text-washed-purple-800">
                          {testimonial.name.toLocaleLowerCase()}
                        </CardDescription>
                      </div>
                    </div>
                  }
                  cardContent={
                    <p className="dark:text-washed-purple-800">
                      {testimonial.message}
                    </p>
                  }
                ></CustomCard>
              ))}
            </div>
          ))}
        </div>
      </section>
      <Separator />
      <Footer />
    </>
  );
};

export default HomePage;
