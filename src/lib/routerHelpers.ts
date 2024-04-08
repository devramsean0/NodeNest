import { type IRouteDef } from "../index.js";

export async function pairControllersAndRoutes(routes: IRouteDef[], controllers: Map<string, any>) {
    const pairedRoutes = new Map()
    routes.map((val) => {
        pairedRoutes.set(val.path, controllers.get(val.controller)[val.action]);
    })
    return pairedRoutes
}