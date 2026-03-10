import type {EntryRecord} from "../domain/db/types.ts";
import api from "../api/axios.ts";


export const push = async (localBlobs: EntryRecord[]): Promise<void> => {
    try {
        const response = await api.post("/sync/push",{
            localBlobs: localBlobs.map(blob => {
                return {
                    ...blob,
                    ciphertext : btoa(String.fromCharCode(...new Uint8Array(blob.ciphertext))),
                    iv: btoa(String.fromCharCode(...blob.iv))
                }
            })
        })
        return response.data
    }catch (e) {
        console.error(e);
        throw e;
    }
}

export const pull = async (since: number ): Promise<void> => {
    try {
        const response = await api.post("/sync/pull",{
            since: since
        })
        console.log(response)
        return response.data
    }catch (e) {
        throw e;
    }
}