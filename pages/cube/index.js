import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";

const Box = () => {
  const [ref, api] = useBox(() => ({
    mass: 0.2,
    position: [0, 4, 0],
    rotation: [0.4, 0.2, 0.5],
  }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <boxBufferGeometry attach="geometry" receiveShadow castShadow />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

const Plane = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="rgba(190,247,249,0.4)" />
    </mesh>
  );
};

export default function Cube() {
  return (
    <Canvas style={{ height: "100vh" }} camera={{ position: [-1, 2, 5] }}>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.35} />
      <spotLight position={[10, 15, 10]} angle={0.3} castShadow />
      <Physics>
        <Box />
        <Plane />
      </Physics>
    </Canvas>
  );
}
