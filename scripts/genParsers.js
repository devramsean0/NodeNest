import { execSync } from "child_process";
import fs from "fs/promises";

const files = await fs.readdir(`${process.cwd()}/src/parser-files`)
files.filter((file) => file.endsWith(".pegjs")).map(async (val) => {
    const name = val.replace(".pegjs", "")
    const output = execSync(`yarn peggy ${process.cwd()}/src/parser-files/${name}.pegjs -o ${process.cwd()}/dist/parser-files/${name}.js`)
    console.log(output.toString())
})