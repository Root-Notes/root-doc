import React, { useState } from "react";
import "./App.css";
import { Data, HoardDoc, Renderables } from "hoard-doc";

const TEST_DOC_1: Renderables[] = [
    {
        supertype: "element",
        type: "text",
        content: "Test",
    },
];

const TEST_DOC_2: Renderables[] = [
    {
        supertype: "element",
        type: "text",
        content: {
            supertype: "data",
            type: "data",
            path: "test",
        },
    },
];
const TEST_DATA_2: Data = {
    test: "EEEEEEEE",
};

const TEST_DOC_3: Renderables[] = [
    {
        supertype: "source",
        type: "array",
        renderer: [
            {
                supertype: "element",
                type: "text",
                content: {
                    supertype: "data",
                    type: "data",
                    path: "",
                },
            },
        ],
        root: "index",
        array: [1, 2, 3, 4],
    },
];

const TD4: Renderables[] = [
    {
        supertype: "source",
        type: "array",
        renderer: [
            {
                supertype: "element",
                type: "textField",
                field: "test2",
            },
        ],
        array: [1, 2, 3, 4],
        root: "output",
    },
    {
        supertype: "element",
        type: "text",
        content: {
            supertype: "data",
            type: "form",
            field: "output",
        },
    },
];

function App() {
    const [d, setD] = useState<any>({ output: [] });
    console.log(d);
    return (
        <div className="App">
            <HoardDoc document={TD4} data={{}} form={d} onChange={setD} />
        </div>
    );
}

export default App;
