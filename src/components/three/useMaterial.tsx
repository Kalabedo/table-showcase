import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { LinearSRGBColorSpace, RepeatWrapping, SRGBColorSpace, Vector2 } from "three";
import { useTableStore } from "../../store/Tablestore";

export const useMaterial = () => {
  const { gl } = useThree();
  const tableMaterial = useTableStore((state) => state.tableMaterial);
  const map = useTexture(tableMaterial);
  map.wrapS = map.wrapT = RepeatWrapping;
  map.anisotropy = gl.capabilities.getMaxAnisotropy();
  map.colorSpace = SRGBColorSpace;
  map.flipY = false;

  const normalMap = useTexture("/normal.webp");
  normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
  normalMap.anisotropy = gl.capabilities.getMaxAnisotropy();
  normalMap.colorSpace = LinearSRGBColorSpace;
  normalMap.flipY = false;

  return {
    map,
    normalMap,
    normalScale: new Vector2(0.1, 0.1),
    roughness: 0.3,
  };
};
