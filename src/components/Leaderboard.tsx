
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  category: string;
  date: string;
}

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard = ({ onBack }: LeaderboardProps) => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Get scores from localStorage
    const storedScores = JSON.parse(localStorage.getItem("quizScores") || "[]");
    setScores(storedScores);
    
    // Trigger animation
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);
  
  const clearLeaderboard = () => {
    if (window.confirm("Are you sure you want to clear all scores?")) {
      localStorage.removeItem("quizScores");
      setScores([]);
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get emoji for position
  const getPositionEmoji = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}.`;
  };

  return (
    <Card className={`shadow-xl ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          🏆 Leaderboard
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {scores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No scores yet!</p>
            <p className="mt-2">Complete a quiz to see your scores here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-12 font-semibold text-sm text-gray-600 py-2 border-b">
              <div className="col-span-1"></div>
              <div className="col-span-3">Name</div>
              <div className="col-span-2 text-center">Score</div>
              <div className="col-span-3 text-center">Category</div>
              <div className="col-span-3 text-right">Date</div>
            </div>
            
            {scores.map((entry, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-12 py-2 ${
                  index % 2 === 0 ? 'bg-gray-50' : ''
                } rounded-lg items-center`}
              >
                <div className="col-span-1 text-center">
                  {getPositionEmoji(index)}
                </div>
                <div className="col-span-3 font-medium">
                  {entry.name || "Anonymous"}
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-semibold">{entry.score}</span>
                  <span className="text-gray-500">/{entry.total}</span>
                </div>
                <div className="col-span-3 text-center capitalize">
                  {entry.category}
                </div>
                <div className="col-span-3 text-right text-sm text-gray-500">
                  {formatDate(entry.date)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button onClick={onBack} className="btn btn-primary">
          Back to Home
        </Button>
        
        {scores.length > 0 && (
          <Button onClick={clearLeaderboard} className="btn btn-danger">
            Clear Leaderboard
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Leaderboard;
