attribute vec3 normal2D;
attribute vec3 tangent;


varying vec2 vUv;
varying vec3 vCustomNormal;
varying vec3 vPosition;
varying vec2 vNormal2D;

uniform float uHeight;
uniform float uSteps;
uniform float uInsetTop;
uniform float uInsetBottom;
uniform float uVerticalEdgeThickness;
uniform float uShift;

#include "/src/shaders/edges.glsl"

void main(){
  vUv = uv;
  vCustomNormal = normalize(normal);

  vec3 modifiedPosition = position;

  //new computed normals using neighbours technique
  vec3 biTangent = cross(normal, tangent.xyz);
  float shift = uShift;
    // Adjust shift based on the sign of the normal's x or y component
  if (normal.x < 0.0 || normal.y > 0.0) {
    shift = -shift;
  }
  vec3 positionA = csm_Position + tangent.xyz * shift;
  vec3 positionB = csm_Position + biTangent.xyz * shift;

  // create edge + align uv's again
  csm_Position.xy += getOffsetPosition(csm_Position,uHeight,uSteps);
  vUv = alignUVsAfterOffset(vUv,vCustomNormal);

  // neighbours offset edge
  positionA.xy += getOffsetPosition(positionA,uHeight,uSteps);
  positionB.xy += getOffsetPosition(positionB,uHeight,uSteps);

  vPosition = position; 
  vNormal2D = normal2D.xy;

  vec3 toA = normalize(positionA -  csm_Position);
  vec3 toB = normalize(positionB -  csm_Position);
  csm_Normal = cross(toA,toB);
  vCustomNormal = csm_Normal;

}