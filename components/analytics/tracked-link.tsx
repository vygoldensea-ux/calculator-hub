"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { trackEvent } from "@/lib/analytics/ga";

type TrackedLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    label: string;
    location: string;
  };

export function TrackedLink({
  label,
  location,
  onClick,
  scroll = false,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      scroll={scroll}
      onClick={(event) => {
        trackEvent("cta_click", {
          label,
          location,
        });

        onClick?.(event);
      }}
    />
  );
}
