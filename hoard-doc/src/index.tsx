import { createContext, ReactNode } from "react";
import { Data, DocumentContextType } from "./types";
import React from "react";

const DocumentContext = createContext<DocumentContextType>(null as any);

function DocumentProvider(props: {
    children: ReactNode[] | ReactNode;
    data: Data;
    onChange: (data: Data) => void;
}) {
    return (
        <DocumentContext.Provider value={[props.data, props.onChange]}>
            {props.children};
        </DocumentContext.Provider>
    );
}

export function HoardDoc(props: {
    data: Data;
    onChange: (data: Data) => void;
}) {
    return (
        <DocumentProvider data={props.data} onChange={props.onChange}>
            <></>
        </DocumentProvider>
    );
}
