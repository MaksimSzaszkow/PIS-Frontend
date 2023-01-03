import {PisButtonProps} from "./PisButton.types";
import s from "./PisButton.module.css";

function PisButton(
    {
        children,
        className,
        ...props
    }: PisButtonProps) {
    return (
        <button
            className={`${className} ${s.button}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default PisButton;