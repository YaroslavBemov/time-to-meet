import compareRange from './compareRange'

describe('compare', ()=>{

    test('should return not undefined', ()=>{
        const baseRange = {from: 8, to: 22}
        const inputRange = {from: 10, to: 20}

        expect(compareRange(baseRange, inputRange)).not.toBeUndefined()
    })

    test('should return B1-E1, CROSS', ()=>{
        const baseRange = {from: 2, to: 8}
        const inputRange = {from: 1, to: 9}
        const result = {from: 2, to: 8}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B1-E2, CROSS', ()=>{
        const baseRange = {from: 2, to: 8}
        const inputRange = {from: 1, to: 7}
        const result = {from: 2, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B1-E2, CROSS1', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 3, to: 5}
        const result = {from: 3, to: 5}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B2-E1, CROSS', ()=>{
        const baseRange = {from: 2, to: 8}
        const inputRange = {from: 3, to: 9}
        const result = {from: 3, to: 8}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B2-E2, CROSS', ()=>{
        const baseRange = {from: 2, to: 8}
        const inputRange = {from: 3, to: 7}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B2-E2, CROSS1', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 5, to: 7}
        const result = {from: 5, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return same base', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 3, to: 7}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return base, NOT cross', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 7, to: 8}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return base, NOT cross1', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 2, to: 3}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return base, NOT cross2', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 8, to: 9}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return base, NOT cross3', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 1, to: 2}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should exchange', ()=>{
        const baseRange = {from: 7, to: 3}
        const inputRange = {from: 2, to: 8}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should exchange 2', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 8, to: 2}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should exchange 3', ()=>{
        const baseRange = {from: 7, to: 3}
        const inputRange = {from: 8, to: 2}
        const result = {from: 3, to: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should exchange 4', ()=>{
        const baseRange = {from: 7, to: 3}
        const inputRange = {from: 4, to: 6}
        const result = {from: 4, to: 6}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should exchange 5', ()=>{
        const baseRange = {from: 3, to: 7}
        const inputRange = {from: 6, to: 4}
        const result = {from: 4, to: 6}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })
})
