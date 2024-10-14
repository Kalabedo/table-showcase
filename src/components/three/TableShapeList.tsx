import { Shapes } from "@/types/types";
import { Tabletop } from "./Tabletop";
import { useTableStore } from "../../store/Tablestore";
import { useLevaDebug } from "@/hooks/useLevaDebug";

export const TableShapeList = () => {
  useLevaDebug();
  const listShapes = ["oval", "rectangle", "ellipse"];
  const currentShape = useTableStore((state) => state.tableShape);
  const width = useTableStore((state) => state.tableWidth);
  const currentShapeIndex = listShapes.indexOf(currentShape);
  console.log(currentShapeIndex);

  return (
    <>
      {/* <Tabletop tableShape="oval" positionZ={0} />
      <Tabletop tableShape="oval" positionZ={1} /> */}
      {listShapes.map((x, index) => (
        <Tabletop key={index} tableShape={x as Shapes} positionZ={(currentShapeIndex - index) * width + 0.5 * (currentShapeIndex - index)} />
      ))}
    </>
  );
};
