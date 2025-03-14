
import { useState, useEffect } from "react";
import { SentimentData } from "@/utils/reportData";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentAnalysisProps {
  sentiment: SentimentData;
  colorAccent: string;
}

export const SentimentAnalysis = ({ sentiment, colorAccent }: SentimentAnalysisProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { name: "Positive", value: sentiment.positive, color: "#10b981" },
    { name: "Neutral", value: sentiment.neutral, color: "#f59e0b" },
    { name: "Negative", value: sentiment.negative, color: "#ef4444" }
  ];

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card className={cn(
      "p-6 transition-all duration-500 overflow-hidden",
      "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm",
      isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
    )}>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold">Brand Sentiment</h2>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">{sentiment.positive}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-sm">{sentiment.neutral}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">{sentiment.negative}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment Pie Chart */}
        <div className="h-72 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                onMouseEnter={handlePieEnter}
                onMouseLeave={handlePieLeave}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="none"
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
        
        {/* Source breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500">Sentiment by Source</h3>
          {sentiment.sources.map((source, index) => (
            <div 
              key={index} 
              className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                style={{ backgroundColor: source.sentiment === 'positive' ? '#dcfce7' : source.sentiment === 'neutral' ? '#fef3c7' : '#fee2e2' }}
              >
                {source.sentiment === 'positive' ? (
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                ) : source.sentiment === 'negative' ? (
                  <ThumbsDown className="h-4 w-4 text-red-600" />
                ) : (
                  <Minus className="h-4 w-4 text-amber-600" />
                )}
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="text-sm font-medium truncate">{source.name}</h4>
                <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${source.score}%`,
                      backgroundColor: source.sentiment === 'positive' ? '#10b981' : source.sentiment === 'neutral' ? '#f59e0b' : '#ef4444'
                    }}
                  ></div>
                </div>
              </div>
              <span className="ml-3 text-sm font-medium">{source.score}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
