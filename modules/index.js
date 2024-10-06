import slotBinding from "./slotBinding";

export const modules = [
    slotBinding
]

export function refresh_modules() {
    modules.forEach(name => {
        name.toggle()
    })
}
export default { refresh_modules };