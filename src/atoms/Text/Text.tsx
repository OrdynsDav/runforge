import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import "./Text.css";
import { clsx } from "../../utils/clsx";

export type TextVariant =
  | "display"
  | "title"
  | "body"
  | "bodyStrong"
  | "caption"
  | "label"
  | "badge"
  | "button"
  | "code";

export type TextTone = "default" | "muted" | "danger" | "inverse";

const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  display: "h1",
  title: "h2",
  body: "p",
  bodyStrong: "span",
  caption: "span",
  label: "span",
  badge: "span",
  button: "span",
  code: "code",
};

type TextOwnProps<T extends ElementType> = {
  as?: T;
  variant?: TextVariant;
  tone?: TextTone;
  className?: string;
  children?: ReactNode;
};

type TextProps<T extends ElementType> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

export function Text<T extends ElementType = "span">({
  as,
  variant = "body",
  tone = "default",
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Tag: ElementType = as ?? DEFAULT_TAG[variant];

  return (
    <Tag
      className={clsx(
        "text",
        `text--${variant}`,
        tone !== "default" && `text--${tone}`,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
