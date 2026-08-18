import type { ReactElement } from "react";

interface Buttonprops {
    varient: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    starticon?: ReactElement;
    endicon?: ReactElement;
    onclick: () => void;
}
const defaultsttyle="rounded-md flex"
const virentstyle = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-300 text-purple-600"
}
const stylesize={
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-4 px-6"
}

export const Button = (props: Buttonprops) => {
    return <button className={`${virentstyle[props.varient]} ${defaultsttyle} ${stylesize[props.size]}`}>
        {props.starticon?<div className="pr-2">{props.starticon}</div>:null} {props.text} {props.endicon}
    </button>
}