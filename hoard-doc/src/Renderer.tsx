import { Elements, Renderables, Sources } from "./types";
import React, { useContext, useMemo } from "react";
import { useSource } from "./sources";
import { parseDataItem, useDataItem } from "./dataParser";
import { DocumentContext, DocumentProvider } from "./DocumentContext";
import { cloneDeep, get, set } from "lodash";
import { isDataItem } from "./guards";
import { ComponentMap } from "./components";

const RAW_KEYS = ["supertype", "type", "field", "condition"];

function RenderElement(props: { item: Elements }) {
    const { data, form, onFormChange } = useContext(DocumentContext);
    const processedProps = useMemo(() => {
        const result: any = {};
        for (const key of Object.keys(props.item)) {
            if (RAW_KEYS.includes(key)) {
                result[key] = (props.item as any)[key];
            } else {
                if (isDataItem((props.item as any)[key])) {
                    result[key] = parseDataItem(
                        data,
                        form,
                        (props.item as any)[key]
                    );
                } else {
                    result[key] = (props.item as any)[key];
                }
            }
        }

        if (Object.keys(result).includes("field")) {
            result.value = get(form, result.field);
            result.onChange = (value: any) => {
                onFormChange(set({ ...form }, result.field, value));
            };
        }

        return result;
    }, [props.item, data, form]);

    const MappedElement = useMemo(
        () => ComponentMap[props.item.type] ?? ((props: any) => <></>),
        [props.item.type]
    );

    return <MappedElement {...processedProps} />;
}

function RenderSource(props: { item: Sources }) {
    const source = useSource(props.item);
    const root = useDataItem(props.item.root);
    const { form, onFormChange } = useContext(DocumentContext);
    return (
        <div className="hoard-doc source">
            {source.map((dataItem, index) => {
                return (
                    <DocumentProvider
                        data={dataItem}
                        form={form}
                        onChange={(data) => {
                            const newForm = cloneDeep(form);
                            onFormChange(
                                set(newForm, `${root}[${index}]`, data)
                            );
                        }}
                        key={index}
                    >
                        {props.item.renderer.map((r, k) => (
                            <Renderer item={r} key={k} />
                        ))}
                    </DocumentProvider>
                );
            })}
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
