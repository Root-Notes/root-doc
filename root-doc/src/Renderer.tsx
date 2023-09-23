import {
    DataItem,
    Elements,
    ParseableFunction,
    Renderables,
    Sources,
} from "./types";
import React, { useContext, useMemo } from "react";
import { useSource } from "./sources";
import { parseDataItem, parseFunction, useDataItem } from "./dataParser";
import { DocumentContext, DocumentProvider } from "./DocumentContext";
import { cloneDeep, get, set } from "lodash";
import { isDataItem, isParseableFunction } from "./guards";

const RAW_KEYS = ["supertype", "type", "field", "condition"];

function useCondition(
    condition: ParseableFunction | DataItem | undefined
): boolean {
    const { data, form } = useContext(DocumentContext);
    const result: boolean = useMemo(() => {
        if (isParseableFunction(condition)) {
            return parseFunction<boolean>(condition, data, form);
        }
        if (isDataItem(condition)) {
            return parseDataItem(data, form, condition);
        }
        return true;
    }, [condition, data, form]);
    return result;
}

function RenderElement(props: { item: Elements }) {
    const { data, form, onFormChange, kit } = useContext(DocumentContext);
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
                const newVal = set(cloneDeep(form), result.field, value);
                onFormChange(newVal);
            };
        }

        return result;
    }, [props.item, data, form]);

    const MappedElement = useMemo(
        () => kit[props.item.type] ?? ((props: any) => <></>),
        [props.item.type]
    );

    const doRender = useCondition(props.item.condition);

    return doRender ? <MappedElement {...processedProps} /> : null;
}

function RenderSource(props: { item: Sources }) {
    const source = useSource(props.item);
    const root = useDataItem(props.item.root);
    const { form, onFormChange, kit } = useContext(DocumentContext);
    return (
        <div className="hoard-doc source">
            {source.map((dataItem, index) => {
                return (
                    <DocumentProvider
                        data={dataItem}
                        form={get(cloneDeep(form), `${root}[${index}]`) ?? {}}
                        onChange={(data) => {
                            const newForm = cloneDeep(form);
                            onFormChange(
                                set(newForm, `${root}[${index}]`, data)
                            );
                        }}
                        key={index}
                        kit={kit}
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
