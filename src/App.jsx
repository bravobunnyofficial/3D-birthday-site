import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import CakeScene from "./components/CakeScene";
import { useFrame, useThree } from "@react-three/fiber";
import CurtainOverlay from "./components/CurtainOverlay";
import ConfettiExplosion from "react-confetti-explosion";

function CameraAnimation() {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (0 - camera.position.x) * 0.01;
    camera.position.y += (4 - camera.position.y) * 0.01;
    camera.position.z += (5.3 - camera.position.z) * 0.01;

    camera.lookAt(0, 2, 0);
  });

  return null;
}

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [startShow, setStartShow] = useState(false);

  const bgMusic = useRef(new Audio("/sounds/bg-music.mp3"));

  const startExperience = () => {
    setStartShow(true);

    bgMusic.current.loop = true;

    bgMusic.current.volume = 0.35;

    bgMusic.current.play().catch(() => {});

    const boom = new Audio("/sounds/confetti.mp3");

    boom.play();

    setTimeout(() => {
      setShowConfetti(true);
    }, 1000);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      
      <style>
        {`
@keyframes pulse{

0%{
transform:
translate(-50%,-50%) scale(1)
}

50%{
transform:
translate(-50%,-50%) scale(1.08)
}

100%{
transform:
translate(-50%,-50%) scale(1)
}

}
`}
      </style>
      ;

      <CurtainOverlay startShow={startShow} />
      {!startShow && (
        <div
          onClick={startExperience}
          style={{
            position: "absolute",

            top: "50%",

            left: "50%",

            transform: "translate(-50%,-50%)",

            padding: "18px 40px",

            background: "linear-gradient(45deg,#ff7b7b,#ffb347)",

            color: "white",

            fontSize: "22px",

            fontWeight: "bold",

            borderRadius: "50px",

            cursor: "pointer",

            zIndex: 9999,

            boxShadow: "0 0 30px rgba(255,180,71,.8)",

            animation: "pulse 1.5s infinite",
          }}
        >
          🎉 Tap To Begin 🎉
        </div>
      )}
      {showConfetti && (
        <>
          {/* LEFT SIDE */}

          <div
            style={{
              position: "absolute",
              left: "80px",
              top: "120px",
              zIndex: 20,
            }}
          >
            <ConfettiExplosion
              force={0.8}
              duration={4000}
              particleCount={120}
              width={1600}
            />
          </div>

          {/* RIGHT SIDE */}

          <div
            style={{
              position: "absolute",
              right: "80px",
              top: "120px",
              zIndex: 20,
            }}
          >
            <ConfettiExplosion
              force={0.8}
              duration={4000}
              particleCount={120}
              width={1600}
            />
          </div>
        </>
      )}
      <Canvas shadows camera={{ position: [0, 8, 8], fov: 80 }}>
        {/* LIGHTS */}
        <fog attach="fog" args={["#1a0f0a", 10, 30]} />
        {/* DECORATIVE LIGHTS */}

        <pointLight position={[-5, 6, 2]} intensity={20} color="#ffae7a" />

        <pointLight position={[5, 6, 2]} intensity={20} color="#ffd38a" />

        <pointLight position={[0, 6, -5]} intensity={15} color="#ff8fb1" />

        <Sparkles count={150} scale={[20, 10, 20]} size={3} speed={0.4} />

        <ambientLight intensity={0.35} color="#ffe8c3" />

        {/* <spotLight
          position={[0, 7, 0]}
          intensity={80}
          angle={0.45}
          penumbra={1}
          distance={20}
          color="#ffd38a"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        /> */}

        {/* FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>

        {/* BACK WALL */}
        <mesh position={[0, 5, -10]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#f5d6c6" />
        </mesh>

        {/* LEFT WALL */}
        <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#f0cfc0" />
        </mesh>

        {/* RIGHT WALL */}
        <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#f0cfc0" />
        </mesh>

        {/* CEILING */}
        <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#fff2e2" />
        </mesh>

        <CameraAnimation />

        <CakeScene />

        {/* CONTROLS */}
        <OrbitControls
          enablePan={false}
          maxPolarAngle={1.8}
          minPolarAngle={1.1}
          minDistance={4}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}
