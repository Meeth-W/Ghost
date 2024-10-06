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
    if (!chatLineID) return new Message(new TextComponent(`${prefix} ${message}`).setHover('show_text', `&7bOoOo`));
    return new Message(new TextComponent(`${prefix} ${message}`).setHover('show_text', `&7bOoOo`)).setChatLineId(chatLineID)
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