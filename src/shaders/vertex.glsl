varying vec2 vUv;
varying vec3 vCustomNormal;

void main(){
  vUv = uv;
  vCustomNormal = normalize(normal);
}