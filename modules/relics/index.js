import { getDistanceToCoord, getDistanceToEntity } from "../../../BloomCore/utils/Utils";
import config from "../../config";
import { calcYawPitch, chat, rightClick, setBlockAt, snapTo } from "../../utils/utils";

let pickedColor
let pickedUpTime

// Handling Blink //
let ticksStill = 0

const standStillTicks = 28
const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition")
const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding")
const orangePackets = [
    [89.48818552494049, 6, 55.45217406749725, true],
    [88.58097032771286, 6.0625, 55.06903517856081, true],
    [87.498816309353, 6.0625, 54.612015400321276, true],
    [86.32114568356045, 6, 54.11465665183678, true],
    [85.09132298405203, 6, 53.59527282304026, true],
    [83.8330252489873, 6, 53.063863298996566, true],
    [82.55918014270298, 6, 52.52588774458525, true],
    [81.27684617074672, 6, 51.98432713717679, true],
    [79.98987727759527, 6, 51.44080909060454, true],
    [78.70037771717725, 6, 50.89622228212472, true],
    [77.40949641227124, 6, 50.35105192957558, true],
    [76.11786067478712, 6, 49.80556296192759, true],
    [74.82581301706753, 6, 49.259900030415416, true],
    [73.53354045087323, 6, 48.71414211462237, true],
    [72.24114508463751, 6, 48.16833233740594, true],
    [70.94868266957135, 6, 47.622494243849054, true],
    [69.65618364583952, 6, 47.076640689568485, true],
    [68.36366463377394, 6, 46.530778693731804, true],
    [67.07113470807684, 6, 45.98491208880495, true],
    [65.77859882353624, 6, 45.43904296731456, true],
    [64.48605968546673, 6, 44.89317247178034, true],
    [63.1935187709702, 6, 44.34730122601809, true],
    [61.90097688654443, 6, 43.801429570631285, true],
    [60.60843447253722, 6, 43.25555769158945, true],
    [59.31589176937851, 6.0625, 42.70968569043196, true]
]
const redPackets = [
    [23.485512018203735, 6, 57.397353172302246, true],
    [24.352063615464257, 6, 56.92946117591761, true],
    [25.38571284880744, 6, 56.37134530044137, true],
    [26.51059740204898, 6, 55.763967181259176, true],
    [27.685296445741105, 6, 55.12969187388936, true],
    [28.887194204378453, 6, 54.48073070006328, true],
    [30.103942463100815, 5.921599998474121, 53.823751042220735, false],
    [30.790707572238603, 5.766367993957519, 53.45293423265625, false],
    [31.438084322275124, 5.535840625044555, 53.10338505151027, false],
    [32.049617664496495, 5.231523797587011, 52.773189412782905, false],
    [32.628533504666045, 5, 52.46060549816404, true],
    [33.71585894068581, 5, 51.873507311886215, true],
    [34.870050703992874, 5, 51.250304849168316, true],
    [36.06075148623942, 5, 50.60738944922443, true],
    [37.2713861951423, 5, 49.95371078430497, true],
    [38.492904829263736, 5, 49.29415537602625, true],
    [39.720366087244756, 5, 48.63139126550067, true],
    [40.951072018229986, 5, 47.96687520334481, true],
    [42.18354954088129, 5, 47.30140257548772, true],
    [43.416994352694616, 5, 46.63540766269709, true],
    [44.65096730445176, 5, 45.96912758229962, true],
    [45.88522862065172, 5, 45.30269180037073, true],
    [47.11964738385575, 5, 44.636171005395816, true]
]

const blinkRelicRegister = register("tick", () => {
    if (!Player.getPlayer().field_70124_G || Player.getPlayer().field_70159_w !== 0 || Player.getPlayer().field_70179_y !== 0) ticksStill = 0
    else if (ticksStill < standStillTicks) ticksStill++
}).unregister()
const packetCollector = register("packetSent", (packet, event) => {
    if (getDistanceToCoord(90.075, 6, 55.700) < 0.01 || getDistanceToCoord(22.925, 6, 57.700) < 0.01) if (ticksStill !== 0) cancel(event)
}).setFilteredClasses([net.minecraft.network.play.client.C03PacketPlayer]).unregister()
const renderText = register("renderOverlay", () => {
    Renderer.scale(1.5)
    const text = `§6§lCharging Blink: §r§c${standStillTicks - ticksStill} ticks.`
    // Renderer.drawString(text, Renderer.screen.getWidth() / 4 - Renderer.getStringWidth(text) / 2, Renderer.screen.getHeight() / 3.8)
    Renderer.drawString(text, (Renderer.screen.getWidth() / 1.5 - Renderer.getStringWidth(text)) / 2, Renderer.screen.getHeight() / 1.5 / 2 - 16);
}).unregister()

