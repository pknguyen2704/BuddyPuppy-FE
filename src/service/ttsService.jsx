import http from '../config/http'
import { ENDPOINTS } from '../config/config'

export async function ttsFunction(dataText) {
    const { data } = await http.post(ENDPOINTS.tts.ttsFunction, dataText, { responseType: "arraybuffer" });
    return data;
}