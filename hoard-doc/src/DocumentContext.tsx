import { createContext, ReactNode } from "react";
import { DocumentContextType, Data } from "./types";
import React from "react";

export const DocumentContext = createContext<DocumentContextType>(null as any);

export function DocumentProvider(props: {
    children: ReactNode[] | ReactNode;
    data: Data;
    onChange: (data: Data) => void;
}) {
    console.log(props.data);
    return (
        <DocumentContext.Provider value={[props.data, props.onChange]}>
            {props.children}
        </DocumentContext.Provider>
    );
}
