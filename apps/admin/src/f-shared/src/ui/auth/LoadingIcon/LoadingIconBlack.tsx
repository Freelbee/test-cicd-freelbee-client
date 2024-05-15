import React from 'react';

type Props = {
  className?: string
}

export function LoadingIconBlack(props: Props) {
  const { className = `` } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      version="1"
      viewBox="0 0 128 128"
    >
      <g>
        <path
          fill="#282c38"
          d="M75.4 126.63a11.43 11.43 0 01-2.1-22.65 40.9 40.9 0 0030.5-30.6 11.4 11.4 0 1122.27 4.87h.02a63.77 63.77 0 01-47.8 48.05v-.02a11.38 11.38 0 01-2.93.37z"
        ></path>
        <animateTransform
          attributeName="transform"
          dur="550ms"
          from="0 64 64"
          repeatCount="indefinite"
          to="360 64 64"
          type="rotate"
        ></animateTransform>
      </g>
    </svg>
  );
}
