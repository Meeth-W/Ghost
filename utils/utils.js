import Dungeon from "../../BloomCore/dungeons/Dungeon";
import config from "../config";

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
 * @returns Integerfor
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

/**
 * Capitalize a string.
 * @param {String} str String to modify
 * @returns String
 */
export function capitalize(str) {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Returns an abbreviated string.
 * @param {Integer} num 
 * @returns String
 */
export function abbreviateNumber(num) {
    if (!num) return 'NULL'
    if (num >= 1e12) {
        return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 'T'; // Trillions
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';  // Billions
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';  // Millions
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k'; // Thousands
    } else {
        return num.toString();
    }
}

/**
 * Format's a number
 * @param {Number} num 
 * @returns String
 */
export function formatNumber(num) {
    if (!num) return 'NULL'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const isBetween = (number, [a, b]) => number >= a && number <= b
const sbLevelsPrefix = {
    "&7": [1, 39],
    "&f": [40, 79],
    "&e": [80, 119],
    "&a": [120, 159],
    "&2": [160, 199],
    "&b": [200, 239],
    "&3": [240, 279],
    "&9": [280, 319],
    "&d": [320, 359],
    "&5": [360, 399],
    "&6": [400, 439],
    "&c": [440, 479]
}
/**
 * Gets the skyblock level color
 * @param {Number} number Skyblock Level
 * @returns String
 */
export const getSbLevelPrefix = (number) => Object.keys(sbLevelsPrefix).filter(pref => isBetween(number, sbLevelsPrefix[pref]))

export function getBlockPosFloor(x, y, z) {
    return new BlockPos(Math.floor(x), Math.floor(y), Math.floor(z));
}
const MCBlock = Java.type("net.minecraft.block.Block");
/**
 * Places a ghost block in the world.
 * @param {*} x X Coords
 * @param {*} y Y Coords
 * @param {*} z Z Coords
 * @param {*} id Minecraft Block ID
 */
export function setBlockAt(x, y, z, id) {
    const world = World.getWorld();
    const blockPos = getBlockPosFloor(x, y, z).toMCBlock();
    world.func_175656_a(blockPos, MCBlock.func_176220_d(id));
    world.func_175689_h(blockPos);
}

/**
 * Returns eye position of the player
 * @returns {x, y, z}
 */
export function getEyePos() {
    return {
        x: Player.getX(),
        y: Player.getY() + Player.getPlayer().func_70047_e(),
        z: Player.getZ()
    };
}

/**
 * Sets players yaw and pitch
 * @param {float} yaw 
 * @param {float} pitch 
 */
export function snapTo(yaw, pitch) {
    const player = Player.getPlayer();

    player.field_70177_z = yaw
    player.field_70125_A = pitch;
}

/**
 * Calculates yaw and pitch to a certain block.
 * @param {*} blcPos 
 * @param {*} plrPos 
 * @returns [yaw, pitch]
 */
export function calcYawPitch(blcPos, plrPos) {
    if (!plrPos) plrPos = getEyePos();
    let d = {
        x: blcPos.x - plrPos.x,
        y: blcPos.y - plrPos.y,
        z: blcPos.z - plrPos.z
    };
    let yaw = 0;
    let pitch = 0;
    if (d.x != 0) {
        if (d.x < 0) { yaw = 1.5 * Math.PI; } else { yaw = 0.5 * Math.PI; }
        yaw = yaw - Math.atan(d.z / d.x);
    } else if (d.z < 0) { yaw = Math.PI; }
    d.xz = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.z, 2));
    pitch = -Math.atan(d.y / d.xz);
    yaw = -yaw * 180 / Math.PI;
    pitch = pitch * 180 / Math.PI;
    if (pitch < -90 || pitch > 90 || isNaN(yaw) || isNaN(pitch) || yaw == null || pitch == null || yaw == undefined || pitch == null) return;

    return [yaw, pitch]
}

/**
 * Triggers Left Click!
 */
export function leftClick() {
    const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af", null)
    leftClickMethod.setAccessible(true);
    leftClickMethod.invoke(Client.getMinecraft(), null)
}

/**
 * Triggers Right Click!
 */
export function rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
    rightClickMethod.setAccessible(true);
    rightClickMethod.invoke(Client.getMinecraft(), null);
}


function normalizeYaw(yaw) {
    yaw = yaw % 360;
    if (yaw > 180) {
        yaw -= 360;
    } else if (yaw < -180) {
        yaw += 360;
    }
    return yaw;
}
/**
 * Smoothly rotates to a certain angle.
 * @param {*} targetYaw 
 * @param {*} targetPitch 
 * @param {*} bonusSteps 
 * @param {*} done 
 */
