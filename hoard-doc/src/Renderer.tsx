import { Elements, Renderables, Sources } from "./types";
import React, { useContext } from "react";
import { useSource } from "./sources";
import { useDataItem } from "./dataParser";
import { DocumentContext, DocumentProvider } from "./DocumentContext";
import { set } from "lodash";

function RenderElement(props: { item: Elements }) {
    return <></>;
}

function RenderSource(props: { item: Sources }) {
    const [data, setData] = useContext(DocumentContext);
    const sourceData = useSource(props.item);
    const root = useDataItem(props.item.root);
    return (
        <div className="hoard-doc item source">
            {sourceData.map((v, i) => (
                <DocumentProvider
                    data={v}
                    key={i}
                    onChange={(val) => {
                        setData(set(data, `${root}[${i}]`, val));
                    }}
                >
                    {props.item.renderer.map((r, j) => (
                        <Renderer item={r} key={j} />
                    ))}
                </DocumentProvider>
            ))}
        </div>
    );
}

export function Renderer(props: { item: Renderables }) {
    if (props.item.supertype === "element") {
        return <RenderElement item={props.item} />;
    } else {
        return <RenderSource item={props.item} />;
    }
}
