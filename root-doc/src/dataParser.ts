import { get } from "lodash";
import { useContext, useEffect, useMemo, useState } from "react";
import { DocumentContext } from "./DocumentContext";
import { isSimpleDataItem } from "./guards";
import { DataItem, ParseableFunction } from "./types";
import { Data } from "./spec/types";

export function parseDataItem(data: Data, formData: Data, item: DataItem): any {
    if (isSimpleDataItem(item)) {
        return item;
    } else {
        switch (item.type) {
            case "data":
                const path: string = parseDataItem(data, formData, item.path);
                return path === "" ? data : get(data, path);
            case "form":
                const field: string = parseDataItem(data, formData, item.field);
                return field === "" ? formData : get(formData, field);
        }
    }
}

export function useDataItem(item: DataItem): any {
    const { data, form } = useContext(DocumentContext);
    const [result, setResult] = useState<any>(parseDataItem(data, form, item));

    useEffect(() => {
        setResult(parseDataItem(data, form, item));
    }, [data, item]);
    return result;
}

export function parseFunction<T = any>(
    fn: ParseableFunction,
    data: Data,
    formData: Data
): T | null {
    const exec = new Function("opts", `return (${fn.code})(opts);`);
    const args: any = {};
    for (const arg of Object.keys(fn.arguments)) {
        args[arg] = parseDataItem(data, formData, fn.arguments[arg]);
    }
    try {
        return exec(args);
    } catch (e) {
        console.warn("Error executing ParseableFunction", fn, e);
        return null;
    }
}

export function useParsedFunction<T = any>(fn: ParseableFunction): T | null {
    const { data, form } = useContext(DocumentContext);
    const result = useMemo(
        () => parseFunction(fn, data, form),
        [fn, data, form]
    );
    return result;
}
