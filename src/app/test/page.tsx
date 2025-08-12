/* eslint-disable @next/next/no-img-element */
import Spline from "@splinetool/react-spline/next";

const Test = () => {
  return (
    <div className="flex items-center justify-end min-h-screen bg-black w-full relative">
     
      <div
        className="absolute top-10 right-5 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, #FFD700 0%, rgba(255,215,0,0.2) 70%, transparent 100%)",
          filter: "blur(40px)",
          opacity: 0.7,
          zIndex: -5,
        }}
      ></div>
      <div className="">
        {" "}
        <Spline scene="https://prod.spline.design/MIXTiMCK5HGuPsZC/scene.splinecode" />
      </div>
    </div>
  );
};

export default Test;
