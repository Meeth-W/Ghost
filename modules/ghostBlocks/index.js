import config from "../../config";
import { chat, isInBoss, setBlockAt } from "../../utils/utils";

const coreCoords = [
    { x: 57, y: 123, z: 122, id: 139 },
    { x: 57, y: 124, z: 122, id: 139 },
    { x: 57, y: 125, z: 122, id: 139 },
    { x: 57, y: 125, z: 123, id: 139 },
    { x: 57, y: 124, z: 123, id: 139 },
    { x: 57, y: 123, z: 123, id: 139 },
    { x: 59, y: 123, z: 122, id: 44 },
    { x: 58, y: 123, z: 122, id: 44 },
    { x: 55, y: 114, z: 58, id: 44 },
    { x: 54, y: 114, z: 58, id: 44 },
    { x: 53, y: 114, z: 58, id: 44 },
    { x: 57, y: 114, z: 52, id: 44 },
    { x: 53, y: 114, z: 57, id: 0 },
    { x: 53, y: 114, z: 56, id: 0 },
    { x: 53, y: 114, z: 55, id: 0 },
    { x: 54, y: 114, z: 57, id: 0 },
    { x: 54, y: 114, z: 56, id: 0 },
    { x: 54, y: 114, z: 55, id: 0 },
    { x: 55, y: 114, z: 57, id: 0 },
    { x: 55, y: 114, z: 56, id: 0 },
    { x: 55, y: 114, z: 55, id: 0 },
    { x: 54, y: 116, z: 54, id: 0 },
    { x: 54, y: 115, z: 54, id: 0 },
    { x: 55, y: 116, z: 54, id: 0 },
    { x: 55, y: 115, z: 54, id: 0 },
    { x: 53, y: 116, z: 54, id: 0 },
    { x: 53, y: 115, z: 54, id: 0 },
    { x: 53, y: 114, z: 54, id: 0 },
    { x: 53, y: 114, z: 53, id: 0 },
    { x: 54, y: 114, z: 54, id: 0 },
    { x: 54, y: 114, z: 53, id: 0 },
    { x: 55, y: 114, z: 54, id: 0 },
    { x: 55, y: 114, z: 53, id: 0 },
    { x: 58, y: 124, z: 121, id: 0 },
    { x: 58, y: 123, z: 121, id: 0 },
    { x: 58, y: 125, z: 121, id: 0 },
    { x: 57, y: 125, z: 121, id: 0 },
    { x: 57, y: 124, z: 121, id: 0 },
    { x: 57, y: 123, z: 121, id: 0 },
    { x: 58, y: 123, z: 120, id: 0 },
    { x: 58, y: 124, z: 120, id: 0 },
    { x: 57, y: 124, z: 120, id: 0 },
    { x: 57, y: 125, z: 120, id: 0 },
    { x: 58, y: 125, z: 120, id: 0 },
    { x: 57, y: 124, z: 119, id: 0 },
    { x: 57, y: 123, z: 120, id: 0 },
    { x: 58, y: 124, z: 119, id: 0 },
    { x: 58, y: 124, z: 118, id: 0 },
    { x: 57, y: 123, z: 119, id: 0 },
    { x: 58, y: 123, z: 119, id: 0 },
    { x: 58, y: 123, z: 118, id: 0 },
    { x: 57, y: 124, z: 118, id: 0 },
    { x: 57, y: 125, z: 119, id: 0 },
    { x: 58, y: 125, z: 119, id: 0 },
    { x: 58, y: 125, z: 118, id: 0 },
    { x: 57, y: 125, z: 118, id: 0 },
    { x: 57, y: 123, z: 118, id: 0 },
    { x: 58, y: 123, z: 117, id: 0 },
    { x: 58, y: 124, z: 117, id: 0 },
    { x: 58, y: 125, z: 117, id: 0 },
];

