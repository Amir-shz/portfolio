import React, { Dispatch, ReactNode, SetStateAction } from "react";

export interface navBtnProps {
  href: string;
  children: ReactNode;
}

export interface socialIconLinkProps {
  size: "sm" | "lg";
  href: string;
  children: ReactNode;
}

export interface homeServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface planCardProps {
  id: number;
  title: string;
  time: string;
  price: string;
  description: string;
  points: string[];
  // plan: string;
}

export interface faqItemProps {
  title: string;
  description: string;
  openNum: number;
  index: number;
  setOpenNum: Dispatch<SetStateAction<number>>;
}

export interface servicesForCompaniesAndPersonsProp {
  title: string;
  type: "person" | "company";
  items: string[];
}

export interface educationAndResumeSectionProps {
  type: "education" | "resume";
  items: string[];
}

export interface searchParamsProp {
  searchParams: Promise<{ show: string; plan: string }>;
}

export interface scheduleDataType {
  date: string;
  available: number;
  hours: { hour: string; isAvailable: boolean }[];
}
export interface filteredWeeksType {
  // dates: object[];

  dates: {
    date: string;
    jalali: { dayName: string; day: string; monthName: string };
  }[];
  page: number;
}

export interface plansType {
  _id: string;
  title: string;
  time: string;
  price: string;
  plan: string;
}

export interface reservationType {
  _id: string;
  fullName: string;
  phone: string;
  selectedTime: string;
  selectedDate: string;
  status: "new" | "finish";
  plan: string;
  description: string;
}

export interface planType {
  _id: string;
  title: string;
  time: string;
  price: string;
  plan: string;
}
