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
  tableRoughness: number;
  tableNormalSCale: number;
  tableColor: string;
  shift: number;
  currentEdge: number;
  previousEdge: number;
  uniquePoints: Array<{ x: number; y: number }>;
  selectedCube: number;
  update: (options: Partial<Tablestate>) => void;
}

export const useTableStore = create<Tablestate>()((set) => ({
  tableShape: "circle",
  tableLength: 2,
  tableWidth: 1,
  tableDiameter: 1,
  tablecornerRadius: 0,
  tableMaterial: "color.jpg",
  tableThickness: 0.04,
  tableSteps: 40,
  wireframe: false,
  insetBottom: 2,
  insetTop: -0.005,
  verticalEdgeThickness: 0.02,
  tableRoughness: 0.7,
  tableNormalSCale: 0.3,
  tableColor: "#fff",
  shift: 0.001,
  currentEdge: 0,
  previousEdge: 0,
  uniquePoints: [],
  selectedCube: 0,
  update: (options) => set((state) => ({ ...state, ...options })),
}));
