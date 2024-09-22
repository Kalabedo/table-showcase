varying vec2 vUv;
varying vec3 vCustomNormal;

void main(){
  vec4 diffuseMap = texture2D(map,vUv);

  vec3 color = diffuseMap.xyz;
  // Normalize the normals
  vec3 normalizedNormals = normalize(vCustomNormal);

  // Check if the normal indicates it's part of a rounded corner
  // This checks for normals that point in a direction that would correspond to rounded geometry
  if (abs(normalizedNormals.y) < 0.999 && normalizedNormals.z == 0. && abs(normalizedNormals.x) < 0.999) {
      color = vec3(0.);
  }


  diffuseMap.xyz = color;

  csm_DiffuseColor = diffuseMap;
}