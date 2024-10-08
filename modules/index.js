import bloodHelper from "./bloodHelper";
import bloodSplits from "./bloodSplits";
import dragPrio from "./dragPrio";
import partyFinder from "./partyFinder";
import positionalMessages from "./positionalMessages";
import slotBinding from "./slotBinding";
import timers from "./timers";

export const modules = [
    slotBinding, bloodHelper, bloodSplits, timers, positionalMessages, dragPrio, partyFinder
]

export function refresh_modules() {
    modules.forEach(name => {
        name.toggle()
    })
}
export default { refresh_modules };