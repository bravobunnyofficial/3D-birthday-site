import { useEffect } from "react";
import gsap from "gsap";

export default function CurtainOverlay({ startShow }) {
  useEffect(() => {
    if (!startShow) return;

    gsap.to(".leftCurtain", {
      x: "-100%",
      duration: 2,
      ease: "power3.inOut",
    });

    gsap.to(".rightCurtain", {
      x: "100%",
      duration: 2,
      ease: "power3.inOut",
    });
  }, [startShow]);
  
  return (
    <>
      {/* LEFT CURTAIN */}
      <div
        className="leftCurtain"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "50%",
          height: "100vh",
          zIndex: 100,

          background: `
    repeating-linear-gradient(
      90deg,
      #3d0000 0px,
      #5c0000 40px,
      #7a0000 80px,
      #5c0000 120px
    )
  `,

          boxShadow: "inset -20px 0 40px rgba(0,0,0,0.5)",
        }}
      />

      {/* RIGHT CURTAIN */}
      <div
        className="rightCurtain"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "50%",
          height: "100vh",
          zIndex: 100,

          background: `
    repeating-linear-gradient(
      90deg,
      #7a0000 0px,
      #5c0000 40px,
      #3d0000 80px,
      #5c0000 120px
    )
  `,

          boxShadow: "inset 20px 0 40px rgba(0,0,0,0.5)",
        }}
      />
    </>
  );
}
