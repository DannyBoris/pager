import { create } from "zustand";
import produce from "immer";

interface StoreState {
  form: any;
  initForm: (data: any) => void;
  setForm: (data: any) => void;
}
const useDefaultStore = create<StoreState>((set, get) => ({
  form: null,
  initForm: (data) => set({ form: data }),
  setForm: (data) => set((state) => ({ form: { ...state.form, ...data } })),
}));

export default useDefaultStore;
