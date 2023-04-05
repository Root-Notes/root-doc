import { Data, Renderables } from "./types";
import React from "react";
import { DocumentProvider } from "./DocumentContext";
import { Renderer } from "./Renderer";

export function HoardDoc(props: {
    document: Renderables[];
    data: Data;
    form?: Data;
    onChange?: (data: Data) => void;
}) {
    return (
        <DocumentProvider
            data={props.data}
            onChange={props.onChange ?? (() => {})}
            form={props.form ?? {}}
        >
            {props.document.map((v, i) => (
                <Renderer item={v} key={i} />
            ))}
        </DocumentProvider>
    );
}

export type { Data, Renderables };
