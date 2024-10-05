/* eslint-disable react-hooks/exhaustive-deps */
import { BufferAttribute, Mesh, MeshStandardMaterial, Shape, Uniform } from "three";
import { useEffect, useMemo, useRef } from "react";
import { useShape } from "@/hooks/useShape";
import { Shapes } from "@/types/types";
import { makeOffsetPoly, seamlessUVs } from "@/lib/functions";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import fragment from "@/shaders/fragment.glsl";
import vertex from "@/shaders/vertex.glsl";
import { useMaterial } from "./useMaterial";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useTableStore } from "../../store/Tablestore";
import { useLevaDebug } from "@/hooks/useLevaDebug";

export const Tabletop = () => {
  useLevaDebug();
  const tableRef = useRef<Mesh>(null);
  const maps = useMaterial();
  const store = useTableStore();

  const shapingFunction = useShape(store.tableShape as Shapes);

  const geometry = useMemo(() => {
    return new Shape(shapingFunction());
  }, [store]);

  const uniforms = useMemo(
    () => ({
      uLength: new Uniform(store.tableLength),
      uWidth: new Uniform(store.tableWidth),
      uHeight: new Uniform(0.04),
      uSteps: new Uniform(10),
      uInsetBottom: new Uniform(store.insetBottom),
      uInsetTop: new Uniform(store.insetTop),
    }),
    [store.tableLength, store.tableWidth, store.insetBottom, store.insetTop]
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
      seamlessUVs(tableRef.current.geometry, store.tableLength * 0.5, store.tableWidth * 0.5);
    }
  });

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} ref={tableRef}>
      <extrudeGeometry args={[geometry, { bevelEnabled: false, depth: 0.04, steps: 10 }]} />
      <ThreeCustomShaderMaterial
        baseMaterial={MeshStandardMaterial}
        silent
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        wireframe={store.wireframe}
        patchMap={{
          "*": {
            "#include <normal_fragment_maps>": `#ifdef USE_NORMALMAP_OBJECTSPACE

              normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

              #ifdef FLIP_SIDED

                normal = - normal;

              #endif

              #ifdef DOUBLE_SIDED

                normal = normal * faceDirection;

              #endif

              normal = normalize( normalMatrix * normal );

            #elif defined( USE_NORMALMAP_TANGENTSPACE )

              vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
              mapN.xy *= normalScale;

              normal = normalize( tbn * mapN );

            #elif defined( USE_BUMPMAP )

              normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

            #endif
              `,
          },
        }}
        {...maps}
      />
      {/* <meshStandardMaterial wireframe={debug.wireframe} map={map} /> */}
    </mesh>
  );
};
