
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AudienceSegment } from "@/utils/reportData";
import { Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface TargetAudienceProps {
  description: string;
  segments: AudienceSegment[];
  colorAccent: string;
}

export const TargetAudience = ({ description, segments, colorAccent }: TargetAudienceProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate colors based on the accent color
  const generateColors = (count: number, baseColor: string) => {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };
    
    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    
    const rgb = hexToRgb(baseColor);
    const colors = [];
    
    // Create shades of the base color
    for (let i = 0; i < count; i++) {
      const factor = 0.7 + (i * 0.15);
      colors.push(rgbToHex(
        Math.min(255, Math.floor(rgb.r * factor)),
        Math.min(255, Math.floor(rgb.g * factor)),
        Math.min(255, Math.floor(rgb.b * factor))
      ));
    }
    
    return colors;
  };

  const colors = generateColors(segments.length, colorAccent);
  
  const data = segments.map((segment, index) => ({
    name: segment.segment,
    value: segment.percentage,
    color: colors[index % colors.length]
  }));

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(undefined);
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className={cn(
      "p-6 transition-all duration-500 overflow-hidden",
      "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm",
      isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
    )}>
      <div className="flex items-center mb-5">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${colorAccent}20` }}
        >
          <Target className="h-5 w-5" style={{ color: colorAccent }} />
        </div>
        <h2 className="text-lg font-semibold">Target Audience</h2>
      </div>
      
      <p className="mb-6 text-gray-600 dark:text-gray-300">{description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Audience Chart */}
        <div className="h-72 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={handlePieEnter}
                onMouseLeave={handlePieLeave}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    opacity={activeIndex === undefined || activeIndex === index ? 1 : 0.6}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/80 backdrop-blur-sm p-3 rounded shadow text-sm border">
                        <p className="font-medium">{payload[0].name}: {payload[0].value}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Segment details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500">Audience Segments</h3>
          {segments.map((segment, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-2">
                <div 
                  className="w-6 h-6 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <h4 className="text-sm font-medium">{segment.segment} ({segment.percentage}%)</h4>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{segment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
