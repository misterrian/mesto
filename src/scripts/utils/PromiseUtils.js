export function convertToJson(result) {
    return result.ok
        ? result.json()
        : Promise.reject(`Ошибка: ${result.status}, ${result.statusText}`);
}

export function logError(error) {
    console.log(error);
}
