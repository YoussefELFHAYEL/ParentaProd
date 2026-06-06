interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export function Logo({
  className = "",
  size = 38,
  showText = true,
  textColor = "#1B4332",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Parentapedia logo"
      >
        <rect width="40" height="40" rx="9" fill="#1B4332" />
        <text
          x="50%"
          y="53%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="700"
          fontFamily="Georgia, 'Times New Roman', serif"
          letterSpacing="1"
        >
          PP
        </text>
      </svg>
      {showText && (
        <span
          className="text-xl font-heading font-semibold tracking-tight"
          style={{ color: textColor }}
        >
          Parentapedia
        </span>
      )}
    </div>
  );
}
