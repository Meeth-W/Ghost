import { chat } from "./utils"

const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")
const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")
const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow")
const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow");

export const sendWindowClick = (windowId, slot, clickType, actionNumber=0) => Client.sendPacket(new C0EPacketClickWindow(windowId ?? Player.getContainer().getWindowId(), slot, clickType ?? 0, 0, null, actionNumber))

// const invWalk = register("packetReceived", (packet, event) => {
//     const title = ChatLib.removeFormatting(packet.func_179840_c().func_150254_d());
//     if (title !== "Your Equipment and Stats") return;
//     cancel(event)
// }).setFilteredClass(S2DPacketOpenWindow).unregister();

export default new class equipmentHelper {
    constructor() {
        this.itemName = null;
        this.menuOpened = false;

        register('packetReceived', (packet, event) => {
            if (!this.itemName) return;
            
            const itemStack = packet.func_149174_e();
            const slot = packet.func_149173_d();
            const windowID = packet.func_149175_c();
            
            if (!windowID || !itemStack || !slot) return;
            if (slot > 88) {
                chat("&7Could not find &a" + this.itemName)
                Client.sendPacket(new C0DPacketCloseWindow(windowID));
                this.itemName = null;
                return;
            }; 

            cancel(event)

            const item = new Item(itemStack);
            const _itemName = item.getName().removeFormatting().toLowerCase();
           
            if (!_itemName.includes(this.itemName.toLowerCase())) return;

            sendWindowClick(windowID, slot, 0, 0);
            chat(`Swapping to &a${item.getName()}`)
            Client.sendPacket(new C0DPacketCloseWindow(windowID));

            this.itemName = null;
        }).setFilteredClass(S2FPacketSetSlot);
    }

    swap(itemName) {
        if (this.itemName) return chat(`Already Swapping to ${this.itemName}`)
        ChatLib.command('equipment');
        this.itemName = itemName;
    }
}

// export default new class equipmentHelper {
//     constructor() {
//         this.eqQueue = []
//         this.menuOpened = false
//         this.shouldSwap = false
//         this.inProgress = false
//         this.commandSent = false

//         register("packetReceived", (packet, event) => {
//             if (!this._inQueue() || !this.menuOpened || this.inProgress) return;

//             const itemStack = packet.func_149174_e();
//             const slot = packet.func_149173_d();
//             const windowID = packet.func_149175_c();
            
//             if (!windowID || !itemStack || !slot) return;
//             if (slot > 88) {
//                 this._reloadGUI()
//                 chat("&7Could not find &a" + this._currentItem())
//                 return;
//             }; 
//             cancel(event)
            
//             const item = new Item(itemStack);
//             const itemName = item.getName().removeFormatting().toLowerCase();
//             if (itemName !== this._currentItem().toLowerCase()) return;

//             this.inProgress = true;
//             sendWindowClick(windowID, slot, 0, 0);
//             chat(`Swapping to &a${itemName}`)
//             this._reloadGUI();

//             Client.scheduleTask(2, () => {
//                 Client.sendPacket(new C0DPacketCloseWindow(this.WindowID));
//                 setTimeout(() => {
//                     this.inProgress = false;
//                 }, 150);
//             });
//         }).setFilteredClass(S2FPacketSetSlot);

//         register("packetReceived", (packet, event) => {
//             if (!this._inQueue() && !this.inProgress) return;

//             const title = ChatLib.removeFormatting(packet.func_179840_c().func_150254_d());
//             this.WindowID = packet.func_148901_c()
                
//             if (title !== "Your Equipment and Stats") return;
//             this.menuOpened = true;
//             this.commandSent = false
//             cancel(event)
//         }).setFilteredClass(S2DPacketOpenWindow);

//         register("chat", () => {
//             this.commandSent = false
//             // this.inProgress = false  
//             this.eqQueue.pop()
//         }).setChatCriteria(`Whow! Slow down there!`)
//     }
    
//     _inQueue() {
//         return this.eqQueue.length > 0;
//     }

//     _currentItem() {
//         return this.eqQueue[0];
//     }

//     _reloadGUI () {
//         this.menuOpened = false;
//         this.eqQueue.shift();
//         this.inProgress = false
//     }

//     queueSwap(name) {
//         this.isOpen = true;
//         this.eqQueue.push(name);
//     }
// }