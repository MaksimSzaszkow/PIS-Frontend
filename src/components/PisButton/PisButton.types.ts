import React from "react";

export type PisButtonProps = React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
}>