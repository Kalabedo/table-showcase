#include /src/shaders/functions.glsl;

varying vec2 vUv;
varying vec3 vCustomNormal;
varying vec3 vPosition;
varying vec3 vNormals2;
varying vec2 vNormal2D;

uniform float uLength;
uniform float uWidth;
uniform vec3 uColor;
uniform float uHeight;
uniform float uSteps;

void main(){
  vec4 diffuseMap = texture2D(map,vUv);

  vec3 color = diffuseMap.xyz;
  // Normalize the normals
  vec3 normalizedNormals = normalize(vCustomNormal);

  // Define the UV offset amount for sampling along the X-axis (you can tweak this for better results)
  float uvXOffset = 0.00001;  // Adjust this value based on the texture scaling

  // Check if the normal indicates it's part of a rounded corner
  // This checks for normals that point in a direction that would correspond to rounded geometry
  // if (abs(normalizedNormals.x) <0.7 && normalizedNormals.z == 0. && abs(normalizedNormals.y) < 0.99) {
  //     float percentage =abs(dot(normalizedNormals,vec3(1.,0.,0.)));
  //     percentage = smoothstep(0.,0.99,percentage);
  //     // percentage = remap(percentage, -1.,1.,0.,1.);

  //     vec2 offsetUv = vec2(vUv.y, -vUv.x);
      
  //     // Sample the texture at the offset UV coordinates
  //     vec4 offsetDiffuseMap = texture2D(map, offsetUv);

  //     // Use the color from the offset sample for the rounded edges
  //     color = mix(color,offsetDiffuseMap.xyz,percentage);
  // }

  
  // if(vPosition.z < (uHeight / uSteps) *3.){
  //        color = vec3(0.,0.,0.);
  // }

  diffuseMap.xyz = color * uColor;
  // diffuseMap.xyz = vCustomNormal;

  csm_DiffuseColor = diffuseMap;
}