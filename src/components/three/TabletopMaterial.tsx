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
  const store = useTableStore();

  const uniforms = useMemo(
    () => ({
      uLength: new Uniform(store.tableLength),
      uWidth: new Uniform(store.tableWidth),
      uHeight: new Uniform(store.tableThickness),
      uSteps: new Uniform(store.tableSteps),
      uInsetBottom: new Uniform(store.insetBottom),
      uInsetTop: new Uniform(store.insetTop),
      uShift: new Uniform(store.shift),
      uColor: new Uniform(new Color(store.tableColor)),
      uColorPrevious: new Uniform(new Color(store.tableColorPrevious)),
      uColorTransition: new Uniform(0),
      uCurrentEdge: new Uniform(store.currentEdge),
      uPreviousEdge: new Uniform(store.previousEdge),
      uEdgeTransition: new Uniform(0),
      uVerticalEdgeThickness: new Uniform(store.verticalEdgeThickness),
    }),
    []
  );

  useEffect(() => {
    uniforms.uLength.value = store.tableLength;
    uniforms.uWidth.value = store.tableWidth;
    uniforms.uHeight.value = store.tableThickness;
    uniforms.uSteps.value = store.tableSteps;
    uniforms.uInsetBottom.value = store.insetBottom;
    uniforms.uInsetTop.value = store.insetTop;
    uniforms.uShift.value = store.shift;
    uniforms.uColor.value = new Color(store.tableColor);
    uniforms.uColorPrevious.value = new Color(store.tableColorPrevious);
    uniforms.uCurrentEdge.value = store.currentEdge;
    uniforms.uPreviousEdge.value = store.previousEdge;
    uniforms.uVerticalEdgeThickness.value = store.verticalEdgeThickness;
  }, [store]);

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
  }, [store.tableColor]);

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
  }, [store.currentEdge]);

  return (
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
  );
};
