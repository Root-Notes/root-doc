import { Data, Renderables } from "./types";
import React from "react";
import { DocumentProvider } from "./DocumentContext";
import { Renderer } from "./Renderer";

export function HoardDoc(props: {
    data: Data;
    onChange: (data: Data) => void;
    document: Renderables[];
}) {
    return (
        <DocumentProvider data={props.data} onChange={props.onChange}>
            {props.document.map((v, i) => (
                <Renderer item={v} key={i} />
            ))}
        </DocumentProvider>
    );
}
