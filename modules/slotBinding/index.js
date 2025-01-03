import config from "../../config"
import { data } from "../../utils/data"
import { chat, getDynamicColor, getPreset, getSlotCoords } from "../../utils/utils"

const getPlayerController = () => Client.getMinecraft().field_71442_b
const onShiftClick = (slot) => {
    const container = Player.getContainer()

    if (slot < 36 || slot > 44) {
        if (!(slot in data.slotBinding.presets[getPreset()])) return
        const hotbarSlot = data.slotBinding.presets[getPreset()][slot] % 36
        if (hotbarSlot == null || hotbarSlot >= 9) return

        World.playSound(config().slotBindingswapSound, 1, 2);
        getPlayerController().func_78753_a(
            container.getWindowId(), 
            slot, 
            hotbarSlot, 
            2,
            Player.getPlayer()
        )

        data.slotBinding.history[getPreset()][data.slotBinding.presets[getPreset()][slot]] = slot
        data.save()
        return
    }
    if (data.slotBinding.history[getPreset()][slot]) {
        World.playSound(config().slotBindingswapSound, 1, 2);
        getPlayerController().func_78753_a(
            container.getWindowId(), 
            data.slotBinding.history[getPreset()][slot], 
            slot % 36, 
            2,
            Player.getPlayer()
        )
    }
    return
}

let cursor = null
const onKeyLeftClick = (slot) => {
    if (cursor && (slot < 36 || slot > 44)) {
        chat(`&cError: Can't bind to slots outside the hotbar.`)
        return cursor = null
    }

    if (!cursor) cursor = slot;
    if (cursor === slot) return;

    data.slotBinding.presets[getPreset()][cursor] = slot
    data.slotBinding.history[getPreset()][slot] = cursor

    data.save()

    cursor = null;
}

const onKeyRightClick = (slot) => {
    if (!(slot in data.slotBinding.presets[getPreset()])) return chat(`&cError: That slot is not currently bound.`)
    hotbarSlot = data.slotBinding.presets[getPreset()][slot]

    delete data.slotBinding.presets[getPreset()][slot]
    if (data.slotBinding.history[getPreset()][hotbarSlot] == slot) data.slotBinding.history[getPreset()][hotbarSlot] = null
    data.save()
    chat(`&aSuccesfully Deleted: ${slot}.`)
}

const mainTrigger = register("guiMouseClick", (x, y, mouseButton, gui, event) => {
    if (!(gui instanceof net.minecraft.client.gui.inventory.GuiInventory)) return
    const slot = gui.getSlotUnderMouse()?.field_75222_d

    if (mouseButton == 1 && Keyboard.isKeyDown(config().slotBindingKeybind)) {
        cancel(event);
        onKeyRightClick(slot);
    }
    if (mouseButton == 0 && Keyboard.isKeyDown(config().slotBindingKeybind)) {
        cancel(event);
        onKeyLeftClick(slot);
    }
    if (Keyboard.isKeyDown(Keyboard.KEY_LSHIFT)) {
        if ((slot < 36 || slot > 44)) { if (!(slot in data.slotBinding.presets[getPreset()])) return} 
        if (!(slot < 36 || slot > 44)) { if (!(data.slotBinding.history[getPreset()][slot])) return}
        cancel(event);
        onShiftClick(slot);
    }
    if ((mouseButton == 1 || mouseButton == 0) && config().slotBindingLock && !Keyboard.isKeyDown(config().slotBindingKeybind) && !Keyboard.isKeyDown(Keyboard.KEY_LSHIFT)) {
        if ((slot < 36 || slot > 44)) { if (!(slot in data.slotBinding.presets[getPreset()])) return} 
        if (!(slot < 36 || slot > 44)) { if (!(data.slotBinding.history[getPreset()][slot])) return}
        cancel(event);
        World.playSound('note.pling', 2, 0.5);
    }
    return
}).unregister();

const guiTrigger = register('guiRender', (x, y, gui) => {
    if (gui.class.getName() !== "net.minecraft.client.gui.inventory.GuiInventory") return;

    if (cursor) {
        const [x1, y1] = getSlotCoords(cursor)
        Renderer.translate(0, 0, 2);
        Renderer.drawRect(Renderer.RED, x1, y1, 16, 16);
        Renderer.translate(0, 0, 3);
        Renderer.drawLine(Renderer.RED, x1 + 8, y1 + 8, x, y, 1);
    }

    const hoverSlot = gui?.getSlotUnderMouse()?.field_75222_d;
    const hotbarBind = (((hoverSlot < 36 || hoverSlot > 44)))? data.slotBinding.presets[getPreset()][`${hoverSlot}`]: null

    if (hotbarBind) {
        const [x1, y1] = getSlotCoords(hoverSlot);
        const [x2, y2] = getSlotCoords(hotbarBind);

        Renderer.translate(0, 0, 100);
        Renderer.drawLine(getDynamicColor(), x1 + 8, y1 + 8, x2 + 8, y2 + 8, 1);

        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x2, y2, x2+16, y2, 1);
        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x2, y2, x2, y2+16, 1);
        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x2, y2+16, x2+16, y2+16, 1);
        Renderer.translate(0, 0, 2);    
        Renderer.drawLine(getDynamicColor(), x2+16, y2+16, x2+16, y2, 1);
    }

    Object.keys(data.slotBinding.presets[getPreset()]).forEach((bind) => {
        const [x, y] = getSlotCoords(parseInt(bind))
        Renderer.translate(0, 0, 1);
        Renderer.drawRect(Renderer.DARK_GRAY, x, y, 16, 16);    
        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x, y, x+16, y, 1);
        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x, y, x, y+16, 1);
        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x, y+16, x+16, y+16, 1);
        Renderer.translate(0, 0, 2);    
        Renderer.drawLine(getDynamicColor(), x+16, y+16, x+16, y, 1);
    })
    
    const linkedSlot = (!(hoverSlot < 36 || hoverSlot > 44)? data.slotBinding.history[getPreset()][hoverSlot]: null)

    if (linkedSlot) {
        const [x1, y1] = getSlotCoords(linkedSlot);
        const [x2, y2] = getSlotCoords(parseInt(hoverSlot))

        Renderer.translate(0, 0, 100);
        Renderer.drawLine(getDynamicColor(), x1 + 8, y1 + 8, x2 + 8, y2 + 8, 1);

        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x2, y2, x2+16, y2, 1);
        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x2, y2, x2, y2+16, 1);
        Renderer.translate(0, 0, 2);
        Renderer.drawLine(getDynamicColor(), x2, y2+16, x2+16, y2+16, 1);
        Renderer.translate(0, 0, 2);    
        Renderer.drawLine(getDynamicColor(), x2+16, y2+16, x2+16, y2, 1);
    }
}).unregister();

export function toggle() {
    if (config().slotBindingToggle && config().toggle) {
        mainTrigger.register()
        guiTrigger.register()
        return
    }
    mainTrigger.unregister()
    guiTrigger.unregister()
    return
}
export default { toggle };
