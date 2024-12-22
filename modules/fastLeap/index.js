import config from "../../config";
import { chat, getClasses, getHeldItemID, getPhase, isInBoss, rightClick } from "../../utils/utils";
import leapHelper from '../../utils/leap'

export const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent")

let order = ['Mage', 'Archer', 'Berserk', 'Healer', 'Tank'];
function getLeap() {
    let target = null
    let phase = getPhase();

    if (phase == 1) { target = getClasses()[order[config().fastLeapP1]] }
    else if (phase == 2) { target = getClasses()[order[config().fastLeapP2]] }
    else if (phase == 3.1) { target = getClasses()[order[config().fastLeapP3S1]] }
    else if (phase == 3.2) { target = getClasses()[order[config().fastLeapP3S2]] } 
    else if (phase == 3.3) { target = getClasses()[order[config().fastLeapP3S3]] }
    else if (phase == 3.4) { target = getClasses()[order[config().fastLeapP3S4]] }
    else if (phase == 3.5) { target = getClasses()[order[config().fastLeapP3Core]] }
    else if (phase == 4) { target = getClasses()[order[config().fastLeapP4]] }
    else if (phase == 5) { target = getClasses()[order[config().fastLeapRelic]]}

    if (!isInBoss()) { target = getClasses()[order[config().fastLeapClear]] }
    
    if (target && target.toLowerCase() == Player.getName().toLowerCase()) target = null
    return target;
}

const handleLeap = register(MouseEvent, (event) => {
    const button = event.button;
    const state = event.buttonstate;

    if (!state) return;
    if (button !== 0) return;

    if (getHeldItemID() !== "INFINITE_SPIRIT_LEAP") return;

    World.playSound('note.pling', 1, 2)

    let leapTo = getLeap();
    if (!leapTo) return;

    cancel(event);
    rightClick();

    leapHelper.queueLeap(leapTo);
}).unregister();

const handleRender = register('renderOverlay', () => {
    if (getHeldItemID() !== "INFINITE_SPIRIT_LEAP" || !config().fastLeapGUI) return;
    let leapTo = getLeap();
    if (leapTo) {
        Client.Companion.showTitle(" ", `&7Target: &6${leapTo}`, 0, 2, 0)
    }
}).unregister();

export function toggle() {
    if (config().fastLeapToggle && config().toggle && config().toggleCheat) {
        handleLeap.register();
        if (config().fastLeapGUI) handleRender.register();
        return
    }
    handleLeap.unregister();
    handleRender.unregister();
    return
}
export default { toggle };