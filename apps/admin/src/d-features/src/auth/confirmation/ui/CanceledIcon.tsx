type Props = {
  className?: string
}

export function CanceledIcon(props: Props) {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="140"
      fill="none"
      viewBox="0 0 140 140"
      className={className}
    >
      <path
        stroke="#DF2323"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M70 128.333c32.084 0 58.334-26.25 58.334-58.334 0-32.083-26.25-58.333-58.334-58.333-32.083 0-58.333 26.25-58.333 58.333 0 32.084 26.25 58.334 58.333 58.334zM53.491 86.508L86.508 53.49M86.508 86.508L53.49 53.49"
      ></path>
    </svg>
  );
}
