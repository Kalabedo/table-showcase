/* eslint-disable react-hooks/exhaustive-deps */
import { useTexture } from "@react-three/drei";
import { Mesh, RepeatWrapping, Shape } from "three";
import { useLevaDebug } from "@/hooks/useLevaDebug";
import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useShape } from "@/hooks/useShape";
import { Shapes } from "@/types/types";
import { seamlessUVs } from "@/lib/functions";

export const Tabletop = () => {
  const { gl } = useThree();
  const tableRef = useRef<Mesh>(null);
  const { debug } = useLevaDebug();
  const map = useTexture(debug.material);
  map.wrapS = map.wrapT = RepeatWrapping;
  map.anisotropy = gl.capabilities.getMaxAnisotropy();
  map.flipY = false;

  const shapingFunction = useShape(debug.shapes as Shapes);

  const geometry = useMemo(() => {
    return new Shape(shapingFunction());
  }, [debug]);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} ref={tableRef}>
      <extrudeGeometry
        args={[geometry, { bevelEnabled: false, depth: 0.5 }]}
        onUpdate={(geometry) => {
          seamlessUVs(geometry, debug.length * 0.5, debug.width * 0.5);
        }}
      />
      <meshStandardMaterial wireframe={debug.wireframe} map={map} />
    </mesh>
  );
};
