import { Environment, Helper } from "@react-three/drei";
import { SpotLightHelper } from "three";

export const Lights = () => {
  return (
    <>
      <spotLight position={[2.5, 3, 3.0]} rotation={[Math.PI / 4, 0, 0]} distance={7} angle={0.3} penumbra={1} intensity={80}>
        <Helper type={SpotLightHelper} args={["red"]} />
      </spotLight>
      <Environment files={"/env.exr"} environmentIntensity={0.7} />
    </>
  );
};
