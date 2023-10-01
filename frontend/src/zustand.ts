import { create } from "zustand";
import { SetupData } from "./routes/Setup";

interface UserDataStore {
    data: SetupData;
    setData: (data: SetupData) => void;
}
export const useUserDataStore = create<UserDataStore>((set) => ({
    data: "",
    setData: (data) => set({ data }),
}));
