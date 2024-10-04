export type Shapes = "circle" | "rectangle" | "oval" | "ellipse";

export interface Point {
  x: number;
  y: number;
}

export interface PointOffset {
  pos: Point;
  nor: Point;
}
