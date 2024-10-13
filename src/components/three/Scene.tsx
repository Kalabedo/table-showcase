import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Tabletop } from "./Tabletop";
import { Perf } from "r3f-perf";
import { Lights } from "./Lights";
import { ACESFilmicToneMapping } from "three";
import { Tableleg } from "./Tableleg";

export const Scene = () => {
  return (
    <Canvas gl={{ toneMappingExposure: 1.5, toneMapping: ACESFilmicToneMapping }}>
      <Perf position="top-left" />
      <Tabletop />
      <Tableleg />
      <Lights />
      {/* <Cubes /> */}
      <CameraControls camera-position={[0, 1, 0]} />
    </Canvas>
  );
};
