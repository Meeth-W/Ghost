import PogObject from "../../../PogData";
import config from "../../config";

export const data = new PogObject("Ghost", {
    data: []
}, 'data/autoP3.json')



export function toggle() {
    if (config().configToggle && config().toggle) {

        return
    }

    return
}
export default { toggle };