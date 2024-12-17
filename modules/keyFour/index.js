import { renderBoxOutline } from "../../../BloomCore/RenderUtils";
import config from "../../config";
import { rightClick, smoothLook, snapTo } from "../../utils/utils";

const emBlocks = [
    { x: 68, y: 130, z: 50 }, { x: 66, y: 130, z: 50 }, { x: 64, y: 130, z: 50 },
    { x: 68, y: 128, z: 50 }, { x: 66, y: 128, z: 50 }, { x: 64, y: 128, z: 50 },
    { x: 68, y: 126, z: 50 }, { x: 66, y: 126, z: 50 }, { x: 64, y: 126, z: 50 }
]

const angles = [
    [{ y: -15, p: -9.3 }, { y: -8, p: -9.8 }],
    [{ y: -15.2, p: -2.7 }, { y: -8, p: -2.3 }],
    [{ y: -15.3, p: 4.9 }, { y: -7.5, p: 5.4 }]
]


const isNearPlate = () => Player.getY() === 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37;

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
    const rowLength = 3;
    if (col < rowLength - 1) {
        const index1 = row * rowLength + col;
        const index2 = row * rowLength + col + 1;
        return [emBlocks[index1], emBlocks[index2]];
    } else {
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
    if (!config().keyFour || !isNearPlate()) return;
    current = getNextAngle(current, 'up');
    const { y, p } = angles[current[0]][current[1]];
    World.playSound('note.pling', 1, 1);
    if (config().keyFourViewMode) {
        smoothLook(y, p, 4, () => { if (config().keyFourClickAfter) { setTimeout(() => { rightClick(); }, 100); }})
    } else {
        snapTo(y, p);
        if (config().keyFourClickAfter) { setTimeout(() => { rightClick(); }, 100); }
    }
});
downKey.registerKeyPress(() => {
    if (!config().keyFour || !isNearPlate()) return;
    current = getNextAngle(current, 'down');
    const { y, p } = angles[current[0]][current[1]];
    World.playSound('note.pling', 1, 1);
    if (config().keyFourViewMode) {
        smoothLook(y, p, 4, () => { if (config().keyFourClickAfter) { setTimeout(() => { rightClick(); }, 100); }})
    } else {
        snapTo(y, p);
        if (config().keyFourClickAfter) { setTimeout(() => { rightClick(); }, 100); }
    }
});
leftKey.registerKeyPress(() => {
    if (!config().keyFour || !isNearPlate()) return;
    current = getNextAngle(current, 'left');
    const { y, p } = angles[current[0]][current[1]];
    World.playSound('note.pling', 1, 1);
    if (config().keyFourViewMode) {
        smoothLook(y, p, 4, () => { if (config().keyFourClickAfter) { setTimeout(() => { rightClick(); }, 100); }})
    } else {
        snapTo(y, p);
        if (config().keyFourClickAfter) { setTimeout(() => { rightClick(); }, 100); }
    }
});
rightKey.registerKeyPress(() => {
    if (!config().keyFour || !isNearPlate()) return;
    current = getNextAngle(current, 'right');
    const { y, p } = angles[current[0]][current[1]];
    World.playSound('note.pling', 1, 1);
    if (config().keyFourViewMode) {
        smoothLook(y, p, 4, () => { if (config().keyFourClickAfter) { setTimeout(() => { rightClick(); }, 100); }})
    } else {
        snapTo(y, p);
        if (config().keyFourClickAfter) { setTimeout(() => { rightClick(); }, 100); }
    }
});

const renderTargets = register('renderWorld', () => {
    if (!config().keyFour || !isNearPlate()) return;

    const color = config().keyFourColor;
    const r = color[0] / 255; const g = color[1] / 255; const b = color[2] / 255;
    const [blockA, blockB] = getAdjacentBlocks(current);

    renderBoxOutline(blockA.x+0.5, blockA.y, blockA.z+0.5, 1, 1, r, g, b, 1, 1, true)
    renderBoxOutline(blockB.x+0.5, blockB.y, blockB.z+0.5, 1, 1, r, g, b, 1, 1, true)
})

export function toggle() {
    if (config().keyFour && config().toggle && config().toggleCheat) {
        renderTargets.register();
        return
    }
    renderTargets.unregister();
    return
}
export default { toggle };