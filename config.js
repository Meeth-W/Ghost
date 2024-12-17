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
        ChatLib.chat(`§8[&6Ghost&8]§7 GhostAddons is now ${newvalue ? "&aEnabled" : "&cDisabled"}`)
    }
})
.addSwitch({
    category: "General",
    configName: "toggleCheat",
    title: "&c&lToggle Cheats",
    description: "Decides whether all non legit features of this mod are &aenabled&7/&cdisabled&7.",
    registerListener(previousvalue, newvalue) {
        ChatLib.chat(`§8[&6Ghost&8]§7 Cheats are now ${newvalue ? "&aEnabled" : "&cDisabled"}`)
    }
})
.addSwitch({
    category: "Mob ESP",
    configName: "mobESP",
    title: "&6Toggle Mob ESP &7(&cCheat&7)",
    description: "Decides wether all features in Mob ESP are &aenabled&7/&cdisabled&7.\n\n&9Mob ESP Credit: &7UnclaimedBloom6",
})
.addColorPicker({
    category: "Mob ESP",
    configName: "mobESPColor",
    title: "ESP Color",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: ""
})
.addSwitch({
    category: "Slot Binding",
    configName: "slotBindingToggle",
    title: "&6Toggle Slot Binding",
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
    category: "Fast Leap",
    configName: "fastLeapToggle",
    title: "&6Toggle Fast Leap &7(&cCheat&7)",
    description: "Decides wether all features in Fast Leap are &aenabled&7/&cdisabled&7."
})
.addSwitch({
    category: "Fast Leap",
    configName: "fastLeapGUI",
    title: "Overlay",
    description: "GUI Overlay for Fast Leap\nOnly renders while holding leap!",
    subcategory: "Settings"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapP1",
    title: "P1",
    description: "\n&6Phase 1&7 -> &6Phase 2\n\n&7Usually &cBerserk",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 2,
    subcategory: "Players"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapP2",
    title: "P2",
    description: "\n&6Phase 2&7 -> &6Phase 3 &bSection 1\n\n&7Usually &dHealer&7/&cBerserk",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 2,
    subcategory: "Players"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapP3S1",
    title: "P3 S1",
    description: "\n&6Phase 3 &bSection 1&7 -> &6Phase 3 &bSection 2\n\n&7Usually &6Archer&7/&bMage",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 1,
    subcategory: "Players"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapP3S2",
    title: "P3 S2",
    description: "\n&6Phase 3 &bSection 2&7 -> &6Phase 3 &bSection 3\n\n&7Usually &dHealer",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 3,
    subcategory: "Players"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapP3S3",
    title: "P3 S3",
    description: "\n&6Phase 3 &bSection 3&7 -> &6Phase 3 &bSection 4\n\n&7Usually &bMage",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 0,
    subcategory: "Players"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapP3S4",
    title: "P3 S4",
    description: "\n&6Phase 3 &bSection 4&7 -> &6Phase 3 &bCore\n\n&7Usually &bMage",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 0,
    subcategory: "Players"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapP3Core",
    title: "P3 Core",
    description: "\n&6Phase 3 &bCore&7 -> &6Phase 4\n\n&7Usually &dHealer",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 3,
    subcategory: "Players"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapP4",
    title: "P4",
    description: "\n&6Phase 4&7 -> &6Phase 5\n\n&7Usually &dHealer",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 3,
    subcategory: "Players"
})
.addDropDown({
    category: "Fast Leap",
    configName: "fastLeapRelic",
    title: "Relic",
    description: "\n&6Phase 4&7 -> &6Phase 5\n\n&7Usually &6Archer&7/&cBerserk",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 1,
    subcategory: "Players"
})
.addSwitch({
    category: "Key Four",
    configName: "keyFour",
    title: "&6Toggle Key Four &7(&cCheat&7)",
    description: "Decides wether all features in Key Four are &aenabled&7/&cdisabled&7.",
})
.addColorPicker({
    category: "Key Four",
    configName: "keyFourColor",
    title: "Target Color",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: ""
})
.addSwitch({
    category: "Key Four",
    configName: "keyFourViewMode",
    title: "Toggle Smooth Look",
    description: "Smoothly Rotates Between Targets.",
    subcategory: "Movement",
})
.addSwitch({
    category: "Key Four",
    configName: "keyFourClickAfter",
    title: "Shoot After",
    description: "Right-clicks terminator if held after movement.",
    subcategory: "Settings",
})
.addSwitch({
    category: "Blood Helper",
    configName: "bloodHelperToggle",
    title: "&6Toggle Blood Helper",
    description: "Decides wether all features in Blood Helper are &aenabled&7/&cdisabled&7.\n\n&9Blood Helper Credit: &7soshimeeaddons",
})
.addColorPicker({
    category: "Blood Helper",
    configName: "bloodHelperColor",
    title: "Prediction Color",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: "Final location of the armour stand entity!"
})
.addColorPicker({
    category: "Blood Helper",
    configName: "bloodHelperEntityColor",
    title: "Current Entity Color",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: "Current location of the armour stand entity!"
})
.addSwitch({
    category: "Blood Helper",
    configName: "watcherMoveDisplay",
    title: "Watcher Move Display",
    description: "Shows when watcher is going to move.",
    subcategory: "Display",
})
.addSwitch({
    category: "Blood Helper",
    configName: "bloodRenderToggle",
    title: "Blood Camp Assist",
    description: "Renders boxes where blood mobs are going to spawn.",
    subcategory: "Display",
})
.addSwitch({
    category: "Blood Helper",
    configName: "bloodHelperAuto",
    title: "Triggerbot &7(&cCheat&7)",
    description: "Triggers left click if blood camp assist is active and criteria is met",
    subcategory: "Auto",
})
.addTextInput({
    category: "Blood Helper",
    configName: "bloodHelperClickTime",
    title: "Click Distance",
    description: "Distance between armour stand and prediction at which to trigger a click!",
    value: "1",
    placeHolder: "1",
    subcategory: "Auto",
})
.addTextInput({
    category: "Blood Helper",
    configName: "bloodHelperFPS",
    title: "Checks Per Second",
    description: "Sets the FPS For the STEP Register.\n&cRequires a CT LOAD on modification!",
    value: "100",
    placeHolder: "100",
    subcategory: "Auto",
})
.addSwitch({
    category: "Drag Prio",
    configName: "dragPrioToggle",
    title: "&6Toggle Drag Prio",
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
    title: "&6Toggle Timers",
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
    title: "&6Toggle Location Pings",
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
    title: "&6Toggle Party Finder",
    description: "Decides wether all features in Party Finder are &aenabled&7/&cdisabled&7.",
})

const config = new Settings("Ghost", defConfig, "templates/colorScheme.json", "§6§lGhost Addons")
.setPos(15, 15)
.setSize(70, 70)
.apply()
.setCommand("gh", ["ghost", "ghostaddons"])
.onCloseGui(() => {
    data.recently_closed = true
    data.save()
})
export default () => config.settings