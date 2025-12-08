type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={`
        mx-auto max-w-6xl px-4 sm:px-6 lg:px-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}
