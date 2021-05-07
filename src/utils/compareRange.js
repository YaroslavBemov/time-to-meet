/**
 *
 * @param baseObj
 * @param inputObj
 * @returns {{min, max}|Error|null}
 * @desc return null if not cross
 */
export default function compareRange(baseObj, inputObj) {
    let B1 = baseObj.min
    let E1 = baseObj.max
    let B2 = inputObj.min
    let E2 = inputObj.max

    if (B1 === undefined ||
        E1 === undefined ||
        B2 === undefined ||
        E2 === undefined) {
        return new Error('incorrect input value')
    } else if (B1 > E1) {
        return new Error('meetBegin > meetEnd')
    } else if (B2 > E2) {
        return new Error('myBegin > myEnd')
    } else if (B1 >= B2 && E1 <= E2) {
        return {min: B1, max: E1}
    } else if (B1 <= B2 && E1 >= E2) {
        return {min: B2, max: E2}
    } else if (B1 > B2 && E1 > E2 && B1 < E2) {
        return {min: B1, max: E2}
    } else if (B1 < B2 && E1 < E2 && B2 < E1) {
        return {min: B2, max: E1}
    } else {
        return null
    }
}
