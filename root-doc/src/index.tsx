import { Data, RenderKit, Renderables } from "./spec/types";
import React from "react";
import { DocumentProvider } from "./DocumentContext";
import { Renderer, UtilityChildRenderer } from "./Renderer";

export function RootDoc(props: {
    kit: RenderKit;
    document: Renderables[];
    data: Data;
    form?: Data;
    onChange?: (data: Data) => void;
}) {
    return (
        <div className="root-doc-root">
            <DocumentProvider
                data={props.data}
                onChange={props.onChange ?? (() => {})}
                form={props.form ?? {}}
                kit={props.kit}
            >
                {props.document.map((v, i) => (
                    <Renderer item={v} key={i} />
                ))}
            </DocumentProvider>
        </div>
    );
}

export type { Data, Renderables };
export type * from "./spec/types";
export { UtilityChildRenderer };
