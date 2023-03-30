import { Data, DataItem, Elements, Renderables, Sources } from "./types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSource } from "./sources";
import { parseDataItem, useDataItem } from "./dataParser";
import { DocumentContext, DocumentProvider } from "./DocumentContext";
import { set } from "lodash";
import { isDataItem } from "./guards";
import { ComponentMap } from "./components";

const RAW_KEYS = ["supertype", "type", "field", "condition"];

function RenderElement(props: { item: Elements }) {
    const [processed, setProcessed] = useState<any>({});
    const [data] = useContext(DocumentContext);

    function processItem(item: Elements, data: Data) {
        const proc: any = {};
        for (const k of Object.keys(item)) {
            if (RAW_KEYS.includes(k)) {
                proc[k] = item[k as keyof Elements];
            } else if (k === "children") {
                proc[k] = (
                    item[k as keyof Elements] as unknown as Renderables[]
                ).map((v, i) => <Renderer item={v} key={i} />);
            } else {
                if (isDataItem(item[k as keyof Elements])) {
                    proc[k] = parseDataItem(
                        data,
                        item[k as keyof Elements] as DataItem
                    );
                } else {
                    proc[k] = item[k as keyof Elements];
                }
            }
        }
        setProcessed(proc);
    }

    useEffect(() => processItem(props.item, data), [props.item, data]);

    const SelectedElement = useMemo(
        () => ComponentMap[props.item.type as any] ?? ((props: any) => <></>),
        [props.item]
    );

    return <SelectedElement {...processed} />;
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
