import { avataaars, dylan, lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Expand short form (#ABC → #AABBCC)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) {
    throw new Error("Invalid hex color.");
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const hexToHexWithAlpha = (hex: string, alpha: number): string => {
  // Remove # if present
  hex = hex.replace("#", "");

  // If short hex (#abc), convert to full hex (#aabbcc)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Clamp alpha to [0,1] and convert to 0–255, then to hex
  const alphaInt = Math.round(Math.min(1, Math.max(0, alpha)) * 255);
  const alphaHex = alphaInt.toString(16).padStart(2, "0").toUpperCase();

  return `#${hex}${alphaHex}`;
};

export const getAlphaValue = (input: number) => {
  return 1 - (input - 1) * 0.25;
};

export const formatHours = (value: number) => {
  if (value === 0.5) return "30 mins";

  const isHalf = value % 1 !== 0;
  const fullHours = Math.floor(value);
  const isSingular = value < 2;

  const hourLabel = isSingular ? "hour" : "hours";

  if (isHalf) {
    return `${fullHours}½ ${hourLabel}`;
  } else {
    return `${value} ${hourLabel}`;
  }
};

export type AvatarStyle = typeof lorelei | typeof dylan | typeof avataaars;

export const generateAvatars = (seed: string) => {
  const styles: AvatarStyle[] = [lorelei, dylan, avataaars];
  const selectedStyle = styles[
    Math.floor(Math.random() * styles.length)
  ] as any;

  return createAvatar(selectedStyle, {
    seed,
    scale: selectedStyle !== lorelei ? 50 : 80,
    radius: selectedStyle === dylan ? 50 : 0,
  }).toString();
};

export const scaleFont = (size: number, width: number) => (width / 375) * size;

export const convertDuration = (d: string) => {
  const splitted = d.replace(" mins", "").trim().split(":");
  return splitted.length > 1
    ? Number(splitted[0]) * 60 + Number(splitted[1])
    : Number(splitted[0]) * 60;
};

export const formatDuration = (d: number): string => {
  const minutes = Math.floor(d / 60);
  const seconds = Math.floor(d % 60);
  const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${paddedSeconds}`;
};
