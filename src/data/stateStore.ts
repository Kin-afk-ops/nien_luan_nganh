import { create } from "zustand";

interface FilterInterface {
    price?: string;
    status?: string;
    size?: string;
    isFreeShip?: string; // Mới thêm cho filter isFreeShip
    [key: string]: string | undefined; // Chỉ cho phép string, không có array
}

interface GlobalState {
    filterList: FilterInterface;
    isResetFilterList: boolean;
    setIsResetFilterList: () => void;
    setFilter: (key: keyof FilterInterface, value: string) => void;
    removeFilter: (key: keyof FilterInterface) => void;
    resetFilter: () => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
    filterList: {
        price: "",
        status: "",
        size: "",
        isFreeShip:"",
    },
    isResetFilterList: false,
    
    setIsResetFilterList: () => 
        set((state) => ({ isResetFilterList: !state.isResetFilterList })),

    setFilter: (key, value) =>
        set((state) => ({
            filterList: { 
                ...state.filterList, 
                [key]: value // Chỉ lưu 1 giá trị, không thêm vào mảng
            }
        })),

    removeFilter: (key) =>
        set((state) => {
            let updatedFilter = { ...state.filterList };
            delete updatedFilter[key]; // Xóa bộ lọc theo key
            return { filterList: updatedFilter };
        }),

    resetFilter: () => set({ filterList: {} }),
}));
