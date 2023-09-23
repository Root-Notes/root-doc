import {
    isArray,
    isBoolean,
    isNull,
    isNumber,
    isObjectLike,
    isString,
} from "lodash";
import {
    DataItem,
    DataItem_Complex,
    DataItem_Literal,
    ParseableFunction,
} from "./types";

export function isSimpleDataItem(obj: any): obj is DataItem_Literal {
    if (isArray(obj)) {
        return obj.every(isSimpleDataItem);
    }
    return isString(obj) || isNumber(obj) || isBoolean(obj) || isNull(obj);
}

export function isComplexDataItem(obj: any): obj is DataItem_Complex {
    return isObjectLike(obj) ? obj.supertype === "data" : false;
}

export function isDataItem(obj: any): obj is DataItem {
    return isComplexDataItem(obj) || isSimpleDataItem(obj);
}

export function isParseableFunction(obj: any): obj is ParseableFunction {
    return isObjectLike(obj) ? obj.code && obj.arguments : false;
}
