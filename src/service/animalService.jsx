import http from "../config/http";
import { ENDPOINTS } from "../config/config";

export async function getAnimalByIdService(id) {
    const { data } = await http.get(ENDPOINTS.pecs.getOne, id);
    return data;
}

export async function getAllAnimalsService() {
    const { data } = await http.get(ENDPOINTS.pecs.getAll);
    return data;
}
