import { CameraControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Tabletop } from "./Tabletop";
import { Perf } from "r3f-perf";

export const Scene = () => {
  return (
    <Canvas>
      <Perf position="top-left" />
      <Tabletop />
      <Environment files={"/env.exr"} environmentIntensity={0.5} />
      <CameraControls camera-position={[0, 1, 0]} />
    </Canvas>
  );
};
