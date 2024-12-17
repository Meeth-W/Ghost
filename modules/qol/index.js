import config from "../../config";
import { chat, leftClick, setBlockAt } from "../../utils/utils";

const items = [
    "Ender Pearl"
]

const handleInteract = register("playerInteract", (action, pos, event) => {
    if (action.toString() !== "RIGHT_CLICK_BLOCK") return
    let itemName = Player.getHeldItem()?.getName()
    if (!itemName || !items.some(a => itemName.includes(a))) return
    World.playSound('note.pling', 1, 2)
    cancel(event)
}).unregister();

const gKey = new KeyBind("Ghost Blocks", Keyboard.KEY_NONE, "Ghost");
function onGKey() {
    if (!Player.getHeldItem().getName().removeFormatting().includes('Pickaxe') && config().qolGKeyCheck) return;

    const block = Player.lookingAt();
    const blockID = block?.getType()?.getID();
    if (!blockID || blockID == 54 || blockID == 397 || blockID == 0 || blockID == 69 || blockID == 146) return;
    setBlockAt(block.getX(), block.getY(), block.getZ(), 0);
    World.playSound('note.harp', 1, 2);
    leftClick();    
}

export function toggle() {
    if (config().qolToggle && config().toggle && config().toggleCheat) {
        if (config().qolnoInteract) handleInteract.register();
        if (config().qolGKey) gKey.registerKeyPress(onGKey);
        return
    }
    handleInteract.unregister();
    gKey.unregisterKeyPress();
    return
}
export default { toggle };