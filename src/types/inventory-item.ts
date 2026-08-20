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

export type ExpirationOption =
    | "today"
    | "tomorrow"
    | "3-days"
    | "1-week"
    | "2-weeks"
    | "pick-date";


export const EXPIRATION_OPTIONS: {
    id: ExpirationOption;
    label: string;
    days: number | null;
}[] = [
        { id: "today", label: "Today", days: 0 },
        { id: "tomorrow", label: "Tomorrow", days: 1 },
        { id: "3-days", label: "3 Days", days: 3 },
        { id: "1-week", label: "1 Week", days: 7 },
        { id: "2-weeks", label: "2 Weeks", days: 14 },
        { id: "pick-date", label: "Pick Date", days: null },
    ];

export const CATEGORIES: {
    id: CategoryID;
    label: string;
    emoji: string;
}[] = [
        { id: "produce", label: "Produce", emoji: "🥬" },
        { id: "meat", label: "Meat", emoji: "🥩" },
        { id: "dairy", label: "Dairy", emoji: "🥛" },
        { id: "bakery", label: "Bakery", emoji: "🍞" },
        { id: "pantry", label: "Pantry", emoji: "🥫" },
        { id: "frozen", label: "Frozen", emoji: "🧊" },
        { id: "drinks", label: "Drinks", emoji: "🥤" },
        { id: "other", label: "Other", emoji: "🥡" },
    ];

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