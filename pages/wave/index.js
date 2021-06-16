import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import circle from "./circle.png";

const Points = () => {
  const circleImage = useLoader(THREE.TextureLoader, circle);
  const count = 100;
  const sep = 3;
  let positions = useMemo(() => {
    let pos = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = 0;
        pos.push(x, y, z);
      }
    }
    return new Float32Array(pos);
  }, [count, sep]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attribute", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={"/wave/circle.png"
        color={0x00aff}
        size={0.5}
        sizeAttenuation
        //to make sure transparent portions are rendered transparent and not black
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
};

const AnimationCanvas = () => {
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{ position: [100, 10, 0], fov: 75 }}
    >
      <Points />
    </Canvas>
  );
};

export default function Wave() {
  return (
    <div className="anim">
      <AnimationCanvas />;
    </div>
  );
}
