import { useContext, useEffect, useState } from "react";
import { parseDataItem, parseFunction } from "./dataParser";
import { DocumentContext } from "./DocumentContext";
import { Data, Sources } from "./spec/types";

export function useSource(item: Sources) {
    const { data, form } = useContext(DocumentContext);

    const [iter, setIter] = useState<Data[]>([]);

    useEffect(() => {
        switch (item.type) {
            case "array":
                setIter(parseDataItem(data, form, item.array));
                break;
            case "function":
                setIter(parseFunction(item.function, data, form) ?? []);
                break;
        }
    }, [form, data, item]);

    return iter;
}
