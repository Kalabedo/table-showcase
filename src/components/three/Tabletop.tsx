/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping, Shape } from "three";
import { useLevaDebug } from "@/hooks/useLevaDebug";
import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useShape } from "@/hooks/useShape";
import { Shapes } from "@/types/types";

export const Tabletop = () => {
  const { gl } = useThree();
  const map = useTexture("/debug.jpg");
  map.wrapS = map.wrapT = RepeatWrapping;
  map.anisotropy = gl.capabilities.getMaxAnisotropy();
  map.flipY = false;

  const { debug } = useLevaDebug();
  const shapingFunction = useShape(debug.shapes as Shapes);

  const geometry = useMemo(() => {
    const shape = new Shape(shapingFunction());

    return shape;
  }, [debug.shapes]);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <extrudeGeometry args={[geometry, { bevelEnabled: false, depth: 0.2 }]} />
      <meshStandardMaterial wireframe={debug.wireframe} map={map} />
    </mesh>
  );
};

useGLTF.preload("/table-showcase.glb");
