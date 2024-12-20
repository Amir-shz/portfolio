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
