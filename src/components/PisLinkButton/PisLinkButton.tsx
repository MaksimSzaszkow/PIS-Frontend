import {PisLinkButtonProps} from "./PisLinkButton.types";
import React from "react";
import {Link} from "react-router-dom";
import PisButton from "../PisButton/PisButton";

function PisLinkButton(
    {
        children,
        className,
        linkProps,
        ...props
    }: PisLinkButtonProps) {
    return (
        <Link className={className} {...linkProps}>
            <PisButton
                {...props}
            >
                {children}
            </PisButton>
        </Link>
    )
}

export default PisLinkButton