
import { useState, useEffect } from "react";
import Welcome from "../components/Welcome";
import Quiz from "../components/Quiz"; 
import Results from "../components/Results";
import Leaderboard from "../components/Leaderboard";

// Quiz data with all our questions
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which property is used to change text color in CSS?",
    options: ["text-color", "font-color", "color", "background-color"],
    answer: "color"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<script>", "<javascript>", "<js>", "<scripting>"],
    answer: "<script>"
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["styles", "style", "class", "font"],
    answer: "style"
  },
  {
    question: "Which keyword is used to declare a JavaScript variable?",
    options: ["var", "int", "string", "float"],
    answer: "var"
  },
  {
    question: "How do you insert a comment in a CSS file?",
    options: ["// this is comment", "/* this is comment */", "' this is comment", "# this is comment"],
    answer: "/* this is comment */"
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseclick", "onmouseover", "onchange", "onclick"],
    answer: "onclick"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "**", "##"],
    answer: "//"
  },
  {
    question: "Which CSS property controls the font size?",
    options: ["font-style", "text-style", "font-size", "text-size"],
    answer: "font-size"
  },
  {
    question: "How do you call a function named 'myFunction' in JavaScript?",
    options: ["call myFunction()", "call function myFunction()", "myFunction()", "Call.myFunction()"],
    answer: "myFunction()"
  }
];

// Define categories with related questions
const categories = {
  html: [0, 2, 3],
  css: [1, 5, 8],
  javascript: [4, 6, 7, 9]
};

const Index = () => {
  // State to track current app screen
  const [screen, setScreen] = useState("welcome");
  const [category, setCategory] = useState("all");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(quizData);
  
  // Reset quiz based on selected category
  const startQuiz = (selectedCategory: string) => {
    setCategory(selectedCategory);
    
    // Filter questions based on category or use all
    if (selectedCategory !== "all") {
      const categoryIndices = categories[selectedCategory as keyof typeof categories];
      const filteredQuestions = quizData.filter((_, index) => categoryIndices.includes(index));
      setQuestions(filteredQuestions);
    } else {
      setQuestions(quizData);
    }
    
    setScore(0);
    setScreen("quiz");
  };
  
  // Handle quiz completion
  const finishQuiz = (finalScore: number) => {
    setScore(finalScore);
    setScreen("results");
    
    // Save score to leaderboard
    const username = localStorage.getItem("username") || "Player";
    const newScore = {
      name: username,
      score: finalScore,
      total: questions.length,
      category: category,
      date: new Date().toISOString()
    };
    
    // Get existing scores or initialize empty array
    const existingScores = JSON.parse(localStorage.getItem("quizScores") || "[]");
    const updatedScores = [...existingScores, newScore].sort((a, b) => 
      (b.score/b.total) - (a.score/a.total)
    ).slice(0, 10); // Keep only top 10
    
    localStorage.setItem("quizScores", JSON.stringify(updatedScores));
  };
  
  // Reset to welcome screen
  const restartQuiz = () => {
    setScreen("welcome");
  };
  
  // Show leaderboard
  const viewLeaderboard = () => {
    setScreen("leaderboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {screen === "welcome" && (
          <Welcome onStartQuiz={startQuiz} />
        )}
        
        {screen === "quiz" && (
          <Quiz 
            questions={questions} 
            onFinish={finishQuiz}
          />
        )}
        
        {screen === "results" && (
          <Results 
            score={score} 
            total={questions.length}
            onRestart={restartQuiz}
            onViewLeaderboard={viewLeaderboard}
          />
        )}
        
        {screen === "leaderboard" && (
          <Leaderboard onBack={restartQuiz} />
        )}
      </div>
    </div>
  );
};

export default Index;