const relicClickListener = register("packetSent", (packet) => {
    const entity = packet.func_149564_a(World.getWorld())
    if (!entity instanceof ArmorStand) return
    const entityWornHelmet = entity.func_82169_q(3)
    if (!entityWornHelmet) return
    const helmetName = ChatLib.removeFormatting(new Item(entityWornHelmet).getName())
    if (!helmetName.includes("Relic")) return

    relicClickListener.unregister()
    blinkRelicRegister.unregister()
    packetCollector.unregister()
    renderText.unregister()

    if (config().relicLook) {
        if (helmetName === "Corrupted Orange Relic") {
            if (config().blinkRelics && ticksStill >= standStillTicks && getDistanceToCoord(90.075, 6, 55.700) < 0.1 && Player.getPlayer().func_110148_a(net.minecraft.entity.SharedMonsterAttributes.field_111263_d).func_111126_e() > 0.49) {
                Client.scheduleTask(0, () => {
                    orangePackets.forEach(packet => Client.sendPacket(new C04PacketPlayerPosition(...packet)))
                    const finalPacketPos = [orangePackets[orangePackets.length - 1][0], orangePackets[orangePackets.length - 1][1], orangePackets[orangePackets.length - 1][2],]
                    Player.getPlayer().func_70107_b(...finalPacketPos)

                    pickedColor = "Orange"
                    relicTriggerbot.register()

                    const trigger = register('worldLoad', () => {
                        trigger.unregister();
                        chat('&c&lForce Stopping Relic Triggerbot!')

                        relicTriggerbot.unregister();
                    })
                })
            }

        } else if (helmetName === "Corrupted Red Relic") {
            if (config().blinkRelics && ticksStill >= standStillTicks && getDistanceToCoord(22.925, 6, 57.700) < 0.1 && Player.getPlayer().func_110148_a(net.minecraft.entity.SharedMonsterAttributes.field_111263_d).func_111126_e() > 0.49) {
                Client.scheduleTask(0, () => {
                    redPackets.forEach(packet => Client.sendPacket(new C04PacketPlayerPosition(...packet)))
                    const finalPacketPos = [redPackets[redPackets.length - 1][0], redPackets[redPackets.length - 1][1], redPackets[redPackets.length - 1][2],]
                    Player.getPlayer().func_70107_b(...finalPacketPos)

                    pickedColor = "Red"
                    relicTriggerbot.register()

                    const trigger = register('worldLoad', () => {
                        trigger.unregister();
                        chat('&c&lForce Stopping Relic Triggerbot!')

                        relicTriggerbot.unregister();
                    })
                })
            }
        }
    }
    ticksStill = 0
}).setFilteredClass(net.minecraft.network.play.client.C02PacketUseEntity).unregister()

const handleBlink = register('chat', () => {
    if (!config().blinkRelics) return;
    chat(`&c&lStarting Blink Relics!`)
    blinkRelicRegister.register()
    renderText.register()
    packetCollector.register()
    relicClickListener.register()

    const trigger = register('worldLoad', () => {
        trigger.unregister();
        chat('&c&lForce Stopping Blink Triggers!')

        relicClickListener.unregister()
        blinkRelicRegister.unregister()
        renderText.unregister()
        packetCollector.unregister()
        ticksStill = 0
    })
}).setCriteria("[BOSS] Necron: All this, for nothing...").unregister();



// Handling Aura //
const Vec3 = Java.type("net.minecraft.util.Vec3")

const interactWithEntity = (entity) => {
    const objectMouseOver = Client.getMinecraft().field_71476_x.field_72307_f
    const dx = objectMouseOver.xCoord - entity.field_70165_t
    const dy = objectMouseOver.yCoord - entity.field_70163_u
    const dz = objectMouseOver.zCoord - entity.field_70161_v
    const packet = new net.minecraft.network.play.client.C02PacketUseEntity(entity, new Vec3(dx, dy, dz))
    Client.sendPacket(packet)
}

const relicAura = register('tick', () => {
    const armorStands = World.getAllEntitiesOfType(ArmorStand)
    const entity = armorStands.find(e => new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString()?.includes("Relic") && getDistanceToEntity(e) < 4)
    if (!entity) return
    interactWithEntity(entity.getEntity())
    Client.scheduleTask(1, () => relicAura.unregister())
})


const handleAura = register('chat', () => {
    if (!config().relicAura) return;
    chat(`&c&lStarting Relic Aura!`)
    relicAura.register();

    const trigger = register('worldLoad', () => {
        trigger.unregister();
        chat('&c&lForce Stopping Relic Aura!')

        relicAura.unregister();
    })
}).setCriteria("[BOSS] Necron: All this, for nothing...").unregister();


