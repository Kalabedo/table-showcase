/* eslint-disable react-hooks/exhaustive-deps */
import { useMaterial } from "@/hooks/useMaterial";
import fragment from "@/shaders/legs/legFragment.glsl";
import vertex from "@/shaders/legs/legVertex.glsl";
import { Color, MeshStandardMaterial, Uniform } from "three";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import { useTableStore } from "../../store/Tablestore";
import { useEffect, useMemo } from "react";
import gsap from "gsap";

export const TablelegMaterial = () => {
  const maps = useMaterial();
  const tableColor = useTableStore((state) => state.tableColor);
  const tableColorPrevious = useTableStore((state) => state.tableColorPrevious);

  const uniforms = useMemo(
    () => ({
      uColor: new Uniform(new Color(tableColor)),
      uColorPrevious: new Uniform(new Color(tableColorPrevious)),
      uColorTransition: new Uniform(0),
    }),
    []
  );

  useEffect(() => {
    uniforms.uColor.value = new Color(tableColor);
    uniforms.uColorPrevious.value = new Color(tableColorPrevious);
  }, [tableColor, tableColorPrevious]);

  useEffect(() => {
    gsap.fromTo(
      uniforms.uColorTransition,
      { value: 0 },
      {
        value: 1,
        duration: 1,
        delay: 0.6,
        ease: "linear",
      }
    );
  }, [tableColor]);

  return (
    <ThreeCustomShaderMaterial
      baseMaterial={MeshStandardMaterial}
      silent
      uniforms={uniforms}
      vertexShader={vertex}
      fragmentShader={fragment}
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
  );
};
