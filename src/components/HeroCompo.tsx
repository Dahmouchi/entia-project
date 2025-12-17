import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const HeroCompo = ({ data, theme }: { data: any; theme: string }) => {
  const checklistArray = data.checklistItems
    .split(",")
    .filter((item: any) => item.trim() !== "");

  console.log("data", data);
  return (
    <div className="max-h-screen  w-full">
      <div className="  lg:px-14 px-4 ">
        <div
          className="rounded-2xl relative flex flex-col lg:flex-row lg:items-center lg:justify-center  lg:h-[90vh] h-[86.5vh] w-full" // 112px = py-14 (3.5rem) * 2
          style={{
            backgroundImage: `url("/Board.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:gap-4 lg:w-1/2 lg:justify-center justify-end  lg:p-14 p-4"
          >
            <h1
              className={cn(
                "text-2xl md:text-5xl font-bold mt-32",
                theme === "modern-dark" && "text-white",
                theme === "light-minimal" && "text-black",
                theme === "gradient-bold" && "text-white",
                theme === "corporate" && "text-white"
              )}
            >
              {data.title},{" "}
              <span
                className={cn(
                  "",
                  theme === "modern-dark" && "text-indigo-400",
                  theme === "light-minimal" && "text-indigo-400",
                  theme === "gradient-bold" && "text-yellow-400",
                  theme === "corporate" && "text-indigo-400"
                )}
              >
                {data.subtitle}
              </span>
            </h1>
            <h3
              className={cn(
                "lg:text-lg text-sm pt-2 lg:pt-0",
                theme === "modern-dark" && "text-gray-300",
                theme === "light-minimal" && "text-gray-700",
                theme === "gradient-bold" && "text-gray-300",
                theme === "corporate" && "text-gray-300"
              )}
            >
              {data.description}
            </h3>
            {/*<div className="relative rounded-full pt-5 lg:pt-0">
                                    <input type="Email address" name="q" className="py-6 lg:py-8 pl-8 pr-20 text-lg w-full text-white rounded-full focus:outline-none shadow-input-shadow" placeholder="search courses..." autoComplete="off" />
                                    <button className="bg-secondary p-5 rounded-full absolute right-2 top-2 ">
                                        <Icon
                                            icon="solar:magnifer-linear"
                                            className="text-white text-4xl inline-block"
                                        />
                                    </button>
                                </div>*/}
            <div className="flex flex-col gap-3 pt-6 lg:pt-4">
              {checklistArray.map((item: string) => (
                <div className="flex gap-2" key={item}>
                  <Image
                    src="/images/banner/check-circle.svg"
                    alt="check-image"
                    width={30}
                    height={30}
                    className="smallImage"
                  />
                  <p className="text-sm sm:text-lg font-normal text-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className=" justify-center place-items-end h-full  items-end hidden lg:flex">
            <Image
              src={`${data.heroImageUrl}`}
              alt="nothing"
              className="lg:w-4/5 w-2/3 h-auto"
              width={800}
              height={805}
            />
          </motion.div>
          <motion.div className=" absolute bottom-0 lg:hidden w-full flex items-center justify-center">
            <Image
              src={`${data.heroImageUrl}`}
              alt="nothing"
              className="lg:w-4/5 w-2/3 h-auto"
              width={800}
              height={805}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default HeroCompo;
