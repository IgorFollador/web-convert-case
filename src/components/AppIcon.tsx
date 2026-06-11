type AppIconProps = {
  className?: string;
};

export function AppIcon({ className = 'h-9 w-9' }: AppIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#2563EB" />
      <text
        x="10"
        y="22"
        fontFamily="system-ui, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="white"
      >
        A
      </text>
      <text
        x="18"
        y="22"
        fontFamily="system-ui, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="white"
        fillOpacity="0.6"
      >
        a
      </text>
    </svg>
  );
}
