import { useTableStore } from "../../store/Tablestore";

export const Cubes = () => {
  const cubes = useTableStore((state) => state.uniquePoints);
  // const selectedCube = useTableStore((state) => state.selectedCube);
  return (
    <>
      {cubes &&
        cubes.map((x, key) => (
          <mesh key={key} position={[x.x, 0, x.y]} scale={0.05}>
            <planeGeometry />
            <meshStandardMaterial attach="material" color="#f00" />
          </mesh>
        ))}
    </>
  );
};
