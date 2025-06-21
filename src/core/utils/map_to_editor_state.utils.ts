import { GetJotGroupResponse } from "../types/jot/get_jotGroup.types";

export default function mapToEditorState(jots: GetJotGroupResponse) {
    return jots.jots.map((jot) => ({
        id: jot.id,
        name: jot.name + '.' + jot.extension,
        content: jot.content,
    }));
}