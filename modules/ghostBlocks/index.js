import config from "../../config";
import { chat } from "../../utils/utils";

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

const coreCoords = [
    { x: 58, y: 125, z: 121, id: 0 },
    { x: 58, y: 124, z: 121, id: 0 },
    { x: 58, y: 123, z: 121, id: 0 },
    { x: 57, y: 125, z: 121, id: 0 },
    { x: 57, y: 124, z: 121, id: 0 },
    { x: 57, y: 123, z: 121, id: 0 },
    { x: 58, y: 125, z: 120, id: 0 },
    { x: 57, y: 125, z: 120, id: 0 },
    { x: 57, y: 124, z: 120, id: 0 },
    { x: 58, y: 124, z: 120, id: 0 },
    { x: 58, y: 123, z: 120, id: 0 },
    { x: 57, y: 123, z: 120, id: 0 },
    { x: 57, y: 123, z: 119, id: 0 },
    { x: 57, y: 124, z: 119, id: 0 },
    { x: 57, y: 125, z: 119, id: 0 },
    { x: 58, y: 125, z: 119, id: 0 },
    { x: 58, y: 124, z: 119, id: 0 },
    { x: 58, y: 123, z: 119, id: 0 },
    { x: 58, y: 123, z: 118, id: 0 },
    { x: 57, y: 123, z: 118, id: 0 },
    { x: 57, y: 124, z: 118, id: 0 },
    { x: 58, y: 124, z: 118, id: 0 },
    { x: 58, y: 125, z: 118, id: 0 },
    { x: 57, y: 125, z: 118, id: 0 },
    { x: 58, y: 125, z: 117, id: 0 },
    { x: 58, y: 124, z: 117, id: 0 },
    { x: 58, y: 123, z: 117, id: 0 },
    { x: 58, y: 122, z: 117, id: 0 },
    { x: 57, y: 114, z: 57, id: 0 },
    { x: 57, y: 114, z: 56, id: 0 },
    { x: 57, y: 115, z: 55, id: 0 },
    { x: 57, y: 114, z: 55, id: 0 },
    { x: 57, y: 116, z: 55, id: 0 },
    { x: 57, y: 116, z: 54, id: 0 },
    { x: 57, y: 115, z: 54, id: 0 },
    { x: 57, y: 114, z: 54, id: 0 },
    { x: 57, y: 116, z: 53, id: 0 },
    { x: 57, y: 115, z: 53, id: 0 },
    { x: 57, y: 114, z: 53, id: 0 },
    { x: 58, y: 123, z: 122, id: 44 },
    { x: 59, y: 123, z: 122, id: 44 },
    { x: 57, y: 114, z: 58, id: 44 },
    { x: 57, y: 114, z: 52, id: 44 },
    { x: 57, y: 123, z: 122, id: 139 },
    { x: 57, y: 124, z: 122, id: 139 },
    { x: 57, y: 125, z: 122, id: 139 },
    { x: 57, y: 126, z: 122, id: 139 },
    { x: 57, y: 123, z: 123, id: 139 },
    { x: 57, y: 124, z: 123, id: 139 },
    { x: 57, y: 125, z: 123, id: 139 },
    { x: 57, y: 126, z: 123, id: 139 },
    { x: 60, y: 124, z: 122, id: 139 },
    { x: 60, y: 126, z: 122, id: 139 },
    { x: 60, y: 125, z: 122, id: 139 },
    { x: 57, y: 115, z: 51, id: 102 },
    { x: 57, y: 116, z: 51, id: 102 },
];

ee2Coords = [

]

register('command', (args) => {
    coreCoords.forEach(coord => {
        setBlockAt(coord.x, coord.y, coord.z, coord.id);
    });
    chat('&aCore Config Setup!')
}).setName('placeConfig');

export function toggle() {
    if (config().configToggle && config().toggle) {

        return
    }

    return
}
export default { toggle };