const ee2Coords = [
    { x: 96, y: 121, z: 122, id: 0 },
    { x: 96, y: 120, z: 122, id: 0 },
    { x: 96, y: 122, z: 122, id: 0 },
    { x: 96, y: 121, z: 123, id: 0 },
    { x: 96, y: 120, z: 123, id: 0 },
    { x: 107, y: 120, z: 103, id: 20 },
    { x: 106, y: 120, z: 103, id: 20 },
    { x: 105, y: 120, z: 103, id: 20 },
    { x: 108, y: 120, z: 109, id: 20 },
    { x: 106, y: 120, z: 109, id: 20 },
    { x: 105, y: 120, z: 109, id: 20 },
    { x: 107, y: 120, z: 109, id: 20 },
    { x: 95, y: 121, z: 121, id: 20 },
    { x: 95, y: 122, z: 121, id: 20 },
    { x: 56, y: 109, z: 130, id: 20 },
    { x: 56, y: 110, z: 130, id: 20 },
    { x: 56, y: 111, z: 130, id: 20 },
    { x: 56, y: 111, z: 131, id: 20 },
    { x: 57, y: 109, z: 132, id: 20 },
    { x: 57, y: 110, z: 132, id: 20 },
    { x: 58, y: 109, z: 132, id: 20 },
    { x: 58, y: 110, z: 132, id: 20 },
    { x: 58, y: 111, z: 132, id: 20 },
    { x: 57, y: 111, z: 132, id: 20 },
    { x: 56, y: 112, z: 130, id: 20 },
    { x: 56, y: 112, z: 131, id: 20 },
    { x: 57, y: 112, z: 132, id: 20 },
    { x: 58, y: 112, z: 132, id: 20 },
    { x: 56, y: 113, z: 130, id: 20 },
    { x: 56, y: 113, z: 131, id: 20 },
    { x: 57, y: 113, z: 132, id: 20 },
    { x: 58, y: 113, z: 132, id: 20 },
    { x: 56, y: 114, z: 130, id: 20 },
    { x: 56, y: 114, z: 131, id: 20 },
    { x: 57, y: 114, z: 132, id: 20 },
    { x: 58, y: 114, z: 132, id: 20 },
    { x: 56, y: 115, z: 130, id: 20 },
    { x: 56, y: 115, z: 131, id: 20 },
    { x: 57, y: 115, z: 132, id: 20 },
    { x: 58, y: 115, z: 132, id: 20 },
    { x: 56, y: 116, z: 130, id: 20 },
    { x: 56, y: 116, z: 131, id: 20 },
    { x: 57, y: 116, z: 132, id: 20 },
    { x: 58, y: 116, z: 132, id: 20 },
    { x: 72, y: 108, z: 127, id: 20 },
    { x: 71, y: 108, z: 127, id: 20 },
    { x: 72, y: 108, z: 126, id: 20 },
    { x: 71, y: 108, z: 126, id: 20 },
    { x: 70, y: 108, z: 126, id: 20 },
    { x: 70, y: 108, z: 127, id: 20 },
    { x: 69, y: 108, z: 127, id: 20 },
    { x: 68, y: 108, z: 127, id: 20 },
    { x: 69, y: 108, z: 126, id: 20 },
    { x: 68, y: 108, z: 126, id: 20 },
    { x: 79, y: 108, z: 131, id: 20 },
    { x: 78, y: 108, z: 131, id: 20 },
    { x: 79, y: 108, z: 130, id: 20 },
    { x: 78, y: 108, z: 130, id: 20 },
    { x: 79, y: 108, z: 129, id: 20 },
    { x: 78, y: 108, z: 129, id: 20 },
    { x: 79, y: 108, z: 128, id: 20 },
    { x: 78, y: 108, z: 128, id: 20 },
    { x: 106, y: 121, z: 110, id: 102 },
    { x: 107, y: 121, z: 110, id: 102 },
    { x: 105, y: 121, z: 110, id: 102 },
    { x: 92, y: 124, z: 113, id: 102 },
    { x: 92, y: 124, z: 112, id: 102 },
    { x: 92, y: 124, z: 111, id: 102 },
    { x: 92, y: 124, z: 114, id: 102 },
    { x: 92, y: 124, z: 115, id: 102 },
    { x: 92, y: 125, z: 113, id: 102 },
    { x: 92, y: 126, z: 113, id: 102 },
    { x: 92, y: 125, z: 114, id: 102 },
    { x: 92, y: 126, z: 114, id: 102 },
    { x: 92, y: 125, z: 115, id: 102 },
    { x: 92, y: 126, z: 115, id: 102 },
    { x: 92, y: 125, z: 112, id: 102 },
    { x: 92, y: 126, z: 112, id: 102 },
    { x: 92, y: 125, z: 111, id: 102 },
    { x: 92, y: 126, z: 111, id: 102 },
    { x: 97, y: 120, z: 121, id: 102 },
    { x: 97, y: 121, z: 121, id: 102 },
    { x: 97, y: 122, z: 121, id: 102 },
    { x: 97, y: 120, z: 120, id: 102 },
    { x: 97, y: 121, z: 120, id: 102 },
    { x: 97, y: 122, z: 120, id: 102 },
    { x: 78, y: 109, z: 133, id: 102 },
    { x: 78, y: 109, z: 132, id: 102 },
    { x: 78, y: 109, z: 134, id: 102 },
    { x: 78, y: 109, z: 131, id: 102 },
    { x: 79, y: 109, z: 126, id: 102 },
    { x: 78, y: 109, z: 126, id: 102 },
    { x: 77, y: 109, z: 126, id: 102 },
    { x: 79, y: 110, z: 126, id: 102 },
    { x: 78, y: 110, z: 126, id: 102 },
    { x: 77, y: 110, z: 126, id: 102 },
    { x: 76, y: 109, z: 126, id: 102 },
    { x: 75, y: 109, z: 126, id: 102 },
    { x: 74, y: 109, z: 126, id: 102 },
];

