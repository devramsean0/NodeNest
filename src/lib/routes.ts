import { readFile } from "fs/promises";
import { parse } from "../parser-files/routes.parser.js";
/**
 * The route parsing code. This Initalizes and takes the route defs from `config/routes.def` and splits them into a usable format
 */
export class Routes {
    private routeDirectory = `${process.cwd()}/config/routes.def`;
    readonly routes: IRoute[] = [];
    /**
     * Starts the route loading process
     */
    public async init() {
        await this.loadRoutes().then(() => {
            console.log("Loaded Routes");
        });
    }
    /**
     * Loads the file, handles newlines and uses the pegjs parser
     */
    private async loadRoutes() {
        const file = await readFile(this.routeDirectory);
        const lines = file.toString().split(/\r?\n/); // Adjusted split regex to handle both \n and \r\n
        lines.forEach((val) => {
            const stripedVal = val.trim();
            if (stripedVal) { // Check if the line is not empty
                const parsedLine = parse(stripedVal);
                this.parseLineResponse(parsedLine);
            }
        });
    }
    /**
     * Takes the parser response and then adds the human readable value to the routes list
     * @param parsedLine {any[]} The Raw response from the parser
     */
    private parseLineResponse(parsedLine: any[]) {
        const route: IRoute = {
            method: parsedLine[0],
            path: parsedLine[1][1].join("").replaceAll(",", ""),
            controller: parsedLine[1][5].join("").replaceAll(",", ""),
            action: parsedLine[1][7].join("").replaceAll(",", "")
        };
        this.routes.push(route);
    }
}

interface IRoute {
    method: "get" | "post" | "patch" | "put" | "delete";
    path: string;
    controller: string;
    action: string;
}
