import config from "../config";
import { data } from "./data";

export const prefix = "§8[&6Ghost&8]§7"
/**
 * Sends a chat message with the mod prefix.
 * @param {*} message String Text
 * @param {*} chatLineID Integer ID
 * @returns 
 */
export const chat = (message, chatLineID = null) => {
    if (!chatLineID) return new Message(new TextComponent(`${prefix} ${message}`).setHover('show_text', `&7bOoOo`)).chat();
    return new Message(new TextComponent(`${prefix} ${message}`).setHover('show_text', `&7bOoOo`)).setChatLineId(chatLineID).chat();
}

const Color = Java.type("java.awt.Color");
/**
 * Returns a java Color Instance
 * @param {Array} values [Red, Green, Blue, Alpha]
 * @returns java.awt.Color
 */
export function getColor(values) {
    return new Color(Renderer.color(values[0], values[1], values[2], values[3]))
}

/** 
 * x, y coords of a slot
 * @param {int} i Integer
 * @returns
*/
export function getSlotCoords(i) {
    if (i >= Player.getContainer().getSize()) return [0, 0];

    const gui = Client.currentGui.get();
    const slot = gui.field_147002_h?.func_75139_a(i);
    const x = slot.field_75223_e + gui?.getGuiLeft() ?? 0;
    const y = slot.field_75221_f + gui?.getGuiTop() ?? 0;

    return [x, y];
}

/**
 * Returns true if player is in a dungeon instance
 * @returns Boolean
 */
export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { chat(`&cError: ${e.reason}`) }
}

/**
 * Returns the selected slot binding preset from the config.
 * @returns Integer
 */
export function getPreset() {
    if (!config().slotBindingautoSelect) return config().slotBindingPreset
    if (!isInDungeon()) return config().slotBindingPreset

    let selectedClass = getClass()
    if (selectedClass == "Mage") return 0
    else if (selectedClass == "Archer") return 1
    else if (selectedClass == "Berserk") return 2
    else if (selectedClass == "Healer") return 3
    else if (selectedClass == "Tank") return 4
    else return config().slotBindingPreset
}

/**
 * Correct Color for the selected slotbinding preset
 * @returns Renderer.Color
 */
export function getDynamicColor() {
    if (!config().slotBindingdynamicColoring) return getColor(config().slotBindingdefaultColor).getRGB()
    
    let preset = getPreset()
    if (preset == 0) return Renderer.AQUA
    else if (preset == 1) return Renderer.GOLD
    else if (preset == 2) return Renderer.RED
    else if (preset == 3) return Renderer.LIGHT_PURPLE
    else if (preset == 4) return Renderer.DARK_GREEN
    else return getColor(config().slotBindingdefaultColor).getRGB()
}

/**
 * Returns the currently selected dungeon class
 * @returns String
 */
export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
}

const blessings = {
    power: /Blessing of Power (.+)/,
    time: /Blessing of Time (.+)/,
}
const romanHash = {
    I: 1,
    V: 5,
    X: 10,
}
export function roundToHalf(number) {
    const rounded = Math.round(number * 2) / 2
    return Number.isInteger(rounded) ? Math.floor(rounded) : rounded
}

function romanToInt(s) {
    let accumulator = 0
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'I' && (s[i + 1] === 'V' || s[i + 1] === 'X')) {
            accumulator += romanHash[s[i + 1]] - romanHash[s[i]]
            i++
        } else {
            accumulator += romanHash[s[i]]
        }
    }
    return accumulator
}
export function getPower() {
    let footer = TabList?.getFooter()?.removeFormatting()
    return footer.match(blessings.power) ? romanToInt(footer.match(blessings.power)[1]) : 0
}

export function getTime() {
    let footer = TabList?.getFooter()?.removeFormatting()
    return footer.match(blessings.time) ? romanToInt(footer.match(blessings.time)[1]) : 0
}

/**
 * Returns the true power blessing.
 * @returns Float
 */
export function getTruePower() { return getPower() + getTime() / 2 }

/**
 * Dragon Info. 
 * Modified from Bxsy & Tbones Drag Prio
 */
export const dragInfo = {
    POWER: { dragString: "§c§lRed", prio: [1, 3], spawned: false, easy: false, time: 2500, name: 'red' },
    FLAME: { dragString: "§6§lOrange", prio: [2, 1], spawned: false, easy: true, time: 3080, name: 'orange' },
    ICE: { dragString: "§b§lBlue", prio: [3, 4], spawned: false, easy: false, time: 1920, name: 'blue' },
    SOUL: { dragString: "§5§lPurple", prio: [4, 5], spawned: false, easy: true, time: 2000, name: 'purple' },
    APEX: { dragString: "§a§lGreen", prio: [5, 2], spawned: false, easy: true, time: 2600, name: 'green' },
}

/**
 * Returns wether the player is in range of a set of coords
 * @param {messagesSent} arr MessagesSent Subarray!
 * @returns Boolean
 */
export const inRange = (arr) => {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    if (x > arr[1][0] && x <= arr[1][1]) {
        if (y > arr[2][0] && y <= arr[2][1]) {
            if (z > arr[3][0] && z <= arr[3][1]) {
                return true
            }
        }
    }
    return false
}