// Handling Look //
const lookTrigger = register("packetSent", (packet) => {
    const entity = packet.func_149564_a(World.getWorld())
    if (!entity instanceof ArmorStand) return
    const entityWornHelmet = entity.func_82169_q(3)
    if (!entityWornHelmet) return
    const helmetName = ChatLib.removeFormatting(new Item(entityWornHelmet).getName())
    if (!helmetName.includes("Relic")) return;

    lookTrigger.unregister()

    if (config().relicLook) {
        if (helmetName === "Corrupted Orange Relic") {
            const [yaw, pitch] = calcYawPitch({ x: 58, y: 7.5, z: 43 })
            snapTo(yaw, pitch)
            if (!config().blinkRelics) KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), true)

        } else if (helmetName === "Corrupted Red Relic") {
            const [yaw, pitch] = calcYawPitch({ x: 52, y: 7.5, z: 42 })
            snapTo(yaw, pitch)
            if (!config().blinkRelics) KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), true)
        }
    }
}).setFilteredClass(net.minecraft.network.play.client.C02PacketUseEntity).unregister()


const handleLook = register('chat', () => {
    if (!config().relicLook) return;
    chat(`&c&lStarting Relic Look!`)
    lookTrigger.register()

    const trigger = register('worldLoad', () => {
        trigger.unregister();
        chat('&c&lForce Stopping Relic Look!')

        lookTrigger.unregister();
    })
}).setCriteria("[BOSS] Necron: All this, for nothing...").unregister();

// Handling Placement // 
const cauldrons = {
    "Green": { x: 49, y: 7, z: 44 },
    "Red": { x: 51, y: 7, z: 42 },
    "Purple": { x: 54, y: 7, z: 41 },
    "Orange": { x: 57, y: 7, z: 42 },
    "Blue": { x: 59, y: 7, z: 44 }
}

const relicTriggerbot = register("RenderWorld", () => {
    const block = Player.lookingAt()
    const blockID = block?.getType()?.getID()
    if (blockID !== 118 && blockID !== 145) return

    const cauldronCoords = cauldrons[pickedColor]
    if (cauldronCoords["x"] !== block.getX() || cauldronCoords["z"] !== block.getZ() || cauldronCoords["y"] !== block.getY() && cauldronCoords["y"] - 1 !== block.getY()) return // yeah
    rightClick()
    KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), false)
    relicTriggerbot.unregister()
}).unregister();


const handleTriggerbot = register("chat", (name, relicColor) => {
    if (!config().relicTriggerbot || name !== Player.getName()) return
    chat(`&c&lStarting Relic Triggerbot!`)
    pickedColor = relicColor
    relicTriggerbot.register()

    const trigger = register('worldLoad', () => {
        trigger.unregister();
        chat('&c&lForce Stopping Relic Triggerbot!')

        relicTriggerbot.unregister();
    })
}).setCriteria(/^(\w{3,16}) picked the Corrupted (\w{3,6}) Relic!$/).unregister();


// Handling Brush //
const blockConfig = [
    // Orange
    {x: 91, y: 6, z: 55, id: 20},
    {x: 90, y: 6, z: 56, id: 20},
    {x: 90, y: 6, z: 54, id: 20},
    {x: 90, y: 6, z: 55, id: 113},
    {x: 90, y: 5, z: 55, id: 57},

    // Red
    {x: 22, y: 6, z: 58, id: 20},
    {x: 23, y: 6, z: 58, id: 20},
    {x: 22, y: 6, z: 57, id: 113},
    {x: 22, y: 5, z: 57, id: 57},
];
const brush = register('tick', () => {
    blockConfig.forEach(block => {
        setBlockAt(block.x, block.y, block.z, block.id);
    })
}).unregister();


const handleBrush = register('chat', () => {
    if (!config().relicConfig) return;
    brush.register();
    
    const trigger = register('worldLoad', () => {
        trigger.unregister();
        chat('&c&lForce Stopping Brush!')

        brush.unregister();
    })
}).setCriteria(`[BOSS] Necron: ARGH!`).unregister();


// Handling Timers //
// icba at this point man plz skid this shit from valley :pray:


export function toggle() {
    if (config().relicToggle && config().toggle && config().toggleCheat) {
        if (config().blinkRelics) handleBlink.register();
        if (config().relicAura) handleAura.register();
        if (config().relicTriggerbot) handleTriggerbot.register();
        if (config().relicConfig) handleBrush.register();
        if (config().relicLook) handleLook.register();
        return
    }
    handleBlink.unregister();
    handleAura.unregister();
    handleTriggerbot.unregister();
    handleBrush.unregister();
    handleLook.unregister();
    return
}
export default { toggle };