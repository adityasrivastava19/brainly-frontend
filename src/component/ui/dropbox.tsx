import type { UseFormRegisterReturn } from "react-hook-form";

const sizeStyles = {
    "sm": "py-1 px-2 text-sm ",
    "md": "py-2 px-4 text-base ",
    "lg": "py-3 px-6 text-lg "
};

export function Dropdown({
    res,
    size
}: {
    res: UseFormRegisterReturn;
    size: "sm" | "md" | "lg";
}) {
    return (
        <select
            {...res}
            className={`border border-black rounded flex  ${sizeStyles[size]}`}
        >
            <option value="">Select type</option>
            <option value="youtube">YouTube</option>
            <option value="tweet">Twitter</option>
            <option value="document">Document</option>
        </select>
    );
}