import { useControls } from "leva";

export const useLevaDebug = () => {
  const debug = useControls("tabletop", {
    length: {
      value: 1,
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
    wireframe: false,
    shapes: {
      options: ["rectangle", "circle", "oval", "ellipse"],
    },
    material: {
      options: ["debug.jpg", "color.jpg"],
    },
  });

  return {
    debug,
  };
};
