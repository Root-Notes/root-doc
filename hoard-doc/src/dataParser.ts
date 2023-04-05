import { get } from "lodash";
import { useContext, useEffect, useState } from "react";
import { DocumentContext } from "./DocumentContext";
import { isSimpleDataItem } from "./guards";
import { Data, DataItem } from "./types";

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