export const smoothLook = (targetYaw, targetPitch, bonusSteps, done) => {
    const totalSteps = 0 + bonusSteps;
    let currentStep = 0;

    if (targetPitch > 90) {
        targetPitch = 90;
    }
    if (targetPitch < -90) {
        targetPitch = -90;
    }

    const smoothLook_ = register('step', () => {
        const curYaw = normalizeYaw(Player.getYaw());
        const curPitch = Player.getPitch();

        const yawDifference = normalizeYaw(targetYaw - curYaw);
        const pitchDifference = targetPitch - curPitch;

        const yawStep = yawDifference / totalSteps;
        const pitchStep = pitchDifference / totalSteps;

        if (currentStep < totalSteps) {
            snapTo(normalizeYaw(curYaw + yawStep), curPitch + pitchStep)
            currentStep++;
        } else {
            snapTo(targetYaw, targetPitch)
            if (done) done()
            smoothLook_.unregister();
        }
    });
};


export const setYaw = (yaw) => Player.getPlayer().field_70177_z = yaw
export const setPitch = (pitch) => Player.getPlayer().field_70125_A = pitch

/**
 * Checks if player is in a 3d space
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} z1 
 * @param {*} x2 
 * @param {*} y2 
 * @param {*} z2 
 * @returns 
 */
export function isPlayerInBox(x1, y1, z1, x2, y2, z2) {
    const x = Player.getX();
    const y = Player.getY();
    const z = Player.getZ();

    return (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) &&
            y >= Math.min(y1, y2) && y <= Math.max(y1, y2) &&
            z >= Math.min(z1, z2) && z <= Math.max(z1, z2));
}


/**
 * Returns the current phase in the m7 boss fight!
 * @returns {number} 
 */
export function getPhase() {
    // if (!isInDungeon()) return null;
    if (Player.getY() > 220) return 1
    else if (Player.getY() > 162) return 2
    else if (Player.getY() > 100) {
        if (isPlayerInBox(113, 160, 48, 89, 100, 122)) return 3.1
        else if (isPlayerInBox(91, 160, 145, 19, 100, 121)) return 3.2
        else if (isPlayerInBox(-6, 160, 123, 19, 100, 50)) return 3.3
        else if (isPlayerInBox(17, 160, 27, 90, 100, 50)) return 3.4
        else return 3.5
    } else if (Player.getY() > 55) return 4
    else if (Player.getY() > 0) return 5
}


/**
 * Returns the item id of the held item
 * @returns {string}
 */
export function getHeldItemID() {
    const item = Player.getHeldItem();
    const itemId = item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id");
    return itemId;
}


/**
 * Returns the ign's of all the classes!
 * @returns {dict}
 */
export function getClasses() {
    const party = Dungeon.playerClasses;

    let classes = {"Mage": null, "Archer": null, "Tank": null, "Berserk": null, "Healer": null};
    for (let ign in party) { classes[party[ign].class] = ign; }
    return classes;
}

let InBoss = false;
let InP3 = false;

let BossEntryMessage = [
    "[BOSS] Bonzo: Gratz for making it this far, but I'm basically unbeatable.",
    "[BOSS] Scarf: This is where the journey ends for you, Adventurers.",
    "[BOSS] The Professor: I was burdened with terrible news recently...",
    "[BOSS] Thorn: Welcome Adventurers! I am Thorn, the Spirit! And host of the Vegan Trials!",
    "[BOSS] Livid: Welcome, you've arrived right on time. I am Livid, the Master of Shadows.",
    "[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!",
    "[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!"
]
const handleChat = register('chat', (event) => {
    const message = ChatLib.getChatMessage(event, false)
    if (BossEntryMessage.some(bossMessage => message.includes(bossMessage))) {
        InBoss = true;
    }
    if (['[BOSS] Goldor: Who dares trespass into my domain?', '[BOSS] Goldor: But you have nowhere to hide anymore!'].some(bossMessage => message.includes(bossMessage))) {
        InP3 = true;
    }
}).unregister();

const handleWorld = register('worldLoad', () => {
    InBoss = false;
    InP3 = false;
});

// These registers are always on :pray: sorryidk a work around man
handleChat.register();
handleWorld.register();

export const isInBoss = () => { return InBoss }
export const isInP3 = () => { return InP3 }