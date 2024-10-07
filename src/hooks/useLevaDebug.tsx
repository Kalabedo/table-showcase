import { useControls } from "leva";
import { useTableStore } from "../store/Tablestore";

export const useLevaDebug = () => {
  const update = useTableStore((state) => state.update);

  useControls("tabletop", {
    length: {
      value: 2,
      min: 0,
      max: 3,
      step: 0.1,
      onChange: (value) => update({ tableLength: value }),
    },
    width: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
      onChange: (value) => update({ tableWidth: value }),
    },
    diameter: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.1,
      onChange: (value) => update({ tableDiameter: value }),
    },
    cornerRadius: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (value) => update({ tablecornerRadius: value }),
    },

    thickness: {
      value: 0.04,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (value) => update({ tableThickness: value }),
    },

    steps: {
      value: 40,
      min: 10,
      max: 50,
      step: 1,
      onChange: (value) => update({ tableSteps: value }),
    },

    insetBottom: {
      value: 2,
      min: 0,
      max: 4,
      step: 0.01,
      onChange: (value) => update({ insetBottom: value }),
    },
    insetTop: {
      value: -0.0025,
      min: -1,
      max: 0,
      step: -0.0025,
      onChange: (value) => update({ insetTop: value }),
    },

    verticalEdgeThickness: {
      value: 0.02,
      min: 0,
      max: 0.05,
      step: 0.001,
      onChange: (value) => update({ verticalEdgeThickness: value }),
    },

    wireframe: { value: false, onChange: (value) => update({ wireframe: value }) },
    shapes: {
      options: ["rectangle", "circle", "oval", "ellipse"],
      onChange: (value) => update({ tableShape: value }),
    },
    material: {
      options: ["color.webp", "debug.jpg"],
      onChange: (value) => update({ tableMaterial: value }),
    },

    roughness: {
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (value) => update({ tableRoughness: value }),
    },
    normalScale: {
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (value) => update({ tableNormalSCale: value }),
    },

    color: {
      value: "#fff",
      onChange: (value) => update({ tableColor: value }),
    },
  });
};
