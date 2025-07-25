/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"; // Optional: if you want autoplay

import {
  BookOpenText,
  FileText,
  HelpCircle,
} from "lucide-react"; // import the necessary icons



import { motion, scale, useMotionValue, useTransform } from 'framer-motion';

const CardAnimation = ({ feature, index }:any) => {
  return (
    <StyledWrapper>
      <div className="e-card playing ">
        <div className="image" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="infotop mt-0">  
        <div className='text-white w-full items-center justify-center flex'>{feature?.icon}</div>
          {feature.title}
          <br />
          <div className="name px-3">{feature.description}</div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .e-card {
    margin: 0px auto;
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
    position: relative;
    width: 240px;
    height: 300px;
    border-radius: 16px;
    overflow: hidden;
  }

  .wave {
    position: absolute;
    width: 540px;
    height: 700px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -80%;
    background: linear-gradient(
      744deg,
      #ffe600,
      #f9c802 60%,
      #ffad00
    ); /* Yellow Gradient */
  }

  .icon {
    width: 3em;
    margin-top: -1em;
    padding-bottom: 1em;
  }

  .infotop {
    text-align: center;
    font-size: 20px;
    position: absolute;
    top: 4em;
    left: 0;
    right: 0;
    color: #fffde7; /* Light yellowish-white for contrast */
    font-weight: 600;
  }

  .name {
    font-size: 14px;
    font-weight: 200;
    position: relative;
    top: 1em;
    text-transform: lowercase;
    color: #fffde7;
  }

  .wave:nth-child(2),
  .wave:nth-child(3) {
    top: 210px;
  }

  .playing .wave {
    border-radius: 40%;
    animation: wave 3000ms infinite linear;
  }

  .wave {
    border-radius: 40%;
    animation: wave 55s infinite linear;
  }

  .playing .wave:nth-child(2) {
    animation-duration: 4000ms;
  }

  .wave:nth-child(2) {
    animation-duration: 50s;
  }

  .playing .wave:nth-child(3) {
    animation-duration: 5000ms;
  }

  .wave:nth-child(3) {
    animation-duration: 45s;
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;






const CardSection = () => {

const cards = [
  {
    id: 1,
    icon: <BookOpenText className="text-4xl mb-4 w-12 h-10" />,
    title: "Cours détaillé",
    description: "Accédez à des cours riches, bien structurés, et faciles à comprendre.",
  },
  {
    id: 2,
    icon: <FileText className="text-4xl mb-4 w-12 h-10" />,
    title: "Exercice avec corrigé",
    description: "Pratiquez avec des exercices variés accompagnés de leurs corrigés détaillés.",
  },
  {
    id: 3,
    icon: <HelpCircle className="text-4xl mb-4 w-12 h-10" />,
    title: "QCM interactif",
    description: "Testez vos connaissances avec des QCM interactifs pour progresser efficacement.",
  },
];

  return (
    <div
      className="relative w-full h-[100dvh]  pt-36"
    
      style={{
        backgroundImage: "url('/Board.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "100px" }}
                    className="text-center"
                  >
                    <h2 className="text-2xl md:text-5xl font-bold text-white px-2">
                      Des <span className="text-indigo-400">programmes riches</span>
                    </h2>
                    <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto px-2 mt-3 md:mt-4">
                      Scoolia.ma vous propose un contenu pédagogique complet et conforme
                      aux normes marocaines
                    </p>
                  </motion.div>
          <div className=" lg:flex justify-center gap-8 mt-6 flex-wrap hidden ">
            {cards.map((card) => (
              <CardAnimation key={card.id} feature={card} />
            ))}
          </div>
          <div className="lg:hidden px-2 mt-6">
            {" "}
            {/* Added px-6 for side padding */}
            <Carousel
              opts={{
                align: "center", // Changed from "center" to "start"
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
              className="relative group"
            >
              <CarouselContent className="ml-6 gap-4">
                {" "}
                {/* Added ml-4 */}
                {cards.map((card, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-[85%] sm:basis-[45%]"
                  >
                    {" "}
                    <CardAnimation key={card.id} feature={card} />{" "}
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Arrows */}
              <div className="hidden sm:block z-50">
                <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-[#1a0be8] rounded-full shadow-lg hover:bg-[#8ebd21] hover:text-white transition-all border border-gray-200 opacity-0 group-hover:opacity-100 z-10" />
                <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-[#1a0be8] rounded-full shadow-lg hover:bg-[#8ebd21] hover:text-white transition-all border border-gray-200 opacity-0 group-hover:opacity-100 z-10" />
              </div>

              {/* Mobile Navigation */}
              <div className="sm:hidden flex justify-center gap-4 mt-12 z-50">
                <CarouselPrevious className="static w-10 h-10 bg-white text-[#8ebd21] rounded-full shadow hover:bg-[#1a0be8] hover:text-white transition-all border border-gray-200">
                  <ChevronLeft className="w-5 h-5" />
                </CarouselPrevious>
                <CarouselNext className="static w-10 h-10 bg-white text-[#8ebd21] rounded-full shadow hover:bg-[#1a0be8] hover:text-white transition-all border border-gray-200">
                  <ChevronRight className="w-5 h-5" />
                </CarouselNext>
              </div>
            </Carousel>
          </div>
    </div>
  );
};

export default CardSection;