const i4Coords = [
    { x: 91, y: 166, z: 40, id: 0 },
    { x: 91, y: 166, z: 41, id: 0 },
    { x: 91, y: 167, z: 41, id: 0 },
    { x: 91, y: 167, z: 40, id: 0 },
    { x: 92, y: 166, z: 40, id: 0 },
    { x: 92, y: 167, z: 40, id: 0 },
    { x: 92, y: 167, z: 41, id: 0 },
    { x: 92, y: 166, z: 41, id: 0 },
    { x: 93, y: 166, z: 40, id: 0 },
    { x: 93, y: 167, z: 40, id: 0 },
    { x: 93, y: 167, z: 41, id: 0 },
    { x: 93, y: 166, z: 41, id: 0 },
    { x: 94, y: 166, z: 40, id: 0 },
    { x: 94, y: 167, z: 40, id: 0 },
    { x: 94, y: 167, z: 41, id: 0 },
    { x: 94, y: 166, z: 41, id: 0 },
    { x: 95, y: 166, z: 40, id: 0 },
    { x: 95, y: 167, z: 40, id: 0 },
    { x: 95, y: 167, z: 41, id: 0 },
    { x: 95, y: 166, z: 41, id: 0 },
    { x: 92, y: 165, z: 40, id: 0 },
    { x: 93, y: 165, z: 40, id: 0 },
    { x: 94, y: 165, z: 40, id: 0 },
    { x: 92, y: 165, z: 41, id: 0 },
    { x: 93, y: 165, z: 41, id: 0 },
    { x: 94, y: 165, z: 41, id: 0 },
    { x: 95, y: 165, z: 41, id: 0 },
    { x: 95, y: 165, z: 40, id: 0 },
    { x: 88, y: 167, z: 41, id: 0 },
    { x: 89, y: 167, z: 41, id: 0 },
    { x: 90, y: 167, z: 41, id: 0 },
    { x: 91, y: 133, z: 44, id: 0 },
    { x: 91, y: 132, z: 44, id: 0 },
    { x: 91, y: 133, z: 45, id: 0 },
    { x: 91, y: 132, z: 45, id: 0 },
    { x: 90, y: 133, z: 45, id: 0 },
    { x: 90, y: 132, z: 45, id: 0 },
    { x: 90, y: 132, z: 46, id: 0 },
    { x: 90, y: 133, z: 46, id: 0 },
    { x: 89, y: 133, z: 46, id: 0 },
    { x: 89, y: 132, z: 46, id: 0 },
    { x: 91, y: 132, z: 46, id: 0 },
    { x: 91, y: 133, z: 46, id: 0 },
    { x: 69, y: 220, z: 35, id: 0 },
    { x: 92, y: 131, z: 44, id: 102 },
    { x: 92, y: 132, z: 44, id: 102 },
    { x: 92, y: 133, z: 44, id: 102 },
    { x: 93, y: 131, z: 44, id: 102 },
    { x: 93, y: 132, z: 44, id: 102 },
    { x: 93, y: 133, z: 44, id: 102 },
    { x: 92, y: 130, z: 44, id: 102 },
    { x: 93, y: 130, z: 44, id: 102 },
    { x: 92, y: 129, z: 44, id: 102 },
    { x: 92, y: 128, z: 44, id: 102 },
    { x: 93, y: 129, z: 44, id: 102 },
    { x: 93, y: 128, z: 44, id: 102 },
    { x: 92, y: 127, z: 44, id: 102 },
    { x: 93, y: 127, z: 44, id: 102 },
    { x: 92, y: 126, z: 44, id: 102 },
    { x: 93, y: 126, z: 44, id: 102 },
    { x: 92, y: 125, z: 44, id: 102 },
    { x: 93, y: 125, z: 44, id: 102 },
    { x: 92, y: 124, z: 44, id: 102 },
    { x: 93, y: 124, z: 44, id: 102 },
    { x: 92, y: 123, z: 44, id: 102 },
    { x: 93, y: 123, z: 44, id: 102 },
    { x: 92, y: 122, z: 44, id: 102 },
    { x: 92, y: 121, z: 44, id: 102 },
    { x: 93, y: 122, z: 44, id: 102 },
    { x: 93, y: 121, z: 44, id: 102 },
    { x: 92, y: 120, z: 44, id: 102 },
    { x: 93, y: 120, z: 44, id: 102 },
    { x: 92, y: 119, z: 44, id: 102 },
    { x: 93, y: 119, z: 44, id: 102 },
    { x: 92, y: 118, z: 44, id: 102 },
    { x: 93, y: 118, z: 44, id: 102 },
    { x: 92, y: 117, z: 44, id: 102 },
    { x: 93, y: 117, z: 44, id: 102 },
    { x: 92, y: 116, z: 44, id: 102 },
    { x: 93, y: 116, z: 44, id: 102 },
    { x: 92, y: 115, z: 44, id: 102 },
    { x: 93, y: 115, z: 44, id: 102 },
    { x: 69, y: 221, z: 35, id: 54 }
]
register('command', (args) => {
    if (!config().toggleCheat) return chat('&cCheats are currently disabled!')
    if (!isInBoss()) return chat(`&cNot in boss room!`)
    if (args == 'core') {
        coreCoords.forEach(coord => {
            setBlockAt(coord.x, coord.y, coord.z, coord.id);
        });
        chat('&aCore Config Setup!')
    } else if (args == 'ee2') {
        ee2Coords.forEach(coord => {
            setBlockAt(coord.x, coord.y, coord.z, coord.id);
        });
        chat('&aEE2 Config Setup!')
    } else if (args == 'i4') {
        i4Coords.forEach(coord => {
            setBlockAt(coord.x, coord.y, coord.z, coord.id);
        });
        chat('&aI4 Config Setup!')
    } else {
        chat('&cConfig Not Found.')
    }
}).setName('placeConfig');

export function toggle() {
    if (config().configToggle && config().toggle) {

        return
    }

    return
}
export default { toggle };