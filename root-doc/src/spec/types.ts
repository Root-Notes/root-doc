import { Element, Field, Source, DataItem, ParseableFunction } from "../types";

export type IconDescriptor = {
    family: "md" | "gi" | "tb" | "di";
    name: string;
};

export type InformativeColors =
    | "default"
    | "success"
    | "warning"
    | "error"
    | "info";

// Structural Elements

export interface Box extends Element {
    type: "box";
    children?: Renderables[];
}

export interface Column extends Element {
    type: "column";
    spacing?: DataItem;
    children?: Renderables[];
}

export interface Row extends Element {
    type: "row";
    spacing?: DataItem;
    children?: Renderables[];
}

export interface Grid extends Element {
    type: "grid";
    horizontalSpacing?: DataItem;
    verticalSpacing?: DataItem;
    columns?: DataItem;
    children?: Renderables[];
}

export interface Paper extends Element {
    type: "paper";
    children?: Renderables[];
}

export interface Accordion extends Element {
    type: "accordion";
    title?: DataItem;
    icon?: IconDescriptor;
    children?: Renderables[];
}

export interface ScrollArea extends Element {
    type: "scrollArea";
    maxHeight?: number;
    children?: Renderables[];
}

// Decoration Elements

export interface Header extends Element {
    type: "header";
    size?: 1 | 2 | 3 | 4 | 5 | 6;
    icon?: IconDescriptor;
    content?: DataItem;
}

export interface Divider extends Element {
    type: "divider";
    variant?: "dashed" | "dotted" | "solid";
    labelText?: DataItem;
    labelIcon?: IconDescriptor;
    labelPosition?: "left" | "center" | "right";
}

export interface Alert extends Element {
    type: "alert";
    color?: InformativeColors;
    icon?: IconDescriptor;
    title?: DataItem;
    children?: Renderables[];
}

export interface TextBlock extends Element {
    type: "text";
    content: DataItem;
}

export interface LabelledGroup extends Element {
    type: "labelledGroup";
    label?: DataItem;
    variant?: "default" | "filled" | "unstyled";
    children?: Renderables[];
}

// Fields

export interface BooleanField extends Field {
    type: "booleanField";
    variant?: "switch" | "check";
    label?: DataItem;
    description?: DataItem;
    required?: boolean;
}

export interface TextField extends Field {
    type: "textField";
    label?: DataItem;
    description?: DataItem;
    icon?: IconDescriptor;
    variant?: "default" | "filled" | "unstyled";
    required?: boolean;
    placeholder?: DataItem;
}

export interface NumberField extends Field {
    type: "numberField";
    label?: DataItem;
    description?: DataItem;
    icon?: IconDescriptor;
    variant?: "default" | "filled" | "unstyled";
    required?: boolean;
    placeholder?: DataItem;
    decimals?: boolean;
    negatives?: boolean;
    decimalPrecision?: number;
    controls?: boolean;
    prefix?: DataItem;
    suffix?: DataItem;
    min?: DataItem;
    max?: DataItem;
}

// Sources

export interface ArraySource extends Source {
    type: "array";
    array: DataItem;
}

export interface FunctionSource extends Source {
    type: "function";
    function: ParseableFunction;
}

// Aggregate

export type Structural =
    | Box
    | Column
    | Row
    | Grid
    | Accordion
    | ScrollArea
    | Paper;
export type Decoration = Header | Divider | Alert | TextBlock | LabelledGroup;
export type Fields = BooleanField | TextField | NumberField;
export type Sources = ArraySource | FunctionSource;
export type Elements = Structural | Decoration | Fields;
export type Renderables = Sources | Elements;

// Utility types

export type ElementProps<T> = Omit<T, "type" | "supertype">;
export type FieldProps<T> = ElementProps<T> & {
    value: any;
    onChange: (value: any) => void;
};

export type RenderKeys = Pick<Elements, "type">;
export type RenderKit = Partial<{
    [property in RenderKeys["type"]]: (props: any) => JSX.Element;
}>;

export type Data = { [key: string]: any };
export type DocumentContextType = {
    data: Data;
    form: Data;
    onFormChange: (data: Data) => void;
    kit: RenderKit;
};
