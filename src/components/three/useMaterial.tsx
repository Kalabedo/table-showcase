import { useLevaDebug } from "@/hooks/useLevaDebug";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RepeatWrapping } from "three";

export const useMaterial = () => {
  const { gl } = useThree();
  const { debug } = useLevaDebug();
  const map = useTexture(debug.material);
  map.wrapS = map.wrapT = RepeatWrapping;
  map.anisotropy = gl.capabilities.getMaxAnisotropy();
  map.flipY = false;

  return {
    map,
  };
};
