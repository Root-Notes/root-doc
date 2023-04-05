import { createContext, ReactNode } from "react";
import { DocumentContextType, Data } from "./types";
import React from "react";

export const DocumentContext = createContext<DocumentContextType>(null as any);

export function DocumentProvider(props: {
    children: ReactNode[] | ReactNode;
    data: Data;
    form: Data;
    onChange: (data: Data) => void;
}) {
    return (
        <DocumentContext.Provider
            value={{
                data: props.data,
                form: props.form,
                onFormChange: props.onChange,
            }}
        >
            {props.children}
        </DocumentContext.Provider>
    );
}
