
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrengthWeaknessProps {
  strengths: string[];
  weaknesses: string[];
  colorAccent: string;
}

export const StrengthWeakness = ({ strengths, weaknesses, colorAccent }: StrengthWeaknessProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-500",
      "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm",
      isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
    )}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Strengths Section */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${colorAccent}20` }}
            >
              <CheckCircle2 className="h-5 w-5" style={{ color: colorAccent }} />
            </div>
            <h2 className="text-lg font-semibold">Strengths</h2>
          </div>
          
          <ul className="space-y-4 stagger-animation">
            {strengths.map((strength, index) => (
              <li 
                key={index} 
                className="flex items-start bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{strength}</p>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Weaknesses Section */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${colorAccent}20` }}
            >
              <XCircle className="h-5 w-5" style={{ color: colorAccent }} />
            </div>
            <h2 className="text-lg font-semibold">Weaknesses</h2>
          </div>
          
          <ul className="space-y-4 stagger-animation">
            {weaknesses.map((weakness, index) => (
              <li 
                key={index} 
                className="flex items-start bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{weakness}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
