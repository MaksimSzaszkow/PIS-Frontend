import {PisButtonProps} from "../PisButton/PisButton.types";
import {LinkProps} from "react-router-dom";

export type PisLinkButtonProps = PisButtonProps & {
    linkProps: LinkProps
    buttonClassName?: string;
}
