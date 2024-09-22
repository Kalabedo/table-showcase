/* eslint-disable react-hooks/exhaustive-deps */
import { useTexture } from "@react-three/drei";
import { Mesh, MeshStandardMaterial, RepeatWrapping, Shape, Uniform } from "three";
import { useLevaDebug } from "@/hooks/useLevaDebug";
import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useShape } from "@/hooks/useShape";
import { Shapes } from "@/types/types";
import { seamlessUVs } from "@/lib/functions";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import fragment from "@/shaders/fragment.glsl";
import vertex from "@/shaders/vertex.glsl";

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

  const uniforms = useMemo(
    () => ({
      uLength: new Uniform(debug.length),
      uWidth: new Uniform(debug.width),
    }),
    [debug.length, debug.width]
  );

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} ref={tableRef}>
      <extrudeGeometry
        args={[geometry, { bevelEnabled: false, depth: 0.5, steps: 10 }]}
        onUpdate={(geometry) => {
          seamlessUVs(geometry, debug.length * 0.5, debug.width * 0.5);
        }}
      />
      <ThreeCustomShaderMaterial
        baseMaterial={MeshStandardMaterial}
        silent
        map={map}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        wireframe={debug.wireframe}
      />
      {/* <meshStandardMaterial wireframe={debug.wireframe} map={map} /> */}
    </mesh>
  );
};
