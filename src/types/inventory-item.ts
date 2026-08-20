export type CategoryID =
    | "produce"
    | "meat"
    | "dairy"
    | "bakery"
    | "pantry"
    | "frozen"
    | "drinks"
    | "other";

export type StorageID =
    | "fridge"
    | "freezer"
    | "pantry"
    | "counter"
    | "other";

export type InventoryItem = {
    id: string;
    userId: string;
    name: string;
    emoji?: string;
    quantity: number;
    unit: string;
    category: CategoryID;
    storage: StorageID;
    expirationDate?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
};

export type GetInventoryItemsResponse = {
    items: InventoryItem[];
};

export type CreateInventoryItemResponse = {
    item: InventoryItem;
};