
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Confetti from "../components/Confetti";

interface ResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
  onViewLeaderboard: () => void;
}

const Results = ({ score, total, onRestart, onViewLeaderboard }: ResultsProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const scorePercentage = (score / total) * 100;
  
  // Count up animation for the score
  useEffect(() => {
    if (score > 0) {
      const timer = setTimeout(() => {
        setShowConfetti(true);
      }, 200);
      
      const interval = setInterval(() => {
        setDisplayScore(prev => {
          if (prev < score) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 100);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [score]);
  
  const getMessage = () => {
    if (scorePercentage >= 80) {
      return "Excellent! You're a frontend master! 🏆";
    } else if (scorePercentage >= 60) {
      return "Great job! You know your stuff! 👏";
    } else if (scorePercentage >= 40) {
      return "Good effort! Keep practicing! 👍";
    } else {
      return "Keep learning! You'll get there! 📚";
    }
  };

  return (
    <div className="relative">
      {showConfetti && score / total >= 0.7 && <Confetti />}
      
      <Card className="shadow-xl animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Quiz Results</CardTitle>
          <div className="mt-6 flex justify-center">
            <div className="relative w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full origin-bottom-left transform transition-transform duration-1000 ease-out"
                  style={{ 
                    transform: `rotate(${(displayScore / total) * 360}deg)`,
                    clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)'
                  }}
                ></div>
              </div>
              <div className="bg-white w-28 h-28 rounded-full flex items-center justify-center z-10">
                <div>
                  <div className="text-4xl font-bold text-primary">{displayScore}</div>
                  <div className="text-sm text-gray-500">out of {total}</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="text-center">
          <h3 className="text-xl font-medium mb-2">{getMessage()}</h3>
          
          <div className="flex justify-center my-4 text-3xl">
            {scorePercentage >= 80 && "🎊🎆🎇"}
            {scorePercentage >= 60 && scorePercentage < 80 && "🎉✨👏"}
            {scorePercentage >= 40 && scorePercentage < 60 && "👍👌"}
            {scorePercentage < 40 && "💪📚"}
          </div>
          
          <div className="text-gray-600">
            <p>You answered {score} out of {total} questions correctly.</p>
            <p className="mt-2 text-sm">
              {scorePercentage >= 70
                ? "Amazing! Your frontend knowledge is impressive!"
                : "Keep practicing to improve your score!"}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col md:flex-row gap-3 justify-center">
          <Button onClick={onRestart} className="btn btn-secondary w-full md:w-auto">
            Play Again
          </Button>
          <Button onClick={onViewLeaderboard} className="btn btn-primary w-full md:w-auto">
            View Leaderboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Results;
