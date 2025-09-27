/**
 * Takes an object and checks if there is any properties.
 *  - If there is properties in the object, the function will return true.
 *  - If there is no properties, the function will return false.
 *
 * @param object - Any object.
 * @returns - A boolean value based on the objects length.
 */
function checkIfObjectIsEmpty(object: Record<string, any>) {
    return Object.keys(object).length === 0;
}

export default checkIfObjectIsEmpty;
