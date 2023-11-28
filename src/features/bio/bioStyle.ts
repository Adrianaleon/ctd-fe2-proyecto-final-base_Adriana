
import styled from "styled-components";

interface ButtonBioProps{
    children:React.ReactNode;
    isPrimary?:boolean;
    onClick?:()=>void;
  }
  
  export const BotonBio= styled.button<ButtonBioProps>`
  border-radius: 5px;
  border: 1px solid darkgray;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  padding: 1rem;
  margin: 1rem;
  font-family: "Homer Simpson Revised", sans-serif;
  font-size: 1.4rem;
  background-color:${(props)=>(props.isPrimary ? "#FFD700" : "white")};
  color:${(props)=>(props.isPrimary ? "whitesmoke" : "whitesmoke")};
  text-shadow : 2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
  -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,
  -2px 0px 0 #000000, 0px -2px 0 #000000;
  transition:background-color 0.3s, color 0.3s;
  &:hover,
  &:focus{
    background-color:#ffd700;
    color: whitesmoke;
  }
  `;