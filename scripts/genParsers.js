import { execSync } from "child_process";
import fs from "fs/promises";

// CONFIG
const baseRoute = `${process.cwd()}/src/parser-files/`
const files = await fs.readdir(`${process.cwd()}/src/parser-files`)
files.filter((file) => file.endsWith(".pegjs")).map(async (val) => {
    const name = val.replace(".pegjs", "")
    const output = execSync(`yarn peggy ${baseRoute}/${name}.pegjs -o ${baseRoute}/${name}.parser.ts --format es --plugin ts-pegjs`)
    console.log(output.toString())
})