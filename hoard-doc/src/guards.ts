import { isArray, isBoolean, isNull, isNumber, isString } from "lodash";
import { DataItem, DataItem_Complex, DataItem_Literal } from "./types";

export function isSimpleDataItem(obj: any): obj is DataItem_Literal {
    if (isArray(obj)) {
        return obj.every(isSimpleDataItem);
    }
    return isString(obj) || isNumber(obj) || isBoolean(obj) || isNull(obj);
}

export function isComplexDataItem(obj: any): obj is DataItem_Complex {
    return obj.supertype === "data";
}

export function isDataItem(obj: any): obj is DataItem {
    return isComplexDataItem(obj) || isSimpleDataItem(obj);
}
