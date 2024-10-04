varying vec2 vUv;
varying vec3 vCustomNormal;
varying vec3 vPosition;
attribute vec3 normal2D;

void main(){
  vUv = uv * 0.5;
  vCustomNormal = normalize(normal);

  vec3 modifiedPosition = position;

  if(position.z > 0.01){
    // modifiedPosition.xy -= normal.xy * 0.01;
  }
  csm_Position = modifiedPosition;
  vPosition = position; 
}