export function serializeJson(entry: unknown): Uint8Array {
    const json = JSON.stringify(entry);
    return new TextEncoder().encode(json);
}

export function serializeString(value: string): Uint8Array {
    return new TextEncoder().encode(value)
}