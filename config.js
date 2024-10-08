import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"

import { data } from "./utils/data";
export let recently_closed = false;

const defConfig = new DefaultConfig("Ghost", "data/settings.json")

defConfig
.addSwitch({
    category: "General",
    configName: "toggle",
    title: "&9&lToggle Ghost Client",
    description: "Decides whether all features of this mod are &aenabled&7/&cdisabled&7.",
    registerListener(previousvalue, newvalue) {
        ChatLib.chat(`§8[&6Ghost&8]§7 Ghost Client ${newvalue ? "&aEnabled" : "&cDisabled"}`)
    }
})
.addSwitch({
    category: "Slot Binding",
    configName: "slotBindingToggle",
    title: "&bToggle Slot Binding",
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
    title: "&bToggle Blood Helper",
    description: "Decides wether all features in Blood Helper are &aenabled&7/&cdisabled&7.\n\n&9Blood Helper Credit: &7soshimeeaddons",
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
.addSwitch({
    category: "Drag Prio",
    configName: "dragPrioToggle",
    title: "&bToggle Drag Prio",
    description: "Decides wether all features in Drag Prio are &aenabled&7/&cdisabled&7.",
})
.addSlider({
    category: "Drag Prio",
    configName: "splitPower",
    title: "Set Power",
    description: "Set the power that you split on",
    options: [0, 32],
    value: 0,
    subcategory: "Settings"
})
.addSlider({
    category: "Drag Prio",
    configName: "easyPower",
    title: "Set Easy Power",
    description: "Set the power that you split on for easy drags (O/P/G)",
    options: [0, 32],
    value: 0,
    subcategory: "Settings"
})
.addSwitch({
    category: "Drag Prio",
    configName: "showSingleDragons",
    title: "Show Non-Split drags",
    description: "Display \"X Dragon is spawning!\" on non-split drags",
    subcategory: "Settings",
})
.addDropDown({
    category: "Drag Prio",
    configName: "healerNormal",
    title: "Healer",
    description: "Set the team the healer will go with",
    options: ["Arch Team","Bers Team"],
    value: 0,
    subcategory: "Normal Teams"
})
.addDropDown({
    category: "Drag Prio",
    configName: "tankNormal",
    title: "Tank",
    description: "Set the team the tank will go with",
    options: ["Arch Team","Bers Team"],
    value: 0,
    subcategory: "Normal Teams"
})
.addDropDown({
    category: "Drag Prio",
    configName: "healerPurp",
    title: "Healer",
    description: "Set the team the healer will go with when purple",
    options: ["Arch Team","Bers Team"],
    value: 0,
    subcategory: "Purple Teams"
})
.addDropDown({
    category: "Drag Prio",
    configName: "tankPurp",
    title: "Tank",
    description: "Set the team the tank will go with when purple",
    options: ["Arch Team","Bers Team"],
    value: 0,
    subcategory: "Purple Teams"
})
.addSwitch({
    category: "Timers",
    configName: "timerToggle",
    title: "&bToggle Timers",
    description: "Decides wether all features in Timers are &aenabled&7/&cdisabled&7.",
})
.addSwitch({
    category: "Timers",
    configName: "relicTimerToggle",
    title: "Relic Timer",
    description: "Displays a countdown as relic spawns.",
    subcategory: "Toggles"
})
.addSwitch({
    category: "Timers",
    configName: "crystalTimerToggle",
    title: "Crystal Timer",
    description: "Displays a countdown as crystals spawns.",
    subcategory: "Toggles"
})
.addSwitch({
    category: "Timers",
    configName: "invincibilityTimerToggle",
    title: "Invinicbility Timer",
    description: "Displays a timer when a mask/phoenix proc's.",
    subcategory: "Toggles"
})
.addSwitch({
    category: "Location Pings",
    configName: "locationMessagesToggle",
    title: "&bToggle Location Pings",
    description: "Decides wether all features in Location Pings are &aenabled&7/&cdisabled&7.",
})
.addSwitch({
    category: "Location Pings",
    configName: "locationNotif",
    title: "Alert Toggle",
    description: "Shows a title and plays a sound when a party member sends a location message",
    subcategory: "Location Title",
})
.addTextInput({
    category: "Location Pings",
    configName: "locationSound",
    title: "Location Notification Sound",
    description: "Sound used for Location Notification Sound",
    value: "note.harp",
    placeHolder: "note.harp",
    subcategory: "Location Title",
})
.addSwitch({
    category: "Location Pings",
    configName: "ssCoord",
    title: "SS Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Pings",
    configName: "pre2Coord",
    title: "Pre Enter 2 Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Pings",
    configName: "i3Coord",
    title: "Insta 3 Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Pings",
    configName: "pre3Coord",
    title: "Pre Enter 3 Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Pings",
    configName: "pre4Coord",
    title: "Pre Enter 4 Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Pings",
    configName: "slingshotCoord",
    title: "At Core Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Pings",
    configName: "tunnelCoord",
    title: "Inside Tunnel Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Party Finder",
    configName: "partyFinderToggle",
    title: "&bToggle Party Finder",
    description: "Decides wether all features in Party Finder are &aenabled&7/&cdisabled&7.",
})
// .addSwitch({
//     category: "Terminals",
//     configName: "autoMelody",
//     title: "Auto Melody",
//     description: "Automatically does the melody terminal for you.\n&bCredits: Soshimee/Cyan",
//     subcategory: "Melody",
// })
// .addSwitch({
//     category: "Terminals",
//     configName: "autoMelodySkip",
//     title: "Auto Melody Skip",
//     description: "Attempts to skip at the first and fifth positions",
//     subcategory: "Melody",
// })
// .addSwitch({
//     category: "Terminals",
//     configName: "forceP3",
//     title: "Force P3",
//     description: "Bypasses the Phase 3 Checks.",
//     subcategory: "Melody",
// })

const config = new Settings("Ghost", defConfig, "templates/colorScheme.json", "§bGhost Client")
.setPos(15, 15)
.setSize(70, 70)
.apply()
.setCommand("gh", ["ghost", "ghostclient"])
.onCloseGui(() => {
    data.recently_closed = true
    data.save()
})
export default () => config.settings