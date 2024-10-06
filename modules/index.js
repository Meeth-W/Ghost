import bloodHelper from "./bloodHelper";
import bloodSplits from "./bloodSplits";
import slotBinding from "./slotBinding";

export const modules = [
    slotBinding, bloodHelper, bloodSplits
]

export function refresh_modules() {
    modules.forEach(name => {
        name.toggle()
    })
}
export default { refresh_modules };