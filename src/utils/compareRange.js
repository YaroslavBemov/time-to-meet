/**
 *
 * @param baseObj
 * @param inputObj
 * @returns {{from, to}|Error}
 * @desc return null if not cross
 */
// TODO принимать любые ключи, возвращать аналогичные
export default function compareRange(baseObj, inputObj) {
    let B1 = +baseObj.from
    let E1 = +baseObj.to
    let B2 = +inputObj.from
    let E2 = +inputObj.to

    if (B1 === undefined ||
        E1 === undefined ||
        B2 === undefined ||
        E2 === undefined) {
        return new Error('incorrect input value')
    }

    if (B1 > E1) {
        [B1, E1] = [E1, B1]
    }

    if (B2 > E2) {
        [B2, E2] = [E2, B2]
    }

    if (B1 >= B2 && E1 <= E2) {
        return {from: B1, to: E1}
    } else if (B1 <= B2 && E1 >= E2) {
        return {from: B2, to: E2}
    } else if (B1 > B2 && E1 > E2 && B1 < E2) {
        return {from: B1, to: E2}
    } else if (B1 < B2 && E1 < E2 && B2 < E1) {
        return {from: B2, to: E1}
    } else {
        return {from: B1, to: E1}
    }
}
