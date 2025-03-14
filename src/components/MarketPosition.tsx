
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Flag, TrendingUp } from "lucide-react";
import { MarketPositionData } from "@/utils/reportData";
import { cn } from "@/lib/utils";

interface MarketPositionProps {
  marketPosition: MarketPositionData;
  colorAccent: string;
}

export const MarketPosition = ({ marketPosition, colorAccent }: MarketPositionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  // Prepare data for bar chart
  const chartData = [
    { name: "Your Brand", score: marketPosition.marketShare },
    ...marketPosition.competitors.map(comp => ({
      name: comp.name,
      score: comp.score > 100 ? 100 : comp.score // Cap at 100
    }))
  ];

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
          <Flag className="h-5 w-5" style={{ color: colorAccent }} />
        </div>
        <h2 className="text-lg font-semibold">Market Position</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-5">
            <h3 className="text-base font-medium">{marketPosition.position}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{marketPosition.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Market Share</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold">{marketPosition.marketShare}%</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Growth Rate</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold">{marketPosition.growthRate}%</span>
                <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
          
          <h3 className="text-sm font-medium text-gray-500 mb-3">Competitor Analysis</h3>
          <div className="space-y-3 stagger-animation">
            {marketPosition.competitors.map((competitor, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{competitor.name}</span>
                  <span className="text-sm">{competitor.score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full" 
                    style={{ 
                      width: `${competitor.score}%`, 
                      backgroundColor: colorAccent
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chart section */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded shadow text-sm border">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm">
                          Score: <span className="font-medium">{payload[0].value}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar 
                dataKey="score" 
                fill={colorAccent} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
