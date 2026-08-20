import api from "@/hooks/api";
import type {
    GetInventoryItemsResponse,
    InventoryItem,
} from "@/types/inventory-item";

export async function getInventoryItems(): Promise<InventoryItem[]> {
    const response = await api.get<GetInventoryItemsResponse>(
        "/inventory",
    );

    return response.items;
}