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

import { BookOpen, FileText, CheckCircle } from 'lucide-react';

const iconMap = {
  'Cours détaillé': <BookOpen size={48} />,
  'Exercice avec corrigé': <FileText size={48} />,
  'QCM interactif': <CheckCircle size={48} />,
};

const CardAnimation = ({ title }: { title: string }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-content">
          <div className="icon-wrapper">
            {iconMap[title as keyof typeof iconMap]}
          </div>
          <h2>{title}</h2>
          <div className="shine"></div>
          <div className="background">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 280px;
    height: 320px;
    perspective: 1000px;
    margin: 0 auto;
  }

  .card-content {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    border-radius: 20px;
    border:4px;
    background: #00719e;
background: linear-gradient(90deg, rgba(0, 113, 158, 1) 0%, rgba(0, 25, 214, 1) 50%, rgba(17, 0, 115, 1) 100%);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    color: white;
  }

  .card:hover .card-content {
    transform: translateY(-5px);
  }

  .icon-wrapper {
    margin-bottom: 1.5rem;
    color: #F2E600;
    transition: all 0.3s ease;
  }

  .card:hover .icon-wrapper {
    transform: scale(1.1);
    color: #00f2fe;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
  }

  .shine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 60%
    );
    z-index: 1;
    transform: translateY(100%);
    transition: transform 0.6s;
  }

  .card:hover .shine {
    transform: translateY(0);
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }

  .background span {
    position: absolute;
    display: block;
    width: 80px;
    height: 80px;
    background: #F2E600;
    border-radius: 50%;
    animation: float 5s linear infinite;
    bottom: -150px;
  }

  .background span:nth-child(1) {
    left: 25%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 6s;
  }

  .background span:nth-child(2) {
    left: 10%;
    width: 40px;
    height: 40px;
    animation-delay: 2s;
    animation-duration: 9s;
  }

  .background span:nth-child(3) {
    left: 70%;
    width: 70px;
    height: 70px;
    animation-delay: 2s;
  }

  .background span:nth-child(4) {
    left: 50%;
    width: 50px;
    height: 50px;
    animation-delay: 0s;
    animation-duration: 7s;
  }

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-500px) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
import { motion } from "framer-motion";


const StyledWrappers = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background: #07182e;
    position: relative;
    display: flex;
    place-content: center;
    place-items: center;
    overflow: hidden;
    border-radius: 20px;
  }

  .card h2 {
    z-index: 1;
    color: white;
    font-size: 2em;
    text-align: center;
    padding: 0 1rem;
  }

  .card::before {
    content: "";
    position: absolute;
    width: 100px;
    background-image: linear-gradient(
      180deg,
      rgb(0, 183, 255),
      rgb(255, 48, 255)
    );
    height: 130%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .card::after {
    content: "";
    position: absolute;
    background: #07182e;
    inset: 5px;
    border-radius: 15px;
  }
`;

const CardSection = () => {
  const cards = [
    { id: 1, title: "Cours détaillé" },
    { id: 2, title: "Exercice avec corrigé" },
    { id: 3, title: "QCM interactif" },
  ];

  return (
    <div
      className="relative w-full h-[100dvh]  pt-36"
      id="courses"
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
              <CardAnimation key={card.id} title={card.title} />
            ))}
          </div>
          <div className="lg:hidden px-2">
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
                    <CardAnimation key={card.id} title={card.title} />{" "}
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
