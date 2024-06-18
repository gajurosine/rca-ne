import { HTMLAttributes } from "react";

// Define an interface that extends HTMLAttributes for HTML button elements
// This interface includes a children prop of type React.ReactNode
export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    disabled?: boolean;
    
}

// Button component that uses the IButtonProps interface for its props
export default function Button(props: IButtonProps) {
    return (
        <button
        disabled={props.disabled}
            {...props} // Spread the rest of the props onto the button element
            className={`w-fit bg-button text-white h-[50px] py-2 px-6 rounded-lg hover:bg-white hover:text-button border border-button transition duration-300 ${props.className}`}
        >
            {props.children} {/* Render the children prop inside the button */}
        </button>
    );
}