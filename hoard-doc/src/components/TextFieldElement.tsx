import React from "react";
import { FieldProps, TextField } from "../types";

export function TextFieldRenderer(props: FieldProps<TextField>): JSX.Element {
    return (
        <input
            placeholder={props.placeholder as string}
            value={props.value ?? ""}
            onChange={(e) => {
                props.onChange(e.target.value);
            }}
            className="hoard-doc element text-field"
        />
    );
}
