import { Point, PointOffset } from "@/types/types";
import { BufferGeometry } from "three";

export function seamlessUVs(geometry: BufferGeometry, length: number, width: number) {
  const pos = geometry.getAttribute("position"),
    nor = geometry.getAttribute("normal"),
    uvs = geometry.getAttribute("uv");

  for (let i = 0; i < pos.count; i++) {
    let x = 0,
      y = 0;

    const nx = Math.abs(nor.getX(i)),
      ny = Math.abs(nor.getY(i)),
      nz = Math.abs(nor.getZ(i));

    const nxDirection = nor.getX(i),
      nyDirection = nor.getY(i),
      nzDirection = nor.getZ(i);

    // if facing X
    if (nx >= ny && nx >= nz) {
      if (nxDirection >= 0) {
        x = pos.getZ(i) + length;
        y = pos.getY(i);
      } else {
        x = -1 * pos.getZ(i) - length;
        y = pos.getY(i);
      }
    }

    // if facing Y
    if (ny >= nx && ny >= nz) {
      if (nyDirection >= 0) {
        x = pos.getX(i);
        y = pos.getZ(i) + width;
      } else {
        // Rotate UV 180 degrees by negating both x and y
        x = pos.getX(i); // Invert the x-axis
        y = -pos.getZ(i) - width; // Invert the y-axis to achieve 180-degree rotation
      }
    }

    // if facing Z
    if (nz >= nx && nz >= ny) {
      if (nzDirection <= 0) {
        x = pos.getX(i);
        y = pos.getY(i);
      } else {
        x = pos.getX(i);
        y = -pos.getY(i);
      }
    }

    uvs.setXY(i, x, y);
  }
}

function normalizeVec(p: Point): Point {
  const len = Math.sqrt(p.x * p.x + p.y * p.y);
  return { x: p.x / len, y: p.y / len };
}

export const makeOffsetPoly = (points: Point[], outer_ccw: number = 1): PointOffset[] => {
  const num_points = points.length;
  const directionVectors: PointOffset[] = [];

  for (let curr = 0; curr < num_points; curr++) {
    // Get indices of previous and next points (wrapping around the polygon)
    const prev = (curr + num_points - 1) % num_points;
    const next = (curr + 1) % num_points;

    // Calculate vector to next point
    const vn = { x: points[next].x - points[curr].x, y: points[next].y - points[curr].y };
    const vnn = normalizeVec(vn);
    // Calculate normal vector (perpendicular) to vnn
    const nnn = { x: vnn.y, y: -vnn.x };

    // Calculate vector to previous point
    const vp = { x: points[curr].x - points[prev].x, y: points[curr].y - points[prev].y };
    const vpn = normalizeVec(vp);
    // Calculate normal vector (perpendicular) to vpn, considering direction
    const npn = { x: vpn.y * outer_ccw, y: -vpn.x * outer_ccw };

    // Calculate bisector vector
    const bis = { x: (nnn.x + npn.x) * outer_ccw, y: (nnn.y + npn.y) * outer_ccw };
    const bisn = normalizeVec(bis);

    directionVectors.push({ pos: { x: points[curr].x, y: points[curr].y }, nor: bisn });
  }

  return directionVectors;
};

// Function to find the nearest index
export function findNearestIndex(thisPoint: Point, points: Point[]): number {
  let nearestDistSquared = Infinity;
  let nearestIndex = -1;

  for (let i = 0; i < points.length; i++) {
    const point2 = points[i];
    const distSquared = (thisPoint.x - point2.x) ** 2 + (thisPoint.y - point2.y) ** 2;

    if (distSquared < nearestDistSquared) {
      nearestDistSquared = distSquared;
      nearestIndex = i;
    }
  }

  return nearestIndex;
}

// Function to sort points in sequence by proximity
export function orderPointsByProximity(points: Point[]): Point[] {
  const orderedList: Point[] = [];

  // Arbitrary starting point, remove the first point from the original list
  orderedList.push(points.shift()!);

  // While there are still points to order
  while (points.length > 0) {
    const lastPoint = orderedList[orderedList.length - 1];

    // Find the index of the closest point to the last point
    const nearestIndex = findNearestIndex(lastPoint, points);

    // Remove the nearest point from the list and add it to the ordered list
    orderedList.push(points.splice(nearestIndex, 1)[0]);
  }

  return orderedList;
}
