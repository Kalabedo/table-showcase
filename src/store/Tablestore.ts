import { create } from "zustand";

interface Tablestate {
  tableShape: string;
  tableLength: number;
  tableWidth: number;
  tableDiameter: number;
  tableThickness: number;
  tableSteps: number;
  tablecornerRadius: number;
  tableMaterial: string;
  wireframe: boolean;
  insetBottom: number;
  insetTop: number;
  verticalEdgeThickness: number;
  update: (options: Partial<Tablestate>) => void;
}

export const useTableStore = create<Tablestate>()((set) => ({
  tableShape: "rectangle",
  tableLength: 2,
  tableWidth: 1,
  tableDiameter: 1,
  tablecornerRadius: 0,
  tableMaterial: "color.webp",
  tableThickness: 0.04,
  tableSteps: 40,
  wireframe: false,
  insetBottom: 2,
  insetTop: -0.0025,
  verticalEdgeThickness: 0.02,
  update: (options) => set((state) => ({ ...state, ...options })),
}));
