import { CameraControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Tabletop } from "./Tabletop";

export const Scene = () => {
  return (
    <Canvas>
      <Tabletop />
      <Environment preset="warehouse" />
      <CameraControls camera-position={[0, 1, 0]} />
    </Canvas>
  );
};
