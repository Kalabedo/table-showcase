import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

export const Container: FC<PropsWithChildren> = (props) => {
  return <ContainerStyled>{props.children}</ContainerStyled>;
};

const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;
`;
