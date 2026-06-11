type AppIconProps = {
  className?: string;
};

export function AppIcon({ className = 'h-9 w-9' }: AppIconProps) {
  return (
    <img
      src="/icon.png"
      alt=""
      className={`${className} rounded-lg object-cover shadow-sm`}
      width={36}
      height={36}
    />
  );
}
