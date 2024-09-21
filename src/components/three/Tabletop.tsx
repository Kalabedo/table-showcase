import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export const Tabletop = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes } = useGLTF("/table-showcase.glb") as GLTFResult;
  const map = useTexture("/debug.jpg");
  map.flipY = false;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial map={map} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/table-showcase.glb");
