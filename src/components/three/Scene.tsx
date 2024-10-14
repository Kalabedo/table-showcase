import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Lights } from "./Lights";
import { ACESFilmicToneMapping } from "three";
import { Tableleg } from "./Tableleg";
import { TableShapeList } from "./TableShapeList";

export const Scene = () => {
  return (
    <Canvas gl={{ toneMappingExposure: 2, toneMapping: ACESFilmicToneMapping }}>
      <Perf position="top-left" />
      <TableShapeList />
      <Tableleg />
      <Lights />
      {/* <Cubes /> */}
      <CameraControls camera-position={[0, 1, 0]} />
    </Canvas>
  );
};
