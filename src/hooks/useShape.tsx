import { Shapes } from "@/types/types";
import { Vector2 } from "three";
import { useLevaDebug } from "./useLevaDebug";

export const useShape = (shape: Shapes) => {
  const { debug } = useLevaDebug();

  // SHAPE LIST
  const shapes = {
    circle: getCirclePoints,
    rectangle: getRoundedRectPoints,
    oval: getOvalPoints,
    ellipse: getEllipsePoints,
  };

  return shapes[shape];

  function getCirclePoints(radius: number = debug.diameter / 2, segments: number = 256): Vector2[] {
    const points: Vector2[] = [];
    const angleStep = (2 * Math.PI) / segments;

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      points.push(new Vector2(x, y));
    }

    return points;
  }

  function getRoundedRectPoints(
    length: number = debug.length,
    width: number = debug.width,
    radius: number = debug.cornerRadius,
    cornerSegments: number = 128
  ): Vector2[] {
    const points: Vector2[] = [];

    // Define the positions of the corners
    const halfLength = length / 2;
    const halfWidth = width / 2;

    // Ensure the radius doesn't exceed the half-length or half-width
    const clampedRadius = Math.min(radius, halfLength, halfWidth);

    // Helper function to generate rounded corner points
    function addCornerPoints(x: number, y: number, startAngle: number, endAngle: number) {
      const angleStep = (endAngle - startAngle) / cornerSegments;
      for (let i = 0; i <= cornerSegments; i++) {
        const angle = startAngle + i * angleStep;
        const cx = x + clampedRadius * Math.cos(angle);
        const cy = y + clampedRadius * Math.sin(angle);
        points.push(new Vector2(cx, cy));
      }
    }

    // Start from top-right corner and move clockwise
    points.push(new Vector2(halfLength - clampedRadius, halfWidth)); // Top-right straight line
    addCornerPoints(halfLength - clampedRadius, halfWidth - clampedRadius, 0, Math.PI / 2); // Top-right rounded corner

    points.push(new Vector2(-halfLength + clampedRadius, halfWidth)); // Top side straight line
    addCornerPoints(-halfLength + clampedRadius, halfWidth - clampedRadius, Math.PI / 2, Math.PI); // Top-left rounded corner

    points.push(new Vector2(-halfLength, -halfWidth + clampedRadius)); // Left side straight line
    addCornerPoints(-halfLength + clampedRadius, -halfWidth + clampedRadius, Math.PI, 1.5 * Math.PI); // Bottom-left rounded corner

    points.push(new Vector2(halfLength - clampedRadius, -halfWidth)); // Bottom side straight line
    addCornerPoints(halfLength - clampedRadius, -halfWidth + clampedRadius, 1.5 * Math.PI, 2 * Math.PI); // Bottom-right rounded corner

    points.push(new Vector2(halfLength, halfWidth - clampedRadius)); // Right side straight line

    return points;
  }

  function getOvalPoints(length: number = debug.length, width: number = debug.width): Vector2[] {
    return getRoundedRectPoints(length, width, 2, 64);
  }

  function getEllipsePoints(majorAxis: number = 2, minorAxis: number = 1, segments: number = 256): Vector2[] {
    const points: Vector2[] = [];
    const angleStep = (2 * Math.PI) / segments;

    for (let i = 0; i <= segments; i++) {
      const angle = i * angleStep;
      const x = majorAxis * 0.5 * Math.cos(angle); // Adjust for the major axis
      const y = minorAxis * 0.5 * Math.sin(angle); // Adjust for the minor axis
      points.push(new Vector2(x, y));
    }

    return points;
  }
};
