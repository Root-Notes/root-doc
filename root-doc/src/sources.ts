import { useContext, useEffect, useState } from "react";
import { parseDataItem } from "./dataParser";
import { DocumentContext } from "./DocumentContext";
import { Data, Sources } from "./types";

export function useSource(item: Sources) {
    const { data, form } = useContext(DocumentContext);

    const [iter, setIter] = useState<Data[]>([]);

    useEffect(() => {
        switch (item.type) {
            case "array":
                setIter(parseDataItem(data, form, item.array));
                break;
        }
    }, [form, data, item]);

    return iter;
}
