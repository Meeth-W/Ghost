import { refresh_modules } from "./modules";
import { data } from "./utils/data";

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
    if (!Player.getHeldItem().getName().removeFormatting().includes('Pickaxe')) return;

    setBlockAt(block.getX(), block.getY(), block.getZ(), 0);
    World.playSound('note.harp', 1, 2);
    leftClick();    
});


// import PogObject from "../PogData";
// import { chat } from "./utils/utils";
// const data = new PogObject('AutoWalk', { 
//     enabled: false,
//     settings: {
//         forward: null,
//         backwards: null,
//         left: null,
//         right: null,
//         stop: null
//     }
// }, 'data.json');

// const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");

// export class Move {
//     stop() { 
//         ChatLib.chat(`&8[&0Blackdar&8] &7Detected ${data.settings.forward}: &aStopping!`); 
//         Player.getPlayer().func_70016_h(0, Player.getPlayer().field_70181_x, 0); 
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), false);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_151444_V.func_151463_i(), false);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74368_y.func_151463_i(), false);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74370_x.func_151463_i(), false);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74366_z.func_151463_i(), false);
//     }
//     sprint() {
//         ChatLib.chat(`&8[&0Blackdar&8] &7Detected ${data.settings.forward}: &aSprinting`); 
//         World.playSound('note.harp', 1, 2);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), true);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_151444_V.func_151463_i(), true);
//     };
//     back() {
//         ChatLib.chat(`&8[&0Blackdar&8] &7Detected ${data.settings.backwards}: &aRunning Back`);
//         World.playSound('note.harp', 1, 2);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74368_y.func_151463_i(), true);
//     };
//     left() {
//         ChatLib.chat(`&8[&0Blackdar&8] &7Detected ${data.settings.left}: &aLeft`);
//         World.playSound('note.harp', 1, 2);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74370_x.func_151463_i(), true);
//     };
//     right() {
//         ChatLib.chat(`&8[&0Blackdar&8] &7Detected ${data.settings.right}: &aRight`);
//         World.playSound('note.harp', 1, 2);
//         KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74366_z.func_151463_i(), true);
//     };

// }

// register('tick', () => {
//     // if ( !data.enabled ) return;

//     let standingOn = World.getBlockAt( Player.getX(), Player.getY() - 1, Player.getZ() ).type.getName().toLowerCase();
//     chat(`MetaData: ${World.getBlockAt(Player.getX(), Player.getY() - 1, Player.getZ()).getMetadata()}`)
//     chat(`ID: ${World.getBlockAt(Player.getX(), Player.getY() - 1, Player.getZ()).type.getID()}`)
//     if ( !data.enabled ) return;
//     let controls = new Move();
//     if (data.settings.forward && standingOn.includes(data.settings.forward)) { controls.sprint(); } 
//     else if (data.settings.backwards && standingOn.includes(data.settings.backwards)) { controls.back(); } 
//     else if (data.settings.left && standingOn.includes(data.settings.left)) { controls.left(); } 
//     else if (data.settings.right && standingOn.includes(data.settings.right)) { controls.right(); }
// });

// register('command', (direction, ...block) => {
//     if (!direction) {
//         data.enabled = !data.enabled;
//         data.save();
//         ChatLib.chat(`&8[&0Blackdar&8] ${data.enabled ? '&aEnabled' : '&cDisabled'}`);
//         return;
//     }

//     const blockName = block.join(' ').toLowerCase();

//     if (['forward', 'backward', 'left', 'right', 'stop', 'settings'].indexOf(direction.toLowerCase()) === -1) return ChatLib.chat(`&8[&0Blackdar&8] &7//autowalk ( forward | backward | left | right | stop | settings ) ( block_name )`);
//     if ( direction.toLowerCase() == 'settings' ) return ChatLib.chat(`&8[&0Blackdar&8] &7Current Settings:\n&7Forwards: &a${data.settings.forward}\n&7Backwards: &a${data.settings.backwards}\n&7Left: &a${data.settings.left}\n&7Right: &a${data.settings.right}\n&7Stop: &a${data.settings.stop}`)
//     if (!block) return ChatLib.chat('&8[&0Blackdar&8] &cEnter valid block name!')
    
//     switch (direction.toLowerCase()) {
//         case 'stop':
//             data.settings.stop = blockName;
//             data.save();
//             ChatLib.chat(`&8[&0Blackdar&8] &aUpdated!`);
//             break;
//         case 'forward':
//             data.settings.forward = blockName;
//             data.save();
//             ChatLib.chat(`&8[&0Blackdar&8] &aUpdated!`);
//             break;
//         case 'backward':
//             data.settings.backwards = blockName;
//             data.save();
//             ChatLib.chat(`&8[&0Blackdar&8] &aUpdated!`);
//             break;
//         case 'left':
//             data.settings.left = blockName;
//             data.save();
//             ChatLib.chat(`&8[&0Blackdar&8] &aUpdated!`);
//             break;
//         case 'right':
//             data.settings.right = blockName;
//             data.save();
//             ChatLib.chat(`&8[&0Blackdar&8] &aUpdated!`);
//             break;
//         default:
//             ChatLib.chat(`&8[&0Blackdar&8] &7Invalid direction!`);
//     }
// }).setName('/autowalk');