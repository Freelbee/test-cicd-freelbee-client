'use client'

import styled from "styled-components";

type Props = {
  text: string;
}

export const Button = (props: Props) => {
  return (
    <StyledBtn>{props.text}</StyledBtn>
  )
}

const StyledBtn = styled.button`
  background-color: #647fc7;
  color: #201414;
  font-weight: bold;
`