import React from "react";
import { ElementProps, TextElement } from "../types";

export function TextRenderer(props: ElementProps<TextElement>): JSX.Element {
    return (
        <span className="hoard-doc element text">
            {props.content ? JSON.stringify(props.content) : ""}
        </span>
    );
}
