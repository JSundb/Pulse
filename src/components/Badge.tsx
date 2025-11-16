type BadgeProps = {
  icon: string;
  label: string;
  color?: 'teal' | 'blue' | 'purple' | 'orange' | 'green';
  size?: 'sm' | 'md' | 'lg';
  earned?: boolean;
  onClick?: () => void;
};

export default function Badge({ icon, label, color = 'teal', size = 'md', earned = true, onClick }: BadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-14',
    md: 'w-16 h-18',
    lg: 'w-20 h-22',
  };

  const iconSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const colorClasses = {
    teal: earned ? 'from-[#3ABFD9] to-[#48D3C1]' : 'from-gray-300 to-gray-400',
    blue: earned ? 'from-[#3ABFD9] to-[#1677C2]' : 'from-gray-300 to-gray-400',
    purple: earned ? 'from-[#8B5CF6] to-[#A78BFA]' : 'from-gray-300 to-gray-400',
    orange: earned ? 'from-[#F5A353] to-[#FBBF24]' : 'from-gray-300 to-gray-400',
    green: earned ? 'from-[#4CCB6D] to-[#34D399]' : 'from-gray-300 to-gray-400',
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 transition-all active:scale-95"
      disabled={!onClick}
    >
      {/* Badge Shape */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        {/* Hexagon background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} ${earned ? 'opacity-100' : 'opacity-40'}`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />
        {/* Icon */}
        <div className={`relative z-10 ${iconSizes[size]} ${earned ? 'text-white' : 'text-gray-500'}`}>
          {icon}
        </div>
        {/* Shine effect for earned badges */}
        {earned && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        )}
      </div>
      {/* Label */}
      <span className={`text-xs text-center ${earned ? 'text-card-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </button>
  );
}
