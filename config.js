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
    configName: "mobESPStarred",
    title: "Starred Mobs",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: ""
})
.addColorPicker({
    category: "Mob ESP",
    configName: "mobESPShadowAssassins",
    title: "Shadow Assassins",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: ""
})
.addColorPicker({
    category: "Mob ESP",
    configName: "mobESPWithers",
    title: "Withers",
    value: [255, 255, 255, 255],
    subcategory: "Colors",
    description: ""
})
.addColorPicker({
    category: "Mob ESP",
    configName: "mobESPFels",
    title: "Fels",
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
.addSwitch({
    category: "Slot Binding",
    configName: "slotBindingLock",
    title: "Lock Slots",
    description: "Locks all binded slots by preventing left/right clicks on them.",
    subcategory: "Settings"
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
.addKeybind({
    category: "Slot Binding",
    configName: "slotBindingKeybind",
    title: "Setup Keybind",
    description: "Keybind used to edit slot bind preset.",
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
    configName: "fastLeapClear",
    title: "Clear",
    description: "\n&6Always leaps to this player in clear!\n\n&7Usually &6Archer&7/&bMage",
    options: ["Mage","Archer","Berserk","Healer","Tank",],
    value: 2,
    subcategory: "Players"
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
    category: "QOL",
    configName: "qolToggle",
    title: "&6Toggle Quality of Life &7(&cCheat&7)",
    description: "Decides wether all features in QOL are &aenabled&7/&cdisabled&7."
})
.addSwitch({
    category: "QOL",
    configName: "qolGKey",
    title: "Toggle G Key",
    description: "Converts the block youre looking at to a ghost block!",
    subcategory: "G Key",
})
.addKeybind({
    category: "QOL",
    configName: "qolGKeyBind",
    title: "G-Key Bind",
    description: "The key you want to use for the G Key feature",
    subcategory: "G Key",
})
.addSwitch({
    category: "QOL",
    configName: "qolGKeyCheck",
    title: "Pickaxe Check",
    description: "Only triggers gkey if youre holding a pickaxe!",
    subcategory: "G Key",
})
.addSwitch({
    category: "QOL",
    configName: "qolnoInteract",
    title: "Toggle No Interact",
    description: "Cancels interaction event when clicking on a block while holding pearls.",
    subcategory: "No Interact",
})
// .addSwitch({
//     category: "Key Four",
//     configName: "keyFour",
//     title: "&6Toggle Key Four &7(&cCheat&7)",
//     description: "Decides wether all features in Key Four are &aenabled&7/&cdisabled&7.",
// })
// .addColorPicker({
//     category: "Key Four",
//     configName: "keyFourColor",
//     title: "Target Color",
//     value: [255, 255, 255, 255],
//     subcategory: "Colors",
//     description: ""
// })
// .addSwitch({
//     category: "Key Four",
//     configName: "keyFourViewMode",
//     title: "Toggle Smooth Look",
//     description: "Smoothly Rotates Between Targets.",
//     subcategory: "Movement",
// })
// .addSwitch({
//     category: "Key Four",
//     configName: "keyFourClickAfter",
//     title: "Shoot After",
//     description: "Right-clicks terminator if held after movement.",
//     subcategory: "Settings",
// })
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
.addColorPicker({
    category: "Blood Helper",
    configName: "bloodHelperWatcherColor",
    title: "Watcher Color",
    value: [255, 0, 0, 255],
    subcategory: "Colors",
    description: "Current location of the watcer entity!"
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
    category: "Relics",
    configName: "relicToggle",
    title: "&6Toggle Relics",
    description: "Decides wether all features in Relics are &aenabled&7/&cdisabled&7.",
})
.addSwitch({
    category: "Relics",
    configName: "blinkRelics",
    title: "Blink Relics",
    description: "Instantly teleports you to the correct cauldron (&cRed&7/&6Orange&7).\nRequires &b28 ticks&7 of charging, &eRelic Look&7 and &eRelic Triggerbot&7.",
    subcategory: "Blink"
})
.addSwitch({
    category: "Relics",
    configName: "relicConfig",
    title: "Brush",
    description: "Automatically places brush config for relics when near the right statue (&cRed&7/&6Orange&7).\nStand on the &bDiamond Block&7.",
    subcategory: "Blink"
})
.addSwitch({
    category: "Relics",
    configName: "relicLook",
    title: "Look",
    description: "Automatically rotates you towards the right cauldron (&cRed&7/&6Orange&7).",
    subcategory: "Auto"
})
.addSwitch({
    category: "Relics",
    configName: "relicTriggerbot",
    title: "Triggerbot",
    description: "Automatically clicks the correct cauldron for you.",
    subcategory: "Auto"
})
.addSwitch({
    category: "Relics",
    configName: "relicAura",
    title: "Aura",
    description: "Automatically picks up the closest relic.",
    subcategory: "Auto"
})
.addSwitch({
    category: "Relics",
    configName: "relicTimers",
    title: "Relic Timer",
    description: "Automatically picks up the closest relic.",
    subcategory: "Auto"
})
.addSwitch({
    category: "Location Ping",
    configName: "locationMessagesToggle",
    title: "&6Toggle Location Ping",
    description: "Decides wether all features in Location Ping are &aenabled&7/&cdisabled&7.",
})
.addSwitch({
    category: "Location Ping",
    configName: "locationNotif",
    title: "Alert Toggle",
    description: "Shows a title and plays a sound when a party member sends a location message",
    subcategory: "Location Title",
})
.addTextInput({
    category: "Location Ping",
    configName: "locationSound",
    title: "Location Notification Sound",
    description: "Sound used for Location Notification Sound",
    value: "note.harp",
    placeHolder: "note.harp",
    subcategory: "Location Title",
})
.addSwitch({
    category: "Location Ping",
    configName: "locationOverlay",
    title: "Area Highlight",
    description: "Renders the area where location pings proc!",
    subcategory: "Location Highlight",
})
.addSwitch({
    category: "Location Ping",
    configName: "ssCoord",
    title: "SS Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Ping",
    configName: "pre2Coord",
    title: "Pre Enter 2 Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Ping",
    configName: "i3Coord",
    title: "Insta 3 Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Ping",
    configName: "pre3Coord",
    title: "Pre Enter 3 Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Ping",
    configName: "pre4Coord",
    title: "Pre Enter 4 Nearby Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Ping",
    configName: "slingshotCoord",
    title: "At Core Message",
    subcategory: "Toggle",
    description: "",
})
.addSwitch({
    category: "Location Ping",
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
.addSwitch({
    category: "Party Finder",
    configName: "partyFinderChat",
    title: "Join Message",
    subcategory: 'Join Message',
    description: "Sends a message in party chat when a player joins through party finder.",
})
.addTextInput({
    category: "Party Finder",
    configName: "partyFinderJoinMsg",
    title: "Message Text",
    description: "Customisable Join Message.\nAvailable Variables: &d<username>&7,&d<pb>&7,&d<mp>&7,&d<secrets>&7,&d<sblvl>\n&b/testjoinmsg <username>&7 to test!",
    value: "o/ <username>!",
    placeHolder: "o/ <username>!",
    subcategory: "Join Message",
})
.addSwitch({
    category: "Party Finder",
    configName: "partyFinderAutoKick",
    title: "Toggle Auto Kick",
    subcategory: "Auto Kick",
    description: "Automatically kicks players that do not meet your requirements!\nWhen enabled, shows a &eKick Check &7along with the &b/stats &7command",
})
.addSwitch({
    category: "Party Finder",
    configName: "partyFinderListing",
    title: "Toggle Listing",
    subcategory: "Auto Kick",
    description: "Enables the Whitelist & Blacklist features.\n\nUse &b/autokick&7 to setup",
})
.addDropDown({
    category: "Party Finder",
    configName: "partyFinderDungeonType",
    title: "Dungeon Type",
    description: "Select the floor type to check stats for.",
    options: ["Catacombs","Master Catacombs"],
    value: 0,
    subcategory: "Floor Settings"
})
.addDropDown({
    category: "Party Finder",
    configName: "partyFinderDungeonFloor",
    title: "Dungeon Floor",
    description: "Select the dungeon floor to check stats for.",
    options: ["1: Bonzo","2: Scarf","3: Professor","4: Thorn","5: Livid","6: Sadan","7: Necron / Wither King"],
    value: 0,
    subcategory: "Floor Settings"
})
.addTextInput({
    category: "Party Finder",
    configName: "partyFinderPB",
    title: "&aPersonal Best",
    description: "",
    value: "5:00",
    placeHolder: "5:00",
    subcategory: "Requirements",
})
.addTextInput({
    category: "Party Finder",
    configName: "partyFinderMP",
    title: "&eMagical Power",
    description: "",
    value: "1200",
    placeHolder: "1200",
    subcategory: "Requirements",
})
.addTextInput({
    category: "Party Finder",
    configName: "partyFinderSBLevel",
    title: "&6Skyblock Level",
    description: "",
    value: "300",
    placeHolder: "300",
    subcategory: "Requirements",
})
.addTextInput({
    category: "Party Finder",
    configName: "partyFinderminSecrets",
    title: "&dSecret Count",
    description: "",
    subcategory: "Requirements",
    value: "10k",
    placeHolder: "10k"
})
.addSwitch({
    category: "Equipment",
    configName: "equipToggle",
    title: "&6Toggle Equipment",
    description: "Decides wether all features in Equipment are &aenabled&7/&cdisabled&7.",
})
.addSwitch({
    category: "Equipment",
    configName: "equipAuto",
    title: "&dToggle Auto",
    description: "Automatically equips a different helmet on certain triggers.",
})
.addTextInput({
    category: "Equipment",
    configName: "equipOnPhoenix",
    title: "&6Phoenix",
    description: "Your Phoenix Pet saved you from certain death!",
    subcategory: "Settings",
    value: "Spirit Mask",
    placeHolder: "Spirit Mask"
})
.addTextInput({
    category: "Equipment",
    configName: "equipOnSpirit",
    title: "&fSpirit",
    description: "Second Wind Activated! Your Spirit Mask saved your life!",
    subcategory: "Settings",
    value: "Bonzo's Mask",
    placeHolder: "Bonzo's Mask"
})
.addTextInput({
    category: "Equipment",
    configName: "equipOnBonzo",
    title: "&9Bonzo's Mask",
    description: "Your ⚚ Bonzo's Mask saved your life!",
    subcategory: "Settings",
    value: "Racing Helmet",
    placeHolder: "Racing Helmet"
})
.addTextInput({
    category: "Equipment",
    configName: "equipOnBoss",
    title: "&4Boss Entry",
    description: "[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!",
    subcategory: "Settings",
    value: "Diamond Necron Head",
    placeHolder: "Diamond Necron Head"
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