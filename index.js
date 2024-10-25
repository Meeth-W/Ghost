import config from "./config";
import { refresh_modules } from "./modules";
import { data } from "./utils/data";
import { chat } from "./utils/utils";

register('step', () => {
    if (!data.recently_closed) return;
    data.recently_closed = false;
    
    refresh_modules();
    data.save()
}).setFps(5)

refresh_modules()


// cancel pearl interaction
const items = [
    "Ender Pearl"
]

register("playerInteract", (action, pos, event) => {
    if (action.toString() !== "RIGHT_CLICK_BLOCK") return
    let itemName = Player.getHeldItem()?.getName()
    if (!itemName || !items.some(a => itemName.includes(a))) return
    cancel(event)
})

// g key
export function getBlockPosFloor(x, y, z) {
	return new BlockPos(Math.floor(x), Math.floor(y), Math.floor(z));
}
const MCBlock = Java.type("net.minecraft.block.Block");
function setBlockAt(x, y, z, id) {
	const world = World.getWorld();
	const blockPos = getBlockPosFloor(x, y, z).toMCBlock();
	world.func_175656_a(blockPos, MCBlock.func_176220_d(id));
	world.func_175689_h(blockPos);
}
function leftClick() {
    const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af", null)
    leftClickMethod.setAccessible(true);
    leftClickMethod.invoke(Client.getMinecraft(), null)
}

const gKey = new KeyBind("Ghost Blocks", Keyboard.KEY_G, "Ghost");

gKey.registerKeyPress(() => {
    const block = Player.lookingAt();
    const blockID = block?.getType()?.getID();
    if (!blockID || blockID == 54 || blockID == 397 || blockID == 0) return;

    setBlockAt(block.getX(), block.getY(), block.getZ(), 0);
    World.playSound('note.harp', 1, 2);
    leftClick();    
});
