/* eslint-disable react-hooks/exhaustive-deps */
import { useMaterial } from "@/hooks/useMaterial";
import fragment from "@/shaders/fragment.glsl";
import vertex from "@/shaders/vertex.glsl";
import { Color, MeshStandardMaterial, Uniform } from "three";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import { useTableStore } from "../../store/Tablestore";
import { useEffect, useMemo } from "react";
import gsap from "gsap";

export const TabletopMaterial = () => {
  const maps = useMaterial();
  const {
    tableLength,
    tableWidth,
    tableThickness,
    tableSteps,
    insetBottom,
    shift,
    tableColor,
    tableColorPrevious,
    currentEdge,
    previousEdge,
    verticalEdgeThickness,
    insetTop,
    wireframe,
  } = useTableStore();

  const uniforms = useMemo(
    () => ({
      uLength: new Uniform(tableLength),
      uWidth: new Uniform(tableWidth),
      uHeight: new Uniform(tableThickness),
      uSteps: new Uniform(tableSteps),
      uInsetBottom: new Uniform(insetBottom),
      uInsetTop: new Uniform(insetTop),
      uShift: new Uniform(shift),
      uColor: new Uniform(new Color(tableColor)),
      uColorPrevious: new Uniform(new Color(tableColorPrevious)),
      uColorTransition: new Uniform(0),
      uCurrentEdge: new Uniform(currentEdge),
      uPreviousEdge: new Uniform(previousEdge),
      uEdgeTransition: new Uniform(0),
      uVerticalEdgeThickness: new Uniform(verticalEdgeThickness),
    }),
    []
  );

  useEffect(() => {
    uniforms.uLength.value = tableLength;
    uniforms.uWidth.value = tableWidth;
    uniforms.uHeight.value = tableThickness;
    uniforms.uSteps.value = tableSteps;
    uniforms.uInsetBottom.value = insetBottom;
    uniforms.uInsetTop.value = insetTop;
    uniforms.uShift.value = shift;
    uniforms.uColor.value = new Color(tableColor);
    uniforms.uColorPrevious.value = new Color(tableColorPrevious);
    uniforms.uCurrentEdge.value = currentEdge;
    uniforms.uPreviousEdge.value = previousEdge;
    uniforms.uVerticalEdgeThickness.value = verticalEdgeThickness;
  }, [
    tableLength,
    tableWidth,
    tableThickness,
    tableSteps,
    insetBottom,
    insetTop,
    shift,
    tableColor,
    tableColorPrevious,
    currentEdge,
    previousEdge,
    verticalEdgeThickness,
  ]);

  useEffect(() => {
    gsap.fromTo(
      uniforms.uColorTransition,
      { value: 0 },
      {
        value: 1,
        duration: 1,
        ease: "linear",
      }
    );
  }, [tableColor]);

  useEffect(() => {
    gsap.fromTo(
      uniforms.uEdgeTransition,
      { value: 0 },
      {
        value: 1,
        duration: 1,
        ease: "linear",
      }
    );
  }, [currentEdge]);

  return (
    <ThreeCustomShaderMaterial
      baseMaterial={MeshStandardMaterial}
      silent
      vertexShader={vertex}
      fragmentShader={fragment}
      uniforms={uniforms}
      wireframe={wireframe}
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
