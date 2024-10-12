import { Environment, Helper } from "@react-three/drei";
import { PointLightHelper } from "three";

export const Lights = () => {
  return (
    <>
      {/* <spotLight position={[10, 7, 10.0]} distance={20} angle={0.9} penumbra={1} intensity={1000}>
        <Helper type={SpotLightHelper} args={["red"]} />
      </spotLight> */}
      <pointLight position={[-2, 1, 0]} intensity={3}>
        <Helper type={PointLightHelper} args={[1, "red"]} />
      </pointLight>

      {/* <pointLight position={[1, 2, 0]} intensity={10}>
        <Helper type={PointLightHelper} args={[1, "blue"]} />
      </pointLight> */}

      <directionalLight position={[2, 1, 0]} />

      {/* <spotLight position={[-10, 5, -10.0]} distance={20} angle={0.9} penumbra={1} intensity={1000}>
        <Helper type={SpotLightHelper} args={["blue"]} />
      </spotLight> */}
      <Environment files={"/env.exr"} environmentIntensity={0.5} />
    </>
  );
};
