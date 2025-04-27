
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  questions: Question[];
  onFinish: (score: number) => void;
}

const Quiz = ({ questions, onFinish }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Calculate progress
  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);
  
  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (selectedOption) return; // Prevent multiple selections
    
    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Show emoji animation
    setShowEmoji(true);
    
    // Auto advance after 1.5 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        goToNextQuestion();
      } else {
        // Quiz is complete
        onFinish(correct ? score + 1 : score);
      }
    }, 1500);
  };
  
  // Move to next question
  const goToNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowEmoji(false);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  return (
    <Card className="shadow-xl animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span className="text-sm text-gray-500">
            Score: {score}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="text-xl mt-4">{currentQuestion.question}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            disabled={selectedOption !== null}
            className={cn(
              "option-card w-full text-left",
              selectedOption === option && isCorrect && "correct-answer",
              selectedOption === option && !isCorrect && "wrong-answer",
              option === currentQuestion.answer && selectedOption !== null && "correct-answer"
            )}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              {String.fromCharCode(65 + index)}
            </div>
            {option}
            
            {/* Show emoji next to selected option */}
            {selectedOption === option && showEmoji && (
              <span 
                className={`emoji-container ml-auto ${isCorrect ? "animate-bounce" : ""}`}
              >
                {isCorrect ? randomCorrectEmoji() : randomWrongEmoji()}
              </span>
            )}
          </button>
        ))}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="text-gray-500">
          {selectedOption && isCorrect !== null && (
            <span className="font-medium">
              {isCorrect ? "Correct!" : "Incorrect!"}
            </span>
          )}
        </div>
        
        {selectedOption && (
          <Button 
            onClick={
              currentQuestionIndex < questions.length - 1 
                ? goToNextQuestion 
                : () => onFinish(score)
            }
            className="btn btn-primary"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Helper functions for random emojis
const randomCorrectEmoji = () => {
  const emojis = ["🎉", "🥳", "💃", "🕺", "👍", "✨"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const randomWrongEmoji = () => {
  const emojis = ["😢", "😞", "😵", "🤔"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export default Quiz;
