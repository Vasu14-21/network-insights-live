import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { quizQuestions, QuizQuestion } from '@/data/quizQuestions';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnswerState {
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  isAnswered: boolean;
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>(
    quizQuestions.map(() => ({ selectedAnswer: null, isCorrect: null, isAnswered: false }))
  );
  const [showResults, setShowResults] = useState(false);

  const question = quizQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  const handleAnswer = (optionIndex: number) => {
    if (currentAnswer.isAnswered) return;

    const isCorrect = optionIndex === question.correctAnswer;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      selectedAnswer: optionIndex,
      isCorrect,
      isAnswered: true
    };
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(quizQuestions.map(() => ({ selectedAnswer: null, isCorrect: null, isAnswered: false })));
    setShowResults(false);
  };

  const correctCount = answers.filter(a => a.isCorrect).length;
  const answeredCount = answers.filter(a => a.isAnswered).length;

  if (showResults) {
    return (
      <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto animate-slide-in">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 animate-success-pop">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-3xl font-bold mb-4 neon-text">Quiz Complete!</h3>
          <p className="text-xl text-muted-foreground mb-6">
            You scored <span className="text-primary font-bold">{correctCount}</span> out of <span className="text-primary font-bold">{quizQuestions.length}</span>
          </p>
          <div className="flex gap-2 justify-center mb-8">
            {answers.map((answer, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm transition-all",
                  answer.isCorrect 
                    ? "bg-success/20 text-success border border-success" 
                    : "bg-destructive/20 text-destructive border border-destructive"
                )}
              >
                {answer.isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </div>
            ))}
          </div>
          <Button onClick={resetQuiz} variant="neon" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-sm text-muted-foreground">
          Question {currentQuestion + 1}/{quizQuestions.length}
        </span>
        <div className="flex gap-1.5">
          {quizQuestions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={cn(
                "w-8 h-2 rounded-full transition-all",
                idx === currentQuestion && "bg-primary neon-glow",
                idx !== currentQuestion && answers[idx].isAnswered && answers[idx].isCorrect && "bg-success",
                idx !== currentQuestion && answers[idx].isAnswered && !answers[idx].isCorrect && "bg-destructive",
                idx !== currentQuestion && !answers[idx].isAnswered && "bg-muted"
              )}
            />
          ))}
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          question.difficulty === 'simple' ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
        )}>
          {question.difficulty}
        </span>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, idx) => {
          const isSelected = currentAnswer.selectedAnswer === idx;
          const isCorrectAnswer = idx === question.correctAnswer;
          const showCorrect = currentAnswer.isAnswered && isCorrectAnswer;
          const showWrong = currentAnswer.isAnswered && isSelected && !isCorrectAnswer;

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={currentAnswer.isAnswered}
              className={cn(
                "w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-4 group",
                !currentAnswer.isAnswered && "bg-secondary border border-border hover:border-primary/50 hover:bg-secondary/80",
                showCorrect && "bg-success/20 border-2 border-success animate-success-pop",
                showWrong && "bg-destructive/20 border-2 border-destructive animate-shake",
                isSelected && !currentAnswer.isAnswered && "border-primary"
              )}
            >
              <span className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm shrink-0 transition-all",
                !currentAnswer.isAnswered && "bg-muted group-hover:bg-primary/20 group-hover:text-primary",
                showCorrect && "bg-success text-success-foreground",
                showWrong && "bg-destructive text-destructive-foreground"
              )}>
                {showCorrect ? <Check className="w-4 h-4" /> : showWrong ? <X className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
              </span>
              <span className={cn(
                "flex-1",
                showCorrect && "text-success font-medium",
                showWrong && "text-destructive"
              )}>
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {currentAnswer.isAnswered && (
        <div className={cn(
          "p-4 rounded-xl mb-6 animate-slide-in",
          currentAnswer.isCorrect ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
        )}>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Explanation: </span>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          variant={currentAnswer.isAnswered ? "default" : "outline"}
          onClick={nextQuestion}
          disabled={!currentAnswer.isAnswered}
        >
          {currentQuestion === quizQuestions.length - 1 ? 'View Results' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
