attribute vec3 normal2D;


varying vec2 vUv;
varying vec3 vCustomNormal;
varying vec3 vPosition;
varying vec2 vNormal2D;

uniform float uHeight;
uniform float uSteps;
uniform float uInsetTop;
uniform float uInsetBottom;
uniform float uVerticalEdgeThickness;

vec2 getOffsetPosition( vec3 position, float uHeight, float uSteps){

  if(position.z > uVerticalEdgeThickness){
    return -normal2D.xy * ( uVerticalEdgeThickness - position.z) * uInsetBottom;
  }

  if(position.z < uHeight / uSteps){
    return -normal2D.xy * uInsetTop;
  }

  return vec2(0.);
}

vec2 alignUVsAfterOffset(vec2 vUv,vec3 vCustomNormal){
    // Calculate the offset based on normal2D
  vec2 offset = normal2D.xy * (uVerticalEdgeThickness - position.z)* uInsetBottom;
  vec2 topOffset = normal2D.xy * uInsetTop;

  if(position.z > uVerticalEdgeThickness){
    if(abs(vCustomNormal.x)== 1.){
      vUv.y -= offset.y;
    }
    if(abs(vCustomNormal.y )== 1.){
      vUv.x -= offset.x;
    }
  }

  if(position.z < uHeight / uSteps){
    if(abs(vCustomNormal.z)== 1.){
      vUv.x -= topOffset.x;
    }

    if(abs(vCustomNormal.x)== 1.){
      vUv.y -= topOffset.y;
    }
    if(abs(vCustomNormal.y )== 1.){
      vUv.x -= topOffset.x;
    }
  }

  if(abs(vCustomNormal.x)== 1.){
    vUv.y += topOffset.y;
    vUv.x -= topOffset.x;
  }

  vUv *= 0.5;

  return vUv;

}

void main(){
  vUv = uv;
  vCustomNormal = normalize(normal);

  vec3 modifiedPosition = position;

  //new computed normals using neighbours technique
  vec3 biTangent = cross(normal, tangent.xyz);
  float shift = 0.00001;
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