#include /src/shaders/functions.glsl;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec3 uColor;
uniform vec3 uColorPrevious;
uniform float uColorTransition;

void main(){
  vec4 diffuseMap = texture2D(map,vUv);

  vec3 color = diffuseMap.xyz;

// Center of the UV space (normalized between 0 and 1)
  float normalizedPosY = 1.0 - (vPosition.y / 0.7);
  float normalizedPosX = 1.0 - (vPosition.y / 0.7);
  normalizedPosY = remap(normalizedPosY,0.,1.,0.4,1.);
  float transition = 1. - smoothstep(uColorTransition , uColorTransition + 0.4, normalizedPosY);


  vec3 currentColor = uColor;
  vec3 previousColor = uColorPrevious;
  vec3 transitionColor = mix(uColorPrevious,uColor,transition);

  diffuseMap.xyz = color * transitionColor;

  csm_DiffuseColor = diffuseMap;
}