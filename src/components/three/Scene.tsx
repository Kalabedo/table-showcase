import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Tabletop } from "./Tabletop";
import { Perf } from "r3f-perf";
import { Lights } from "./Lights";
import { ACESFilmicToneMapping } from "three";

export const Scene = () => {
  return (
    <Canvas gl={{ toneMappingExposure: 1, toneMapping: ACESFilmicToneMapping }}>
      <Perf position="top-left" />
      <Tabletop />
      <Lights />
      <CameraControls camera-position={[0, 1, 0]} />
    </Canvas>
  );
};
