import { create } from "zustand";

type Store = {
  step: 1 | 2;
  selectedDate: string;
  selectedTime: string;
  fullName: string;
  phone: string;
  description: string;
  errors: string[];
  handleSelectedDateChange: (e) => void;
  handleSelectedTimeChange: (e) => void;
  handleFullNameChange: (e) => void;
  handlePhoneChange: (e) => void;
  handleDescriptionChange: (e) => void;
  handleStep: (val) => void;
  handleAddError: (err) => void;
  resetDateAndTimeStates: () => void;
  resetAll: () => void;
  resetErrors: () => void;
};

export const useReservationStore = create<Store>()((set) => ({
  step: 1,
  selectedDate: "",
  selectedTime: "",
  fullName: "",
  phone: "",
  description: "",
  errors: [],
  handleSelectedDateChange: (e) =>
    set(() => ({ selectedTime: "", selectedDate: e.target.value })),
  handleSelectedTimeChange: (e) =>
    set(() => ({ selectedTime: e.target.value })),
  handleFullNameChange: (e) => set(() => ({ fullName: e.target.value })),
  handlePhoneChange: (e) => {
    if (e.target.value.length > 11) return;
    if (e.target.value) {
      if (!Number(e.target.value) && e.target.value !== "0") return;
    }
    set(() => ({ phone: e.target.value }));
  },
  handleDescriptionChange: (e) => set(() => ({ description: e.target.value })),
  handleStep: (val) => set(() => ({ step: val })),
  handleAddError: (err) => set((state) => ({ errors: [...state.errors, err] })),
  resetDateAndTimeStates: () =>
    set(() => ({ selectedDate: "", selectedTime: "" })),
  resetAll: () =>
    set(() => ({
      step: 1,
      selectedDate: "",
      selectedTime: "",
      fullName: "",
      phone: "",
      description: "",
      errors: [],
    })),
  resetErrors: () => set(() => ({ errors: [] })),
}));
