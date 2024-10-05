/* eslint-disable react-hooks/exhaustive-deps */
import { BufferAttribute, Mesh, MeshStandardMaterial, Shape, Uniform } from "three";
import { useEffect, useMemo, useRef } from "react";
import { useShape } from "@/hooks/useShape";
import { Shapes } from "@/types/types";
import { makeOffsetPoly, seamlessUVs } from "@/lib/functions";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import fragment from "@/shaders/fragment.glsl";
import vertex from "@/shaders/vertex.glsl";
import { useLevaDebug } from "@/hooks/useLevaDebug";
import { useMaterial } from "./useMaterial";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export const Tabletop = () => {
  const tableRef = useRef<Mesh>(null);
  const { debug } = useLevaDebug();
  const maps = useMaterial();

  const shapingFunction = useShape(debug.shapes as Shapes);

  const geometry = useMemo(() => {
    return new Shape(shapingFunction());
  }, [debug]);

  const uniforms = useMemo(
    () => ({
      uLength: new Uniform(debug.length),
      uWidth: new Uniform(debug.width),
      uHeight: new Uniform(0.04),
      uSteps: new Uniform(10),
    }),
    [debug.length, debug.width]
  );

  // get normal direction for inwards polygon offset
  useEffect(() => {
    if (tableRef.current) {
      //calculate tangets to calculate new normals in fragment shader
      tableRef.current.geometry = mergeVertices(tableRef.current.geometry);
      tableRef.current.geometry.computeTangents();

      const positions = tableRef.current.geometry.attributes.position.array;
      console.log(tableRef.current.geometry.attributes);

      const uniquePositions = [];
      const seen = new Set();

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];

        // Create a key combining x and y to track uniqueness
        const key = `${x},${y}`;

        // Check if the key has already been seen
        if (!seen.has(key)) {
          uniquePositions.push({ x, y }); // Push as {x, y} object
          seen.add(key);
        }
      }

      // Now `uniquePositions` contains only unique x, y pairs as {x, y}
      const offsetData = makeOffsetPoly(uniquePositions);
      const vertexNormals = new Float32Array(positions.length);
      for (let i = 0; i < vertexNormals.length; i = i + 3) {
        const posX = positions[i + 0];
        const posY = positions[i + 1];
        const nor = offsetData.find((offset) => offset.pos.x === posX && offset.pos.y === posY)?.nor;
        vertexNormals[i + 0] = nor!.x;
        vertexNormals[i + 1] = nor!.y;
        vertexNormals[i + 2] = 0;
      }
      tableRef.current.geometry.setAttribute("normal2D", new BufferAttribute(vertexNormals, 3));
      seamlessUVs(tableRef.current.geometry, debug.length * 0.5, debug.width * 0.5);
    }
  });

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} ref={tableRef}>
      <extrudeGeometry args={[geometry, { bevelEnabled: false, depth: 0.04, steps: 10 }]} />
      <ThreeCustomShaderMaterial
        baseMaterial={MeshStandardMaterial}
        silent
        {...maps}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        wireframe={debug.wireframe}
      />
      {/* <meshStandardMaterial wireframe={debug.wireframe} map={map} /> */}
    </mesh>
  );
};
