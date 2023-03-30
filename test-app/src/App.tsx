import React from "react";
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

function App() {
    return (
        <div className="App">
            <HoardDoc
                data={TEST_DATA_2}
                onChange={(data) => console.log(data)}
                document={TEST_DOC_3}
            />
        </div>
    );
}

export default App;
