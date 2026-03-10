export function deserializeJson(entry: ArrayBuffer){
    const note = JSON.parse(
        new TextDecoder().decode(entry)
    );
    return note;
}

export function deserializeString(bytes: ArrayBuffer): string {
    return new TextDecoder().decode(bytes)
}