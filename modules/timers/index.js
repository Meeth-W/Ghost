import config from "../../config";
import { chat } from "../../utils/utils";

let ticks = null;
let displayText = null;

const tickCounter = register('tick', () => {
    ticks--
    if (ticks <= 0) {
        tickCounter.unregister();
        ticks = null;
    }
}).unregister();

const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
const procCatch = register("packetReceived", (packet, event) => {
	if (packet.func_179841_c() === 2) return;
	const message = ChatLib.removeFormatting(packet.func_148915_c().func_150260_c());
    if (["Your ⚚ Bonzo's Mask saved your life!", "Your Bonzo's Mask saved your life!"].includes(message)) {
        ticks = 3*20;
        displayText = "&9&lBonzo Mask"
        tickCounter.register();
	} else if (["Second Wind Activated! Your Spirit Mask saved your life!"].includes(message)) {
        ticks = 3*20;
        displayText = "&f&lSpirit Mask"
        tickCounter.register();
	} else if (["Your Phoenix Pet saved you from certain death!"].includes(message)) {
        ticks = 3*20;
        displayText = "&6&lPhoenix Pet"
        tickCounter.register();
	}
}).setFilteredClass(S02PacketChat).unregister();

const renderTrigger = register('renderOverlay', () => {
    if (!ticks) return;
    const displayColor = (ticks > 40)? "&a" : (ticks > 20)? "&e": "&c";
    Client.Companion.showTitle((displayText)? displayText: " ", `&7Invincible for &${displayColor}${(ticks/20).toFixed(2)}s`, 0, 2, 0)
}).unregister();

let crystalTicks = null
let relicTicks = null

const relicCounter = register("packetReceived", () => {
    relicTicks--
    if (relicTicks <= 0) {
        relicTicks = null
        relicCounter.unregister();
    }
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister();
const crystalCounter = register("packetReceived", () => {
    crystalTicks--
    if (crystalTicks <= 0) {
        crystalTicks = null
        crystalCounter.unregister();
    }
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister();

// Relic Timers
const relicTrigger = register("chat", () => {
    relicTicks = 42
    relicCounter.register()
}).setCriteria("[BOSS] Necron: All this, for nothing...")

const handleRelic = register("renderOverlay", () => {
    if (!relicTicks) return
    let timeLeft = (relicTicks / 20).toFixed(2)
    Client.Companion.showTitle(" ", `&cRelics spawn in &6${timeLeft}s`, 0, 2, 0)
})

// Crystal Timers
const crystalTriggerOne = register("chat", () => {
    crystalTicks = 34
    crystalCounter.register()
}).setCriteria("[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!").unregister();

const crystalTriggerTwo = register("chat", () => {
    crystalTicks = 34
    crystalCounter.register()
}).setCriteria("[BOSS] Maxor: YOU TRICKED ME!").unregister();

const handleCrystal = register("renderOverlay", () => {
    if (!crystalTicks) return
    let timeLeft = (crystalTicks / 20).toFixed(2)
    Client.Companion.showTitle(" ", `&dCrystals spawn in &6${timeLeft}s`, 0, 2, 0)
}).unregister();

export function toggle() {
    if (config().timerToggle && config().toggle) {
        if (config().invincibilityTimerToggle) {
            renderTrigger.register();
            procCatch.register();
        }
        if (config().relicTimerToggle) {
            handleRelic.register();
            relicTrigger.register();
            relicCounter.register();
        }
        if (config().crystalTimerToggle) {
            handleCrystal.register();
            crystalTriggerOne.register();
            crystalTriggerTwo.register()
            crystalCounter.register();
        }
        return
    }
    renderTrigger.unregister();
    procCatch.unregister();
    handleCrystal.unregister();
    handleRelic.unregister();
    crystalTriggerOne.unregister();
    crystalTriggerTwo.unregister();
    relicTrigger.unregister();
    relicCounter.unregister();
    crystalCounter.unregister();
    return
}
export default { toggle };