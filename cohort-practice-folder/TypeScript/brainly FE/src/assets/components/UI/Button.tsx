import type { ReactElement } from "react";
type Variant = "primary" | "secondary";

interface ButtonProps {
    variant: Variant;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement; 
    endIcon?: ReactElement;
    onClick?: ()=>void;
}

const variantStyle = {
    "primary": "bg-blue-300 text-white",
    "secondary": "bg-blue-600 text-white"
}

const sizeStyle = {
    "sm": "p-2 ",
    "md": "p-4 ",
    "lg": "p-6 "

}

const defaultStyle = "rounded-md flex ";

export const Button = (props: ButtonProps) =>{
return <button className={`${variantStyle[props.variant]} ${defaultStyle}  ${sizeStyle[props.size]}`}>{props.startIcon}{props.text} {props.endIcon}</button>
}

