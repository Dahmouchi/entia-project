/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import styled from "styled-components";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

const Card = ({ feature, index, theme }: any) => {
  const IconComponent = Icons[
    feature.iconName as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  return (
    <>
      {theme !== "gradient-bold" ? (
        <StyledWrapper>
          <div className="e-card playing ">
            <div className="image" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="infotop mt-0">
              <div className="text-white w-full items-center justify-center flex">
                {IconComponent && (
                  <IconComponent
                    className={cn(
                      "w-10 h-10 mb-4",
                      theme === "modern-dark" && "text-indigo-400",
                      theme === "light-minimal" && "text-primary",
                      theme === "gradient-bold" && "text-white",
                      theme === "corporate" && "text-sky-400"
                    )}
                  />
                )}
              </div>
              {feature.title}
              <br />
              <div className="name px-3">{feature.description}</div>
            </div>
          </div>
        </StyledWrapper>
      ) : (
        <StyledWrapper1>
          <div className="e-card playing ">
            <div className="image" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="infotop mt-0">
              <div className="text-white w-full items-center justify-center flex">
                {IconComponent && (
                  <IconComponent
                    className={cn(
                      "w-10 h-10 mb-4",
                      theme === "modern-dark" && "text-indigo-400",
                      theme === "light-minimal" && "text-primary",
                      theme === "gradient-bold" && "text-white",
                      theme === "corporate" && "text-sky-400"
                    )}
                  />
                )}
              </div>
              {feature.title}
              <br />
              <div className="name px-3">{feature.description}</div>
            </div>
          </div>
        </StyledWrapper1>
      )}
    </>
  );
};
const StyledWrapper1 = styled.div`
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
    background: linear-gradient(744deg, #af40ff, #5b42f3 60%, #00ddeb);
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
    color: rgb(255, 255, 255);
    font-weight: 600;
  }

  .name {
    font-size: 14px;
    font-weight: 200;
    position: relative;
    top: 1em;
    text-transform: lowercase;
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

export default Card;
