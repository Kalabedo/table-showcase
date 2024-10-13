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
uniform float uCurrentEdge;
uniform float uPreviousEdge;
uniform float uEdgeTransition;

#include "/src/shaders/edges.glsl"

void main(){
  vUv = uv;
  vCustomNormal = normalize(normal);

  vec3 modifiedPosition = position;

  //new computed normals using neighbours technique
  vec3 biTangent = cross(normal, tangent.xyz);
  float shift = uShift;
  // Adjust shift based on the sign of the normal's x or y component
  if (normal.x < -0.7 || normal.y > 0.7) {
    shift = -shift;
  }
  vec3 positionA = csm_Position + tangent.xyz * shift;
  vec3 positionB = csm_Position + biTangent.xyz * shift;

  vec2 edgePositionTransition = mix(getOffsetPosition(csm_Position,uHeight,uSteps,uPreviousEdge),getOffsetPosition(csm_Position,uHeight,uSteps,uCurrentEdge),uEdgeTransition);
  vec2 vUvTransition = mix(alignUVsAfterOffset(vUv,vCustomNormal,uPreviousEdge),alignUVsAfterOffset(vUv,vCustomNormal,uCurrentEdge),uEdgeTransition);

  // create edge + align uv's again
  csm_Position.xy += edgePositionTransition;
  vUv = vUvTransition;

  // neighbours offset edge
  vec2 edgePositionATransition = mix(getOffsetPosition(positionA,uHeight,uSteps,uPreviousEdge),getOffsetPosition(positionA,uHeight,uSteps,uCurrentEdge),uEdgeTransition);
  vec2 edgePositionBTransition = mix(getOffsetPosition(positionB,uHeight,uSteps,uPreviousEdge),getOffsetPosition(positionB,uHeight,uSteps,uCurrentEdge),uEdgeTransition);

  positionA.xy += edgePositionATransition;
  positionB.xy += edgePositionBTransition;

  vPosition = position; 
  vNormal2D = normal2D.xy;

  vec3 toA = normalize(positionA -  csm_Position);
  vec3 toB = normalize(positionB -  csm_Position);
  csm_Normal = cross(toA,toB);
  vCustomNormal = csm_Normal;

}