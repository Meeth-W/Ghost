import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"

import { data } from "./utils/data";
export let recently_closed = false;

const defConfig = new DefaultConfig("Ghost", "data/settings.json")

defConfig
.addSwitch({
    category: "General",
    configName: "toggle",
    title: "&4&lToggle Ghost Client",
    description: "Decides whether all features of this mod are &aenabled&7/&cdisabled&7.",
    registerListener(previousvalue, newvalue) {
        ChatLib.chat(`§8[&6Ghost&8]§7 Ghost Client ${newvalue ? "&aEnabled" : "&cDisabled"}`)
    }
})
.addSwitch({
    category: "Slot Binding",
    configName: "slotBindingToggle",
    title: "&cToggle Slot Binding",
    description: "Decides wether all features in Slot Binding are &aenabled&7/&cdisabled&7."
})
.addDropDown({
    category: "Slot Binding",
    configName: "slotBindingPreset",
    title: "Preset",
    description: "The current preset in use. \nSelected preset will be edited with keybind.",
    options: ["Mage","Archer","Berserk","Healer","Tank","General"],
    value: 0,
    subcategory: "Settings"
})
.addSwitch({
    category: "Slot Binding",
    configName: "slotBindingautoSelect",
    title: "Auto Select",
    description: "&7Selects slot bind preset based on your selected class in dungeons.\n&cSelected preset will be used outside dungeons.",
    subcategory: "Settings"
})
.addTextInput({
    category: "Slot Binding",
    configName: "slotBindingswapSound",
    title: "Swap Sound",
    description: "Sound used for slot binding.",
    value: "note.pling",
    placeHolder: "note.pling",
    subcategory: "Settings"
})
.addSwitch({
    category: "Slot Binding",
    configName: "slotBindingdynamicColoring",
    title: "Dynamic Coloring",
    description: "Changes the color of the line overlay based on the preset being used.",
    subcategory: "Settings"
})
.addColorPicker({
    category: "Slot Binding",
    configName: "slotBindingdefaultColor",
    title: "Default Color",
    description: "Changes the default Slot Binding Overlay Color.",
    value: [255, 255, 255, 255],
})
.addSwitch({
    category: "Blood Helper",
    configName: "bloodHelperToggle",
    title: "&cToggle Blood Helper",
    description: "Decides wether all features in Blood Helper are &aenabled&7/&cdisabled&7.",
})
.addColorPicker({
    category: "Blood Helper",
    configName: "bloodHelperColor",
    title: "Helper Color",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: ""
})
.addSwitch({
    category: "Blood Helper",
    configName: "bloodHelperDynamicColor",
    title: "Toggle Dynamic Color",
    description: "Automatically decides the color of your blood helper.",
    subcategory: "Colors",
})
.addColorPicker({
    category: "Blood Helper",
    configName: "bloodHelperInitialColor",
    title: "Initial Color",
    description: "",
    value: [255, 255, 255, 255],
    subcategory: "Colors"
})
.addColorPicker({
    category: "Blood Helper",
    configName: "bloodHelperSecondaryColor",
    title: "Secondary Color",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: "",
})
.addColorPicker({
    category: "Blood Helper",
    configName: "bloodHelperFinalColor",
    title: "Final Color",
    value: [255, 255, 255, 255],
    description: "",
    subcategory: "Colors"
})
.addSwitch({
    category: "Blood Helper",
    configName: "watcherMoveDisplay",
    title: "Watcher Move Display",
    description: "Shows when watcher is about to move.",
    subcategory: "Display",
})

const config = new Settings("Ghost", defConfig, "templates/colorScheme.json", "§cGhost Client")
.setPos(10, 10)
.setSize(80, 80)
.apply()
.setCommand("gh", ["ghost", "ghostclient"])
.onCloseGui(() => {
    data.recently_closed = true
    data.save()
})
export default () => config.settings