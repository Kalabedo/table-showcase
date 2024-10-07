import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Tabletop } from "./Tabletop";
import { Perf } from "r3f-perf";
import { Lights } from "./Lights";

export const Scene = () => {
  return (
    <Canvas>
      <Perf position="top-left" />
      <Tabletop />
      <Lights />
      <CameraControls camera-position={[0, 1, 0]} />
    </Canvas>
  );
};
