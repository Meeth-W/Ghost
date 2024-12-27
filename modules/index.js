import autoEquip from "./autoEquip";
import bloodHelper from "./bloodHelper";
import bloodSplits from "./bloodSplits";
import dragPrio from "./dragPrio";
import fastLeap from "./fastLeap";
import ghostBlocks from "./ghostBlocks";
// import keyFour from "./keyFour";
import lowballing from "./lowballing";
import mobESP from "./mobESP";
import partyFinder from "./partyFinder";
import positionalMessages from "./positionalMessages";
import qol from "./qol";
import relics from "./relics";
import slotBinding from "./slotBinding";
import timers from "./timers";

export const modules = [
    slotBinding, bloodHelper, bloodSplits, timers, positionalMessages, dragPrio, partyFinder, ghostBlocks, lowballing, mobESP, fastLeap, qol, relics, autoEquip
]

export function refresh_modules() {
    modules.forEach(name => {
        name.toggle()
    })
}
export default { refresh_modules };