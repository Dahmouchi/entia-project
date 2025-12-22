import React from "react";
import styled from "styled-components";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { THEME_STYLES, ThemeStyle } from "@/lib/secion";

interface CardProps {
  feature: {
    iconName: string;
    title: string;
    description: string;
  };
  index?: number;
  theme: ThemeStyle;
}

const Card = ({ feature, index, theme }: CardProps) => {
  const IconComponent = Icons[
    feature.iconName as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  const themeConfig = THEME_STYLES[theme];

  // Define gradient colors for each theme
  const getGradientColors = (theme: ThemeStyle) => {
    switch (theme) {
      case "modern-dark":
        return {
          primary: "#6366f1", // indigo-500
          secondary: "#4f46e5", // indigo-600
          tertiary: "#4338ca", // indigo-700
        };
      case "light-minimal":
        return {
          primary: "#e5e7eb", // gray-200
          secondary: "#d1d5db", // gray-300
          tertiary: "#9ca3af", // gray-400
        };
      case "gradient-bold":
        return {
          primary: "#ffe600", // yellow
          secondary: "#f9c802", // yellow-orange
          tertiary: "#ffad00", // orange
        };
      case "corporate":
        return {
          primary: "#0ea5e9", // sky-500
          secondary: "#0284c7", // sky-600
          tertiary: "#0369a1", // sky-700
        };
      default:
        return {
          primary: "#6366f1",
          secondary: "#4f46e5",
          tertiary: "#4338ca",
        };
    }
  };

  const gradientColors = getGradientColors(theme);

  return (
    <StyledWrapper colors={gradientColors}>
      <div className="e-card playing">
        <div className="image" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="infotop mt-0">
          <div className="w-full items-center justify-center flex">
            {IconComponent && (
              <IconComponent
                className={cn(
                  "w-10 h-10 mb-4",
                  theme === "modern-dark" && "text-indigo-200",
                  theme === "light-minimal" && "text-gray-700",
                  theme === "gradient-bold" && "text-white",
                  theme === "corporate" && "text-sky-100"
                )}
              />
            )}
          </div>
          <div className="title">{feature.title}</div>
          <div className="name px-3">{feature.description}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{
  colors: { primary: string; secondary: string; tertiary: string };
}>`
  .e-card {
    margin: 0px auto;
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
    position: relative;
    width: 240px;
    height: 300px;
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .e-card:hover {
    transform: translateY(-8px);
    box-shadow: 0px 16px 40px -9px rgba(0, 0, 0, 0.6);
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
      ${(props) => props.colors.primary},
      ${(props) => props.colors.secondary} 60%,
      ${(props) => props.colors.tertiary}
    );
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

  .title {
    margin-bottom: 0.5em;
  }

  .name {
    font-size: 14px;
    font-weight: 300;
    position: relative;
    top: 1em;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
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
