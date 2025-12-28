export function deserializeJson(entry: ArrayBuffer){
    const note = JSON.parse(
        new TextDecoder().decode(entry)
    );
    return note;
}