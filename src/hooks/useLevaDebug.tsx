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
      value: -0.005,
      min: -1,
      max: 0,
      step: -0.0025,
      onChange: (value) => update({ insetTop: value }),
    },

    shift: {
      value: -0.00001,
      min: -0.005,
      max: 0.005,
      step: 0.0001,
      onChange: (value) => update({ shift: value }),
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
      options: ["oval", "rectangle", "ellipse"],
      onChange: (value) => update({ tableShape: value }),
    },
    material: {
      // options: ["debug.jpg", "color.webp"],
      options: ["color.jpg", "debug.jpg"],
      onChange: (value) => update({ tableMaterial: value }),
    },

    currentEdge: {
      // options: ["debug.jpg", "color.webp"],
      options: [0, 1, 2],
      onChange: (value) => update({ previousEdge: useTableStore.getState().currentEdge, currentEdge: value }),
    },

    roughness: {
      value: 0.5,
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

    pickColer: {
      options: ["#ffc494", "#867a6f", "#545c5c", "#ffefe3", "#737657"],
      onChange: (value) => {
        update({ tableColorPrevious: useTableStore.getState().tableColor, tableColor: value });
      },
    },
    color: {
      value: "#ffc494",
      onChange: (value) => update({ tableColor: value }),
    },

    selectedCube: {
      value: 0,
      step: 1,
      min: 0,
      max: 30,
      onChange: (value) => update({ selectedCube: value }),
    },
  });
};
