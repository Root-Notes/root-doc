import { ElementProps, GroupElement } from "../types";
import React from "react";

export function GroupRenderer(props: ElementProps<GroupElement>): JSX.Element {
    return <div className="hoard-doc element group">{props.children}</div>;
}
