import { readdir } from "fs/promises";
import { Controller } from "../structures/controller.js";

export class Loader {
    private directory: string;
    private strippedExtension: string;
    readonly modules: Map<String, typeof Controller>;
    

    /**
     * @since 1.0.0
     * @param directory 
     * @param strippedExtensions 
     */
    constructor(directory: string, strippedExtension: string) {
        this.directory = directory;
        this.strippedExtension = strippedExtension;
        this.modules = new Map();
    }
    /**
     * @since 1.0.0
     * Commence a scan of the directory.
     */
    public async scan() {
        const files = (await readdir(this.directory)).filter(file => file.endsWith(this.strippedExtension))
        const promises = files.map(async (val) => {
            const name = val.replaceAll(this.strippedExtension, "");
            const file = await import(`${this.directory}/${val}`);
            const module = new file.default();
            this.modules.set(name, module);
        })
        await Promise.all(promises);
        console.log(`Registered ${this.modules.size} modules from ${this.directory}`)
    }
}