import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary"| "logout";
    size: "sm" | "md" | "lg"|"login";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    loading?:boolean;
    type?: "button" | "submit";
}

const defaultStyle = "rounded-md flex items-center justify-center cursor-pointer font-light";

const variantStyles = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-300 text-purple-600",
    logout: "bg-red-600 text-white",
};

const sizeStyles = {
    "sm": "py-1 px-2 text-sm rounded-sm",
    "md": "py-1.5 px-3 text-md rounded-md",
    "lg": "py-4 px-6 text-xl rounded-xl",
    "login": "w-[65%] py-1 px-2 text-xl rounded-md bg-indigo-600 text-white"
};

export const Button = (props: ButtonProps) => {
    const isDisabled = Boolean(props.loading);

    return (
        <button
            type={props.type ?? "button"}
            onClick={isDisabled ? undefined : props.onClick}
            disabled={isDisabled}
            aria-busy={isDisabled}
            className={`${variantStyles[props.variant]} ${defaultStyle} ${sizeStyles[props.size]} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
            {props.text}
            {props.endIcon}
        </button>
    );
};