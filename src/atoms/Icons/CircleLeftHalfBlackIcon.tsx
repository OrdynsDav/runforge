import type { IconProps } from "../types";

export default function CircleLeftHalfBlackIcon({
  width = 15,
  height = 15,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="color">
        <path fill="#FFFFFF" d="M36,45 v-36 a28,28 0 0 1 0 56 z" />
      </g>
      <g id="line">
        <path d="M36,45 v-36 a28,28 0 0 0 0 56 z" />
        <circle
          cx="36"
          cy="36"
          r="28"
          fill="none"
          stroke="#000000"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
