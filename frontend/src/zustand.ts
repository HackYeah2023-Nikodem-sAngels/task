import { create } from "zustand";
import { SetupData } from "./routes/Setup";

interface DataStore {
    data: SetupData;
    setData: (data: SetupData) => void;
}
export const useDataStore = create<DataStore>((set) => ({
    data: "",
    setData: (data) => set({ data }),
}));
