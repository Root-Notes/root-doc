import { get } from "lodash";
import { useContext, useEffect, useState } from "react";
import { DocumentContext } from "./DocumentContext";
import { isSimpleDataItem } from "./guards";
import { Data, DataItem } from "./types";

export function parseDataItem(data: Data, item: DataItem): any {
    if (isSimpleDataItem(item)) {
        return item;
    } else {
        switch (item.type) {
            case "data":
                const path: string = parseDataItem(data, item.path);
                return path === "" ? data : get(data, path);
        }
    }
}

export function useDataItem(item: DataItem): any {
    const [data] = useContext(DocumentContext);
    const [result, setResult] = useState<any>(parseDataItem(data, item));

    useEffect(() => {
        setResult(parseDataItem(data, item));
    }, [data, item]);
    return result;
}
