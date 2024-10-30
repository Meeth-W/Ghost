import config from "../../config";
import { chat } from "../../utils/utils";

function convertExpression(expression) {
    expression = expression.replace(/b/g, '*1e9').replace(/m/g, '*1e6').replace(/k/g, '*1e3');
    return expression;
}
function formatNumberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
register("command", (expression) => {
    try {
        var result = formatNumberWithCommas(eval(convertExpression(expression)));
        chat(expression + "§a = §r" + result);
    } catch (e) {
        chat("§cError in calculation");
    }
}).setName("calc").setAliases("eval", "math");

// Anti lowballers !!!
// const trigger = register('chat', (name, msg) => {
//     if (msg.toLowerCase().includes('lowballing')) {
//         ChatLib.command(`cr ${name}`)
//         setTimeout(() => {
//             setTimeout(() => {
//                 Player.getContainer().click(11, false, 'RIGHT')
//             }, 200);
//         }, 250);
//     }
// }).setCriteria(/^\[.*?\] (\w+): .*(lowballing).*$/i)

export function toggle() {
    if (config().configToggle && config().toggle) {

        return
    }

    return
}
export default { toggle };