import { expect, describe, it, beforeEach } from 'vitest';
import { parse } from "../../src/parser-files/routes.parser";

describe('Route_Parser', () => {
    let validParse;
    beforeEach(() => {
      validParse = [
        'replaceMe',
            [
              [ ' ' ],
              [ '/', 't', 'e', 's', 't', '/' ],
              [ ' ' ],
              '=>',
              [ ' ' ],
              [ 't', 'e', 's', 't' ],
              '#',
              [ 't', 'e', 's', 't' ]
            ]
          ]
    })
    it(`GET_Parse`, () => {
        const result = parse(`get /test/ => test#test`)
        expect(result).toBeDefined();
        validParse[0] = "get";
        expect(result).toEqual(validParse)
    })
    it(`POST_Parse`, () => {
      const result = parse(`post /test/ => test#test`)
      expect(result).toBeDefined();
      validParse[0] = "post";
      expect(result).toEqual(validParse)
    })
    describe(`EDIT_Parses`, () => {
      it(`PATCH_Parse`, () => {
        const result = parse(`patch /test/ => test#test`)
        expect(result).toBeDefined();
        validParse[0] = "patch";
        expect(result).toEqual(validParse)
      })
      it(`PUT_Parse`, () => {
        const result = parse(`put /test/ => test#test`)
        expect(result).toBeDefined();
        validParse[0] = "put";
        expect(result).toEqual(validParse)
      })
    })
    it(`DELETE_Parse`, () => {
      const result = parse(`delete /test/ => test#test`)
      expect(result).toBeDefined();
      validParse[0] = "delete";
      expect(result).toEqual(validParse)
    })
})