import { renderBoxOutline } from "../../../BloomCore/RenderUtils";
import config from "../../config";
import { chat } from "../../utils/utils";

const emBlocks = [
    { x: 68, y: 130, z: 50 }, { x: 66, y: 130, z: 50 }, { x: 64, y: 130, z: 50 }, // Top row (g, h, i)
    { x: 68, y: 128, z: 50 }, { x: 66, y: 128, z: 50 }, { x: 64, y: 128, z: 50 }, // Middle row (d, e, f)
    { x: 68, y: 126, z: 50 }, { x: 66, y: 126, z: 50 }, { x: 64, y: 126, z: 50 }
]

const angles = [
    [{ y: -15, p: -9.3 }, { y: -8, p: -9.8 }],
    [{ y: -15.2, p: -2.7 }, { y: -8, p: -2.3 }],
    [{ y: -15.3, p: 4.9 }, { y: -7.5, p: 5.4 }]
]

export const setYaw = (yaw) => Player.getPlayer().field_70177_z = yaw
export const setPitch = (pitch) => Player.getPlayer().field_70125_A = pitch
export function snapTo(yaw, pitch) {
    const player = Player.getPlayer();
    player.field_70177_z = yaw
    player.field_70125_A = pitch;
}
export function rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
    rightClickMethod.setAccessible(true);
    rightClickMethod.invoke(Client.getMinecraft(), null);
}


function getNextAngle(current, key_pressed) {
    const [row, col] = current;
    switch (key_pressed) {
        case 'right': return col < angles[row].length - 1 ? [row, col + 1] : current;
        case 'left': return col > 0 ? [row, col - 1] : current;
        case 'down': return row < angles.length - 1 ? [row + 1, col] : current;
        case 'up': return row > 0 ? [row - 1, col] : current;
        default: return current;
    }
}
function getAdjacentBlocks(current) {
    const [row, col] = current;
    const rowLength = 3;  // Grid has 3 columns

    // Define adjacent blocks based on the current position
    if (col < rowLength - 1) {
        // If not in the last column, return the current and next block horizontally
        const index1 = row * rowLength + col;
        const index2 = row * rowLength + col + 1;
        return [emBlocks[index1], emBlocks[index2]];
    } else {
        // If in the last column, return the current block twice (no adjacent block on the right)
        const index = row * rowLength + col;
        return [emBlocks[index], emBlocks[index]];
    }
}

const upKey = new KeyBind("Traverse Up", Keyboard.KEY_UP, "Ghost");
const downKey = new KeyBind("Traverse Down", Keyboard.KEY_DOWN, "Ghost");
const leftKey = new KeyBind("Traverse Left", Keyboard.KEY_LEFT, "Ghost");
const rightKey = new KeyBind("Traverse Right", Keyboard.KEY_RIGHT, "Ghost");

let current = [0, 0]

upKey.registerKeyPress(() => {
    current = getNextAngle(current, 'up');
    const { y, p } = angles[current[0]][current[1]];
    snapTo(y, p);
});
downKey.registerKeyPress(() => {
    current = getNextAngle(current, 'down');
    const { y, p } = angles[current[0]][current[1]];
    snapTo(y, p);
});
leftKey.registerKeyPress(() => {
    current = getNextAngle(current, 'left');
    const { y, p } = angles[current[0]][current[1]];
    snapTo(y, p);
});
rightKey.registerKeyPress(() => {
    current = getNextAngle(current, 'right');
    const { y, p } = angles[current[0]][current[1]];
    snapTo(y, p);
});

const renderTargets = register('renderWorld', () => {
    const color = config().keyFourColor;
    const r = color[0] / 255;
    const g = color[1] / 255;
    const b = color[2] / 255;

    const [blockA, blockB] = getAdjacentBlocks(current);
    renderBoxOutline(blockA.x, blockA.y, blockA.z, 1, 1, r, g, b, 1, 1, true)
    renderBoxOutline(blockB.x, blockB.y, blockB.z, 1, 1, r, g, b, 1, 1, true)
})

export function toggle() {
    if (config() && config().toggle) {

        return
    }

    return
}
export default { toggle };