
import { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface ScoreChartProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
  color?: string;
}

export const ScoreChart = ({
  score,
  size = "md",
  showLabel = true,
  className,
  color = "#10a37f"
}: ScoreChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set default sizes based on the size prop
    let defaultSize = 120;
    if (size === "sm") defaultSize = 80;
    if (size === "lg") defaultSize = 160;
    
    setChartSize(defaultSize);
    
    // Animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [size]);

  // Chart data
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score }
  ];

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (color) return color;
    
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const scoreColor = getScoreColor(score);
  const remainingColor = "#e5e7eb";

  // Calculate stroke width based on size
  const getStrokeWidth = () => {
    if (size === "sm") return 4;
    if (size === "lg") return 8;
    return 6;
  };

  // Calculate font size based on size
  const getFontSize = () => {
    if (size === "sm") return "text-lg";
    if (size === "lg") return "text-4xl";
    return "text-2xl";
  };

  return (
    <div 
      ref={chartRef} 
      className={cn(
        "relative flex items-center justify-center", 
        className
      )}
      style={{ 
        width: chartSize, 
        height: chartSize, 
        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.9)"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={chartSize / 2 - getStrokeWidth() * 2}
            outerRadius={chartSize / 2}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            animationDuration={1500}
            animationBegin={300}
          >
            <Cell key="score" fill={scoreColor} stroke="none" />
            <Cell key="remaining" fill={remainingColor} stroke="none" />
          </Pie>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white/80 backdrop-blur-sm p-2 rounded shadow text-sm border">
                    <p className="font-medium">{payload[0].name}: {payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className={cn("font-semibold", getFontSize())}>{score}</span>
          {size !== "sm" && <span className="text-xs text-gray-500">out of 100</span>}
        </div>
      )}
    </div>
  );
};
