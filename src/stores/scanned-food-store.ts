
import { Food } from "@/types/food";
import { create } from "zustand";

export type ScannedFood = Food & {
    quantity: number;
};

type ScannedFoodStore = {
    foods: ScannedFood[];
    addFood: (food: Food) => void;
    removeFood: (code: string) => void;
    increaseQuantity: (code: string) => void;
    decreaseQuantity: (code: string) => void;
    clearFoods: () => void;
};

export const useScannedFoodStore = create<ScannedFoodStore>((set) => ({
    foods: [],

    addFood: (food) =>
        set((state) => {
            const existingFood = state.foods.find(
                (item) => item.code === food.code,
            );

            if (existingFood) {
                return {
                    foods: state.foods.map((item) =>
                        item.code === food.code
                            ? {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                            : item,
                    ),
                };
            }

            return {
                foods: [
                    ...state.foods,
                    {
                        ...food,
                        quantity: 1,
                    },
                ],
            };
        }),

    removeFood: (code) =>
        set((state) => ({
            foods: state.foods.filter(
                (item) => item.code !== code,
            ),
        })),

    increaseQuantity: (code) =>
        set((state) => ({
            foods: state.foods.map((food) =>
                food.code === code
                    ? {
                        ...food,
                        quantity: food.quantity + 1,
                    }
                    : food,
            ),
        })),

    decreaseQuantity: (code) =>
        set((state) => ({
            foods: state.foods.map((food) =>
                food.code === code
                    ? {
                        ...food,
                        quantity: Math.max(1, food.quantity - 1),
                    }
                    : food,
            ),
        })),

    clearFoods: () => set({ foods: [] }),
}));
