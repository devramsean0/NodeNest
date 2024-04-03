import { expect, describe, it, vi } from 'vitest';
import { Routes } from "../../src/lib/routes";

describe('Route_Intepreter', () => {
    it(`Multi_Line_Parse`, async () => {
        vi.doMock("fs/promises", async () => {
            return {
                ...(await vi.importActual<typeof import("fs")>("fs")),
                readFile: vi.fn().mockReturnValue("get /test/ => test#get\npost /test/ => test#post"),
              };
        })
        const routes = new Routes()
        await routes.init();
        expect(routes.routes).toBeDefined();
        expect(routes.routes[0]).toEqual({
            method: "get",
            path: "/test/",
            controller: "test",
            action: "get"
        })
        expect(routes.routes).toEqual([
            {
                method: "get",
                path: "/test/",
                controller: "test",
                action: "get"
            },
            {
                method: "post",
                path: "/test/",
                controller: "test",
                action: "post"
            }
        ])
    })
})