import config from '../../config';
import { chat } from '../../utils/utils';

const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction");

const bloodStartMessages = [
    "[BOSS] The Watcher: Things feel a little more roomy now, eh?",
    "[BOSS] The Watcher: Oh.. hello?",
    "[BOSS] The Watcher: I'm starting to get tired of seeing you around here...",
    "[BOSS] The Watcher: You've managed to scratch and claw your way here, eh?",
    "[BOSS] The Watcher: So you made it this far... interesting.",
    "[BOSS] The Watcher: Ah, we meet again...",
    "[BOSS] The Watcher: Ah, you've finally arrived.",
]

let bloodStartTime = Date.now()
let display = false
let displayText = 'Invalid'
let bloodStartTicks

const trigger = register("chat", (message) => {
    if (!bloodStartMessages.includes(message)) return
    bloodStartTime = Date.now()
    bloodStartTicks = 0
    tickCounter.register();
}).setCriteria("${message}").unregister();

const tickCounter = register('packetReceived', () => {
    bloodStartTicks++
}).setFilteredClass(S32PacketConfirmTransaction).unregister();

let bloodMovePredictionTicks

const mainTrigger = register("chat", () => {
    let bloodMove = ((Math.floor((Date.now() - bloodStartTime) / 10) / 100) + 0.10).toFixed(2)
    let bloodMoveTicks = (bloodStartTicks * 0.05 + 0.1).toFixed(2)

    let bloodLag = (bloodMove - bloodMoveTicks)
    chat(`&cTime&b: &6${bloodMove} Seconds`)
    chat(`&cTicks&b: &6${bloodMoveTicks} &8(&7${((bloodMoveTicks) / 0.05).toFixed(0)} Ticks&8)`)

    if (bloodMoveTicks >= 31 && bloodMoveTicks <= 33.99) bloodMovePredictionTicks = (36 + bloodLag).toFixed(2)
    if (bloodMoveTicks >= 28 && bloodMoveTicks <= 30.99) bloodMovePredictionTicks = (33 + bloodLag).toFixed(2)
    if (bloodMoveTicks >= 25 && bloodMoveTicks <= 27.99) bloodMovePredictionTicks = (30 + bloodLag).toFixed(2)
    if (bloodMoveTicks >= 22 && bloodMoveTicks <= 24.99) bloodMovePredictionTicks = (27 + bloodLag).toFixed(2)
    if (bloodMoveTicks >= 1 && bloodMoveTicks <= 21.99) bloodMovePredictionTicks = 24
    if (!bloodMovePredictionTicks) bloodMovePredictionTicks = "Invalid"

    chat(`&cMove Prediction&b: ${(bloodMovePredictionTicks>29.99)? "&c": (bloodMovePredictionTicks>25.66)? '&e': '&a'}&l${bloodMovePredictionTicks} Seconds&r&c!`)
    displayText = `&6${bloodMovePredictionTicks}`
    display = true
    setTimeout(() => { display = false }, 1250)
}).setCriteria("[BOSS] The Watcher: Let's see how you can handle this.").unregister();

const finalTrigger = register('chat', () => {
    tickCounter.unregister();
    if (bloodMovePredictionTicks != 'Invalid')
    chat(`&cMoved: ${(bloodMovePredictionTicks>29.99)? "&c": (bloodMovePredictionTicks>25.66)? '&e': '&a'}${bloodMovePredictionTicks}s.`)
    chat(`&cCleared: ${(((bloodStartTicks/20 )- bloodMovePredictionTicks) > 40)? "&c": (((bloodStartTicks/20 )- bloodMovePredictionTicks) > 37)? '&e': '&a'}${((bloodStartTicks/20 )- bloodMovePredictionTicks).toFixed(2)}s.`)
    chat(`&cTotal: ${((bloodStartTicks/20) > 69)? "&c": ((bloodStartTicks/20) > 62)? '&e': '&a'}${(bloodStartTicks/20).toFixed(2)}s.s`)
}).setCriteria(`[BOSS] The Watcher: You have proven yourself. You may pass.`).unregister();

const renderTrigger = register("renderOverlay", () => {
    if (!display) return
    Client.Companion.showTitle(`&cBlood Camp Ready!`, `&7Watcher will move at ${displayText}`, 0, 2, 0)
}).unregister();

export function toggle() {
    if (config().bloodHelperToggle && config().toggle && config().watcherMoveDisplay) {
        trigger.register()
        mainTrigger.register()
        renderTrigger.register()
        finalTrigger.register()
        return
    }
    trigger.unregister()
    mainTrigger.register()
    renderTrigger.unregister()
    finalTrigger.unregister()
    return
}
export default { toggle };