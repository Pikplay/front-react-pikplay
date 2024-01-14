import { create } from 'zustand'

type Store = {
    cart: CardItem[]
    increment: () => void // Regresa vacio porque es un setter
}

export const useStore = create<Store>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
}))
