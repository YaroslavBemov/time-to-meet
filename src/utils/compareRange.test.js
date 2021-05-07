import compareRange from './compareRange'

describe('compare', ()=>{

    test('should return not undefined', ()=>{
        const baseRange = {min: 8, max: 22}
        const inputRange = {min: 10, max: 20}

        expect(compareRange(baseRange, inputRange)).not.toBeUndefined()
    })

    test('should return B1-E1, CROSS', ()=>{
        const baseRange = {min: 2, max: 8}
        const inputRange = {min: 1, max: 9}
        const result = {min: 2, max: 8}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B1-E2, CROSS', ()=>{
        const baseRange = {min: 2, max: 8}
        const inputRange = {min: 1, max: 7}
        const result = {min: 2, max: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B1-E2, CROSS1', ()=>{
        const baseRange = {min: 3, max: 7}
        const inputRange = {min: 3, max: 5}
        const result = {min: 3, max: 5}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B2-E1, CROSS', ()=>{
        const baseRange = {min: 2, max: 8}
        const inputRange = {min: 3, max: 9}
        const result = {min: 3, max: 8}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B2-E2, CROSS', ()=>{
        const baseRange = {min: 2, max: 8}
        const inputRange = {min: 3, max: 7}
        const result = {min: 3, max: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return B2-E2, CROSS1', ()=>{
        const baseRange = {min: 3, max: 7}
        const inputRange = {min: 5, max: 7}
        const result = {min: 5, max: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return same base', ()=>{
        const baseRange = {min: 3, max: 7}
        const inputRange = {min: 3, max: 7}
        const result = {min: 3, max: 7}

        expect(compareRange(baseRange, inputRange)).toEqual(result)
    })

    test('should return null, NOT cross', ()=>{
        const baseRange = {min: 3, max: 7}
        const inputRange = {min: 7, max: 8}

        expect(compareRange(baseRange, inputRange)).toBeNull()
    })

    test('should return null, NOT cross1', ()=>{
        const baseRange = {min: 3, max: 7}
        const inputRange = {min: 2, max: 3}

        expect(compareRange(baseRange, inputRange)).toBeNull()
    })

    test('should return null, NOT cross2', ()=>{
        const baseRange = {min: 3, max: 7}
        const inputRange = {min: 8, max: 9}

        expect(compareRange(baseRange, inputRange)).toBeNull()
    })

    test('should return null, NOT cross3', ()=>{
        const baseRange = {min: 3, max: 7}
        const inputRange = {min: 1, max: 2}

        expect(compareRange(baseRange, inputRange)).toBeNull()
    })
})
