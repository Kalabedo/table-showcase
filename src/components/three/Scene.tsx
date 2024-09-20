import { Box, CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const Scene = () => {
  return (
    <Canvas>
      <Box />
      <CameraControls />
    </Canvas>
  );
};
