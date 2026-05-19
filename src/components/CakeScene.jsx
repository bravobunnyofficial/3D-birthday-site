import { useGLTF, Text, Float, Image } from "@react-three/drei";
import { useRef, useState } from "react";
import gsap from "gsap";

export default function CakeScene() {
  const cake = useGLTF("/models/cake.glb");
  const knife = useGLTF("/models/knife.glb");
  const table = useGLTF("/models/table.glb");
  const slice = useGLTF("/models/slice.glb");

  const knifeRef = useRef();
  const sliceRef = useRef();

  const cutSound = useRef(new Audio("/sounds/cut.mp3"));
  const clapSound = useRef(new Audio("/sounds/clap.mp3"));
  const wishingSound = useRef(new Audio("/sounds/wishing.mp3"));

  const [flameOn, setFlameOn] = useState(true);
  const [showHint, setShowHint] = useState(true);

  const handleCut = () => {
    cutSound.current.currentTime = 0;
    clapSound.current.currentTime = 0;
    wishingSound.current.currentTime = 0;

    cutSound.current.play();
    clapSound.current.play();
    wishingSound.current.play();

    setShowHint(false);
    setFlameOn(false);
    const tl = gsap.timeline();

    // FIRST CUT

    tl.to(knifeRef.current.position, {
      x: -0.2,
      y: 3.4,
      duration: 0.7,
    })

      .to(knifeRef.current.rotation, {
        x: 0.9,
        y: 3,
        z: 1.3,
        duration: 0.5,
      })

      .to(knifeRef.current.position, {
        x: -0.1,
        y: 2.9,
        duration: 0.6,
      })

      // RETURN SLIGHTLY

      .to(knifeRef.current.position, {
        x: 0.2,
        y: 3.3,
        duration: 0.5,
      })

      // SECOND CUT

      .to(knifeRef.current.rotation, {
        x: 0.9,
        y: 3,
        z: 1.9,
        duration: 0.6,
      })

      .to(knifeRef.current.position, {
        x: 0.2,
        y: 2.9,
        duration: 0.5,
      })

      // SHOW SLICE

      .to(sliceRef.current.scale, {
        x: 0.04,
        y: 0.04,
        z: 0.04,
        duration: 0.6,
      })

      // SLICE COMES OUT

      .to(
        sliceRef.current.position,
        {
          z: 4.7,
          y: 2.35,
          duration: 2.7,
          ease: "power3.out",
        },
        "-=0.2",
      )

      .to(
        sliceRef.current.rotation,
        {
          y: Math.PI * 1,
          duration: 2.5,
        },
        "<",
      )

      // SLICE DISAPPEARS

      .to(sliceRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
      })

      // KNIFE RETURNS

      .to(knifeRef.current.position, {
        x: 1,
        y: 2.33,
        z: 4.3,
        duration: 0.5,
      })

      .to(knifeRef.current.rotation, {
        x: 3.1,
        y: 0.95,
        z: 0,
        duration: 0.5,
      });
  };

  return (
    <>
      {/* HAPPY BIRTHDAY BANNER */}

      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        position={[-1.5, 0, 0]}
      >
        {/* HAPPY */}

        <Text position={[-5, 7, -4]} fontSize={0.9} color="#ff8fab">
          H
        </Text>
        <Text position={[-4, 6.8, -4]} fontSize={0.9} color="#ffd166">
          A
        </Text>
        <Text position={[-3, 7, -4]} fontSize={0.9} color="#90e0ef">
          P
        </Text>
        <Text position={[-2, 6.8, -4]} fontSize={0.9} color="#caffbf">
          P
        </Text>
        <Text position={[-1, 7, -4]} fontSize={0.9} color="#ffb3c6">
          Y
        </Text>

        {/* BIRTHDAY */}

        <Text position={[1, 7, -4]} fontSize={0.9} color="#f4a261">
          B
        </Text>
        <Text position={[2, 6.8, -4]} fontSize={0.9} color="#e76f51">
          I
        </Text>
        <Text position={[3, 7, -4]} fontSize={0.9} color="#2a9d8f">
          R
        </Text>
        <Text position={[4, 6.8, -4]} fontSize={0.9} color="#e9c46a">
          T
        </Text>
        <Text position={[5, 7, -4]} fontSize={0.9} color="#f28482">
          H
        </Text>
        <Text position={[6, 6.8, -4]} fontSize={0.9} color="#84a59d">
          D
        </Text>
        <Text position={[7, 7, -4]} fontSize={0.9} color="#f6bd60">
          A
        </Text>
        <Text position={[8, 6.8, -4]} fontSize={0.9} color="#b8c0ff">
          Y
        </Text>
      </Float>

      <Float
        speed={1}
        rotationIntensity={0.05}
        floatIntensity={0.15}
        floatingRange={[-3, 2]}
        speed={1}
        floatIntensity={0.1}
      >
        <Text
          position={[0, 5.8, -4]}
          fontSize={0.8}
          color="#ffd166"
          anchorX="center"
          outlineWidth={0.03}
          outlineColor="#ff4d6d"
        >
          Ankush ✨
        </Text>
      </Float>
      {/* FAIRY LIGHTS */}

      {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map((x, i) => (
        <mesh key={i} position={[x, 8.5, -6]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            emissive={
              i % 3 === 0 ? "#ffd166" : i % 3 === 1 ? "#ff8fab" : "#90e0ef"
            }
            emissiveIntensity={4}
            color="white"
          />
        </mesh>
      ))}

      {/* MEMORY PHOTOS */}

      <Image
        url="/images/photo1.jpg"
        position={[-9.7, 4, -4]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 7, 1]}
      />

      <Image
        url="/images/photo2.jpg"
        position={[-9.7, 4, 1.5]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 7, 1]}
      />

      <Image
        url="/images/photo3.jpg"
        position={[9.7, 4, -4]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[5, 7, 1]}
      />

      <Image
        url="/images/photo4.jpg"
        position={[9.7, 4, 1.5]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[5, 7, 1]}
      />

      {/* CHANDELIER */}

      {/* Wire */}

      <mesh position={[0, 9, 5]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Lamp Head */}

      <mesh position={[0, 7.8, 5]}>
        <coneGeometry args={[0.6, 1, 32]} />
        <meshStandardMaterial
          color="#222"
          emissive="#ffcc88"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Glowing Bulb */}

      <mesh position={[0, 7.3, 5]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          emissive="#ffd38a"
          emissiveIntensity={8}
          color="#fff5cc"
        />
      </mesh>

      {/* REAL LIGHT FROM BULB */}

      <pointLight
        position={[0, 7.3, 5]}
        intensity={120}
        distance={15}
        color="#ffd38a"
      />

      {/* TABLE */}
      <primitive object={table.scene} scale={1} position={[0, 0, 4]} />

      {/* CAKE */}
      <primitive
        object={cake.scene}
        scale={0.2}
        position={[0, 2.6, 4]}
        castShadow
      />

      {/* CANDLE FLAME */}

      {flameOn && (
        <>
          {/* FLAME */}

          <mesh position={[0.16, 3.5, 3.75]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              emissive="#ff6b00"
              emissiveIntensity={10}
              color="#fff1a8"
              transparent
              opacity={flameOn ? 1 : 0}
            />
          </mesh>

          {/* FLAME LIGHT */}

          <pointLight
            position={[0, 3.6, 4]}
            intensity={15}
            distance={4}
            color="#ffb703"
          />
        </>
      )}

      {/* SLICE */}

      <primitive
        ref={sliceRef}
        object={slice.scene}
        scale={0}
        position={[0, 2.6, 4]}
        rotation={[0, 0, 0]}
      />

      {/* TAP HINT */}

      {showHint && (
        <Float speed={1} floatIntensity={0.2} rotationIntensity={0.2}>
          <Text
            position={[1.2, 2.5, 4.1]}
            fontSize={0.09}
            color="#fff5cc"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#ffb703"
          >
            Tap knife to cut cake ✨
          </Text>
        </Float>
      )}

      {/* KNIFE */}
      <primitive
        ref={knifeRef}
        object={knife.scene}
        scale={0.14}
        position={[1, 2.33, 4.3]}
        rotation={[3.1, 0.95, 0]}
        castShadow
        onClick={handleCut}
      />
    </>
  );
}
