import { GroupRenderer } from "./GroupElement";
import { TextRenderer } from "./TextElement";

export const ComponentMap: {
    [key: string]: (props: any) => JSX.Element;
} = {
    group: GroupRenderer,
    text: TextRenderer,
};
