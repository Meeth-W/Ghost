import config from "../../config";
import { chat, dragInfo, getClass, getTruePower } from "../../utils/utils";

let scanParticles = false;
let currDragons = [null, null]
let displayText = null
export let prioDrag = null;

let ticks 

const tickCounter = register("packetReceived", () => {
    ticks--
    if (ticks == config().sprayTick && config().toggleAutoP5 && config().cheatToggle && !(getClass() == "Archer" || getClass() == "Berserk") && config().toggleSpray) {
        doSpray();
    }
    if (ticks <= 0) tickCounter.unregister()
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister()


let mageTeam = false
let soulSpawn = false
let healer = false
let tank = false

// Functions
function isEasySplit() { return (currDragons[0].easy && currDragons[1].easy) }
function checkBlockPos(x, y, z) {
    if (!(y >= 14 && y <= 19)) return
    if (x >= 27 && x <= 32) {
        if (z == 59) {
            if (!(dragInfo.POWER.spawned)) {
                dragInfo.POWER.spawned = true
                assignDrag(dragInfo.POWER)
                ticks = 100
                tickCounter.register()
                setTimeout(() => {
                    dragInfo.POWER.spawned = false
                }, 8000)
            }
        } else if (z == 94) {
            if (!(dragInfo.APEX.spawned)) {
                dragInfo.APEX.spawned = true
                assignDrag(dragInfo.APEX)
                ticks = 100
                tickCounter.register()
                setTimeout(() => {
                    dragInfo.APEX.spawned = false
                }, 8000)
            }
        }
    } else if (x >= 79 && x <= 85) {
        if (z == 94) {
            if (!(dragInfo.ICE.spawned)) {
                dragInfo.ICE.spawned = true
                assignDrag(dragInfo.ICE)
                ticks = 100
                tickCounter.register()
                setTimeout(() => {
                    dragInfo.ICE.spawned = false
                }, 8000)
            }
        } else if (z == 56) {
            if (!(dragInfo.FLAME.spawned)) {
                dragInfo.FLAME.spawned = true
                assignDrag(dragInfo.FLAME)
                ticks = 100
                tickCounter.register()
                setTimeout(() => {
                    dragInfo.FLAME.spawned = false
                }, 8000)
            }
        }
    } else if (x == 56) {
        if (!(dragInfo.SOUL.spawned)) {
            dragInfo.SOUL.spawned = true
            purpleSpawn = true
            assignDrag(dragInfo.SOUL)
            ticks = 100
            tickCounter.register()
            setTimeout(() => {
                dragInfo.SOUL.spawned = false
            }, 8000)
        }
    }
}
function assignDrag(drag) {
    if (currDragons[0] == null) {
        currDragons[0] = drag
    } else if (currDragons[1] == null) {
        currDragons[1] = drag
        determinePrio()
    }
    else if (config().showSingleDragons) {
        displayText = `${drag.dragString} Dragon`
    }
}
function determinePrio() {
    let normalDrag = (currDragons[0].prio[0] < currDragons[1].prio[0] ? currDragons[0] : currDragons[1])
    let truePower = getTruePower()
    let split = 0
    if (truePower >= config().splitPower) {
        split = 1
    } else if (isEasySplit() && truePower >= config().easyPower) {
        split = 1
    }
    if (currDragons[0].prio[split] < currDragons[1].prio[split]) {
        bersDrag = currDragons[0]
        archDrag = currDragons[1]
    } else {
        bersDrag = currDragons[1]
        archDrag = currDragons[0]
    }
    displayDragon(bersDrag, archDrag, normalDrag, split)
}
function displayDragon(bersDrag, archDrag, normalDrag, split) {
    if (split) {
        if ((mageTeam) || (soulSpawn && ((healer && config().healerPurp == 1) || (tank && config().tankPurp == 1)))) {
            displayText = `${bersDrag.dragString} Dragon`
        } else {
            displayText = `${archDrag.dragString} Dragon`
        }
    } else {
        displayText = `${normalDrag.dragString} Dragon`
    }
}

// Registers
const handleStart = register('chat', () => {
    currDragons = [null, null]
    soulSpawn = false
    mageTeam = false
    healer = false
    tank = false
    dragInfo.POWER.spawned = false
    dragInfo.FLAME.spawned = false
    dragInfo.ICE.spawned = false
    dragInfo.SOUL.spawned = false
    dragInfo.APEX.spawned = false

    let selectedClass = getClass()

    if (selectedClass[0] == 'B' || selectedClass[0] == 'M') {
        mageTeam = true
    } else if (selectedClass[0] == 'H') {
        healer = true
        if (config().healerNormal == 1) { mageTeam = true }
    } else if (selectedClass[0] == 'T') {
        tank = true
        if (config().tankNormal == 1) { mageTeam = true }
    } else { mageTeam = false }

    scanParticles = true;

    doSplit = true;
}).setCriteria(/(.+)&r&a picked the &r&cCorrupted Blue Relic&r&a!&r/).unregister();

const handleParticles = register("packetReceived", (packet) => {
    if (scanParticles && packet.func_179749_a().toString() == "ENCHANTMENT_TABLE") {
        checkBlockPos(parseInt(packet.func_149220_d()), parseInt(packet.func_149226_e()), parseInt(packet.func_149225_f()))
    }
}).setFilteredClass(net.minecraft.network.play.server.S2APacketParticles).unregister();

const handleRender = register('renderOverlay', () => {
    if (ticks > 0) {
        const displayColor = (ticks > 60)? "&a" : (ticks > 20)? "&e": "&c";
        if (ticks > 50) Client.Companion.showTitle((displayText)? displayText: " ", `&7Spawn in ${displayColor}${(ticks/20).toFixed(2)}`, 0, 2, 0)
        else Client.Companion.showTitle(" ", `&7Spawns in ${displayColor}${(ticks/20).toFixed(2)}`, 0, 2, 0)
    }
})

const dragSpawnChecker = register(Java.type("net.minecraftforge.event.entity.EntityJoinWorldEvent"), (event) => {
    const entity = new Entity(event.entity)
    if (entity.getClassName() === "EntityDragon") {
        displayText = null
    }
}).unregister();

register('worldLoad', () => {
    scanParticles = false
})

export function toggle() {
    if (config().dragPrioToggle && config().toggle) {
        handleStart.register()
        handleParticles.register()
        handleRender.register()
        dragSpawnChecker.register()
        return
    }
    handleStart.unregister()
    handleParticles.unregister()
    handleRender.unregister()
    dragSpawnChecker.unregister()
    return
}
export default { toggle };