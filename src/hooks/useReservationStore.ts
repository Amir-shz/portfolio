import { ChangeEvent } from "react";
import { create } from "zustand";

type Store = {
  showModal: boolean;
  show: () => void;
  setPlan: (val: number) => void;

  step: 1 | 2 | 3;
  plan: number;
  planData: {
    id: number;
    title: string;
    time: string;
    price: string;
    plan: string;
  }[];
  selectedDate: string;
  selectedTime: string;
  fullName: string;
  phone: string;
  description: string;
  errors: string[];
  hide: () => void;
  handleSelectedDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectedTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFullNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleStep: (val: 1 | 2 | 3) => void;
  handleAddError: (err: string) => void;
  resetDateAndTimeStates: () => void;
  resetAll: () => void;
  resetErrors: () => void;
  setPlanData: (
    val: {
      id: number;
      title: string;
      time: string;
      price: string;
      plan: string;
    }[]
  ) => void;
};

export const useReservationStore = create<Store>()((set) => ({
  step: 1,
  showModal: false,
  plan: 1,
  planData: [],
  selectedDate: "",
  selectedTime: "",
  fullName: "",
  phone: "",
  description: "",
  errors: [],
  show: () => set(() => ({ showModal: true })),
  hide: () => set(() => ({ showModal: false })),
  setPlan: (val: number) => set(() => ({ plan: val })),
  handleSelectedDateChange: (e) => {
    set({ selectedTime: "", selectedDate: e.target.value });
  },
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
    set(() => ({
      selectedDate: "",
      selectedTime: "",
    })),
  resetAll: () =>
    set(() => ({
      step: 1,
      plan: 1,
      selectedDate: "",
      selectedTime: "",
      fullName: "",
      phone: "",
      description: "",
      errors: [],
    })),
  resetErrors: () => set(() => ({ errors: [] })),
  setPlanData: (val) => set(() => ({ planData: val })),
}));
