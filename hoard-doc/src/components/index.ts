import { GroupRenderer } from "./GroupElement";
import { TextRenderer } from "./TextElement";
import { TextFieldRenderer } from "./TextFieldElement";

export const ComponentMap: {
    [key: string]: (props: any) => JSX.Element;
} = {
    group: GroupRenderer,
    text: TextRenderer,
    textField: TextFieldRenderer,
};
