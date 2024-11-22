import bloodHelper from "./bloodHelper";
import bloodSplits from "./bloodSplits";
import dragPrio from "./dragPrio";
import ghostBlocks from "./ghostBlocks";
import keyFour from "./keyFour";
import lowballing from "./lowballing";
import mobESP from "./mobESP";
import partyFinder from "./partyFinder";
import positionalMessages from "./positionalMessages";
import slotBinding from "./slotBinding";
import timers from "./timers";

export const modules = [
    slotBinding, bloodHelper, bloodSplits, timers, positionalMessages, dragPrio, partyFinder, ghostBlocks, lowballing, mobESP, keyFour
]

export function refresh_modules() {
    modules.forEach(name => {
        name.toggle()
    })
}
export default { refresh_modules };