attribute vec3 normal2D;

varying vec2 vUv;
varying vec3 vCustomNormal;
varying vec3 vPosition;
varying vec2 vNormal2D;

uniform float uHeight;
uniform float uSteps;

void main(){
  vUv = uv;
  vCustomNormal = normalize(normal);

  vec3 modifiedPosition = position;

  // Calculate the offset based on normal2D
  vec2 offset = normal2D.xy * (0.01 - position.z);
  vec2 topOffset = normal2D.xy * -0.01;


  if(position.z > 0.01){
    modifiedPosition.xy -= normal2D.xy * ( 0.01 -position.z);

    if(abs(vCustomNormal.x)== 1.){
      vUv.y -= offset.y;
    }
    if(abs(vCustomNormal.y )== 1.){
      vUv.x -= offset.x;
    }
  }

  if(position.z < uHeight / uSteps){
     modifiedPosition.xy -= normal2D.xy * -0.01;

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
  }

  vUv *= 0.35;

  csm_Position = modifiedPosition;
  vPosition = position; 
  vNormal2D = normal2D.xy;
}