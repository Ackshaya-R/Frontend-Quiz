
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WelcomeProps {
  onStartQuiz: (category: string) => void;
}

const Welcome = ({ onStartQuiz }: WelcomeProps) => {
  const [username, setUsername] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  
  useEffect(() => {
    // Get username from localStorage or use default
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    // Trigger animation after component mounts
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);
  
  const handleStart = () => {
    // Save username if provided
    if (username.trim()) {
      localStorage.setItem("username", username);
    }
    
    setShowCategories(true);
  };
  
  const handleCategorySelect = (category: string) => {
    onStartQuiz(category);
  };

  return (
    <Card className={`shadow-xl ${isVisible ? 'animate-zoom-in' : 'opacity-0 scale-95'}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-primary">Frontend Quiz Fiesta</CardTitle>
        <CardDescription className="text-xl mt-2">Test your frontend development knowledge!</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!showCategories ? (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-3xl">👨‍💻</span>
              <p className="mt-2 text-lg">Ready to test your skills?</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Your Name (optional)
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-center">Choose a Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button 
                onClick={() => handleCategorySelect("html")}
                className="card bg-orange/10 hover:bg-orange/20 text-center py-6"
              >
                <div className="text-2xl mb-2">📄</div>
                <div className="font-semibold">HTML</div>
              </button>
              
              <button 
                onClick={() => handleCategorySelect("css")}
                className="card bg-primary/10 hover:bg-primary/20 text-center py-6"
              >
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-semibold">CSS</div>
              </button>
              
              <button 
                onClick={() => handleCategorySelect("javascript")}
                className="card bg-secondary/10 hover:bg-secondary/20 text-center py-6"
              >
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-semibold">JavaScript</div>
              </button>
              
              <button 
                onClick={() => handleCategorySelect("all")}
                className="card bg-purple-500/10 hover:bg-purple-500/20 text-center py-6"
              >
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-semibold">All Topics</div>
              </button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center">
        {!showCategories && (
          <Button onClick={handleStart} className="btn btn-primary">
            Start Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Welcome;
