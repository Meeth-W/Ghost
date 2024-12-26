import config from "../../config";
import equipmentHelper from "../../utils/equipment";
import { chat } from "../../utils/utils";

register('command', (...args) => {
    if (!config().equipToggle || !config().toggleCheat) return chat(`&cCurrently Disabled!`)
    const argsString = args.join(" ");
    equipmentHelper.swap(argsString);
}).setName('equip');

const handleAuto = register('chat', (event) => {
    const message = ChatLib.getChatMessage(event, false);
    if (message === "Your Phoenix Pet saved you from certain death!") {
        const item = config().equipOnPhoenix;
        if (item) equipmentHelper.swap(item);
    } else if (message === "Second Wind Activated! Your Spirit Mask saved your life!") {
        const item = config().equipOnSpirit;
        if (item) equipmentHelper.swap(item);
    } else if (message === "Your ⚚ Bonzo's Mask saved your life!") {
        const item = config().equipOnBonzo;
        if (item) equipmentHelper.swap(item);
    } else if (message.startsWith("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!")) {
        const item = config().equipOnBoss;
        if (item) equipmentHelper.swap(item);
    }
}).unregister();

export function toggle() {
    if (config().equipToggle && config().toggle && config().toggleCheat) {
        if (config().equipAuto) handleAuto.register();
        return
    }
    handleAuto.unregister();
    return
}
export default { toggle };