import { ChangeEvent } from "react";
import { create } from "zustand";

type Store = {
  // FOR SELECT A PLAN BY CLIENT
  plan: number;
  setPlan: (val: number) => void;

  // FOR SHOW MODAL IN DESKTOP SIZE (for reservation)
  showModal: boolean;
  show: () => void;
  hide: () => void;

  // FOR RESERVATION STEP (mobile & desktop)
  // STEP 1 => SELECT DATE AND TIME
  // STEP 2 => FILL OUT THE INFORMATION FORM
  // STEP 3 => CONGRATS AND FINISH
  step: 1 | 2 | 3;
  handleStep: (val: 1 | 2 | 3) => void;

  //
  // CLIENT AND RESERVATION INFORMATION (controlled inputs)
  //

  // * selected date *
  selectedDate: string;
  handleSelectedDateChange: (e: ChangeEvent<HTMLInputElement>) => void;

  // * selected time *
  selectedTime: string;
  handleSelectedTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;

  // * fullname *
  fullName: string;
  handleFullNameChange: (e: ChangeEvent<HTMLInputElement>) => void;

  // * phone *
  phone: string;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;

  // * description *
  description: string;
  handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  // RESET SELECTED DATE AND TIME WHEN change weeks page OR handle submit OR close modal
  resetDateAndTimeStates: () => void;

  // FORM HANDLING ERRORS
  errors: string[];
  handleAddError: (err: string) => void;
  resetErrors: () => void;

  // RESET ALL STATE WHEN CLOSING THE RESERVATION OR FINSH THE RESERVATION
  resetAll: () => void;
};

export const useReservationStore = create<Store>()((set) => ({
  // FOR SELECT A PLAN BY CLIENT
  plan: 1,
  setPlan: (val: number) => set(() => ({ plan: val })),

  // FOR SHOW MODAL IN DESKTOP SIZE (for reservation)
  showModal: false,
  show: () => set(() => ({ showModal: true })),
  hide: () => set(() => ({ showModal: false })),

  // FOR RESERVATION STEP (mobile & desktop)
  step: 1,
  handleStep: (val) => set(() => ({ step: val })),

  //
  // CLIENT AND RESERVATION INFORMATION (controlled inputs)
  //

  // * selected date *
  selectedDate: "",
  handleSelectedDateChange: (e) => {
    set({ selectedTime: "", selectedDate: e.target.value });
  },

  // * selected time *
  selectedTime: "",
  handleSelectedTimeChange: (e) =>
    set(() => ({ selectedTime: e.target.value })),

  // * fullname *
  fullName: "",
  handleFullNameChange: (e) => set(() => ({ fullName: e.target.value })),

  // * phone *
  phone: "",
  handlePhoneChange: (e) => {
    if (e.target.value.length > 11) return;
    if (e.target.value) {
      if (!Number(e.target.value) && e.target.value !== "0") return;
    }
    set(() => ({ phone: e.target.value }));
  },

  // * description *
  description: "",
  handleDescriptionChange: (e) => set(() => ({ description: e.target.value })),

  // RESET SELECTED DATE AND TIME WHEN change weeks page OR handle submit OR close modal
  resetDateAndTimeStates: () =>
    set(() => ({
      selectedDate: "",
      selectedTime: "",
    })),

  // FORM HANDLING ERRORS
  errors: [],
  handleAddError: (err) => set((state) => ({ errors: [...state.errors, err] })),
  resetErrors: () => set(() => ({ errors: [] })),

  // RESET ALL STATE WHEN CLOSING THE RESERVATION OR FINSH THE RESERVATION
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
}));
