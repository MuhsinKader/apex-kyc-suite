import { getScoreBgGradient } from "@/utils/kycDataParser";

interface MatchScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export const MatchScoreBadge = ({ score, size = "md" }: MatchScoreBadgeProps) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-xl",
    lg: "w-20 h-20 text-2xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${getScoreBgGradient(score)} text-white font-bold flex items-center justify-center shadow-lg`}
    >
      {score}
    </div>
  );
};
