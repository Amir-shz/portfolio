import React, { ReactNode } from "react";

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
  title: string;
  time: string;
  price: string;
  href: string;
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
  searchParams: {
    [key: string]: string | undefined;
  };
}
