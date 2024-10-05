import { useControls } from "leva";

export const useLevaDebug = () => {
  const debug = useControls("tabletop", {
    length: {
      value: 2,
      min: 0,
      max: 3,
      step: 0.1,
    },
    width: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
    },
    diameter: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.1,
    },
    cornerRadius: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },

    insetBottom: {
      value: 1.5,
      min: 0,
      max: 2,
      step: 0.1,
    },
    insetTop: {
      value: 0.005,
      min: 0,
      max: 0.1,
      step: 0.001,
    },
    wireframe: false,
    shapes: {
      options: ["rectangle", "circle", "oval", "ellipse"],
    },
    material: {
      options: ["debug.jpg", "color.webp"],
    },
  });

  return {
    debug,
  };
};
