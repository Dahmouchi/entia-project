/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { TimerStart } from "@/actions/client";
import React, { useEffect } from "react";

const Timer = ({ user }: any) => {
  let startTime: number | null = null;

  const trackTime = async (userId: string, duration: number) => {
    try {
      // Replace this with your API call to save the time
      await TimerStart(userId, duration);
    } catch (error) {
      console.error("Error tracking time:", error);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "hidden" && startTime) {
        console.log(document.visibilityState);
        console.log("Time spent:", Math.floor((Date.now() - startTime) / 1000));
        // Calculate time spent in seconds
        const sessionDuration = Math.floor((Date.now() - startTime) / 1000);
        console.log("time:", Math.floor((Date.now() - startTime) / 1000));
        await trackTime(user.id, sessionDuration);

        startTime = null; // Reset start time
      } else if (document.visibilityState === "visible") {
        startTime = Date.now(); // Reset the start time
      }
    };

    // Initialize start time on page load
    startTime = Date.now();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user]);
  return <div></div>;
};

export default Timer;
