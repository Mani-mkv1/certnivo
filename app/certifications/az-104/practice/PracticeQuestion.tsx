"use client";

import { useState } from "react";
import { checkAnswer, getRandomQuestion } from "./actions";

type Option = {
  id: string;
  question_id: string;
  option_key: string;
  option_text: string;
  sort_order: number;
};

type Question = {
  id: string;
  question_text: string;
  difficulty: string;
  question_type: string;
  topic_id: string;
};

type Props = {
  question: Question;
  options: Option[];
  difficulty?: string;
};

export default function PracticeQuestion({
  question: initialQuestion,
  options: initialOptions,
  difficulty,
}: Props) {
  const [question, setQuestion] = useState(initialQuestion);
  const [options, setOptions] = useState(initialOptions);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    null
  );
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    isCorrect: boolean;
    explanation: string;
    correctOptionKey: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!selectedOption || submitted) {
      return;
    }

    setLoading(true);
    setError(null);

    const response = await checkAnswer(
      question.id,
      selectedOption
    );

    setLoading(false);

    if (!response.success) {
  setError("Answer could not be checked.");
  return;
}

    setResult({
      isCorrect: response.isCorrect,
      explanation: response.explanation,
      correctOptionKey: response.correctOptionKey,
    });

    setSubmitted(true);
  }

async function handleNextQuestion() {
  setNextLoading(true);
  setError(null);

  const response = await getRandomQuestion(
    difficulty ?? undefined
  );

  setNextLoading(false);

  if (!response.success || !response.question) {
    setError("Could not load the next question.");
    return;
  }

  setQuestion(response.question);
  setOptions(response.options ?? []);
  setSelectedOption(null);
  setSubmitted(false);
  setResult(null);
}

  return (
    <div className="practice-card">
      <div className="practice-header">
        <div>
          <span className="practice-label">AZ-104 Practice</span>
          <h2>Question</h2>
        </div>

        <span
          className={`difficulty-badge difficulty-${question.difficulty}`}
        >
          {question.difficulty}
        </span>
      </div>

      <div className="practice-question">
        {question.question_text}
      </div>

      <div className="practice-options">
        {options.map((option) => {
          const isSelected =
            selectedOption === option.option_key;

          const isCorrect =
            submitted &&
            result?.correctOptionKey === option.option_key;

          const isWrongSelected =
            submitted &&
            isSelected &&
            !result?.isCorrect;

          return (
            <button
              key={option.id}
              type="button"
              className={`practice-option ${
                isSelected ? "selected" : ""
              } ${isCorrect ? "correct" : ""} ${
                isWrongSelected ? "incorrect" : ""
              }`}
              onClick={() => {
                if (!submitted) {
                  setSelectedOption(option.option_key);
                }
              }}
              disabled={submitted}
            >
              <span className="option-key">
                {option.option_key}
              </span>

              <span>{option.option_text}</span>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="practice-error">
          {error}
        </div>
      )}

      {!submitted && (
        <button
          type="button"
          className="primary-button practice-submit"
          onClick={handleSubmit}
          disabled={!selectedOption || loading}
        >
          {loading ? "Checking..." : "Submit Answer"}
        </button>
      )}

      {submitted && result && (
        <div
          className={`practice-result ${
            result.isCorrect ? "result-correct" : "result-incorrect"
          }`}
        >
          <h3>
            {result.isCorrect
              ? "Correct!"
              : "Not quite."}
          </h3>

          {!result.isCorrect && (
            <p>
              Correct answer:{" "}
              <strong>{result.correctOptionKey}</strong>
            </p>
          )}

          <p>{result.explanation}</p>
        </div>
      )}

      {submitted && (
        <button
          type="button"
          className="primary-button practice-next"
          onClick={handleNextQuestion}
          disabled={nextLoading}
        >
          {nextLoading ? "Loading..." : "Next Question →"}
        </button>
      )}
    </div>
  );
}