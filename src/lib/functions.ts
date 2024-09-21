import { ExtrudeGeometry } from "three";

export function seamlessUVs(geometry: ExtrudeGeometry, length: number) {
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
        y = pos.getZ(i) + 0.5;
      } else {
        // Rotate UV 180 degrees by negating both x and y
        x = pos.getX(i); // Invert the x-axis
        y = -pos.getZ(i) + 0.5; // Invert the y-axis to achieve 180-degree rotation
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
