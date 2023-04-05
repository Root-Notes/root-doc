import { Data, DataItem, Elements, Renderables, Sources } from "./types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSource } from "./sources";
import { parseDataItem, useDataItem } from "./dataParser";
import { DocumentContext, DocumentProvider } from "./DocumentContext";
import { get, isObject, isObjectLike, set } from "lodash";
import { isDataItem } from "./guards";
import { ComponentMap } from "./components";

const RAW_KEYS = ["supertype", "type", "field", "condition"];

function RenderElement(props: { item: Elements }) {
    return <></>;
}

function RenderSource(props: { item: Sources }) {
    return <></>;
}

export function Renderer(props: { item: Renderables }) {
    if (props.item.supertype === "element") {
        return <RenderElement item={props.item} />;
    } else {
        return <RenderSource item={props.item} />;
    }
}
