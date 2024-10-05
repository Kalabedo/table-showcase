import { create } from "zustand";

interface Tablestate {
  tableShape: string;
  tableLength: number;
  tableWidth: number;
  tableDiameter: number;
  tablecornerRadius: number;
  tableMaterial: string;
  wireframe: boolean;
  insetBottom: number;
  insetTop: number;
  update: (options: Partial<Tablestate>) => void;
}

export const useTableStore = create<Tablestate>()((set) => ({
  tableShape: "rectangle",
  tableLength: 2,
  tableWidth: 1,
  tableDiameter: 1,
  tablecornerRadius: 0,
  tableMaterial: "color.webp",
  wireframe: false,
  insetBottom: 1.5,
  insetTop: 0.005,
  update: (options) => set((state) => ({ ...state, ...options })),
}));
