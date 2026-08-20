import { create } from "zustand";
import { InventoryItem } from "@/types/inventory-item";

type InventoryState = {
    items: InventoryItem[];
    isLoading: boolean;
    error: string | null;

    setItems: (items: InventoryItem[]) => void;
    addItem: (item: InventoryItem) => void;
    updateItem: (
        id: string,
        updates: Partial<Omit<InventoryItem, "id">>,
    ) => void;
    removeItem: (id: string) => void;

    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    clearInventory: () => void;
};

export const useInventoryStore = create<InventoryState>((set) => ({
    items: [],
    isLoading: false,
    error: null,

    setItems: (items) => {
        set({
            items,
            error: null,
        });
    },

    addItem: (item) => {
        set((state) => ({
            items: [item, ...state.items],
            error: null,
        }));
    },

    updateItem: (id, updates) => {
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id
                    ? { ...item, ...updates }
                    : item,
            ),
            error: null,
        }));
    },

    removeItem: (id) => {
        set((state) => ({
            items: state.items.filter(
                (item) => item.id !== id,
            ),
            error: null,
        }));
    },

    setLoading: (isLoading) => {
        set({ isLoading });
    },

    setError: (error) => {
        set({ error });
    },

    clearInventory: () => {
        set({
            items: [],
            isLoading: false,
            error: null,
        });
    },
}));