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

    insetBottom: {
      value: 1.5,
      min: 0,
      max: 2,
      step: 0.1,
      onChange: (value) => update({ insetBottom: value }),
    },
    insetTop: {
      value: 0.005,
      min: 0,
      max: 0.1,
      step: 0.001,
      onChange: (value) => update({ insetTop: value }),
    },
    wireframe: { value: false, onChange: (value) => update({ wireframe: value }) },
    shapes: {
      options: ["rectangle", "circle", "oval", "ellipse"],
      onChange: (value) => update({ tableShape: value }),
    },
    material: {
      options: ["debug.jpg", "color.webp"],
      onChange: (value) => update({ tableMaterial: value }),
    },
  });
};
