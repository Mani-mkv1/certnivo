"use server";

import { createClient } from "@/utils/supabase/server";

export async function checkAnswer(
  questionId: string,
  optionKey: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "check_practice_answer",
    {
      p_question_id: questionId,
      p_option_key: optionKey,
    }
  );

  if (error) {
    return {
      success: false,
      error: "Answer could not be checked.",
    };
  }

  const result = data?.[0];

  if (!result) {
    return {
      success: false,
      error: "Answer could not be checked.",
    };
  }

  return {
    success: true,
    isCorrect: result.is_correct,
    explanation: result.explanation,
    correctOptionKey: result.correct_option_key,
  };
}

export async function getRandomQuestion(
  difficulty?: string
) {
  const supabase = await createClient();

  let query = supabase
    .from("questions")
    .select(
      "id, question_text, difficulty, question_type, topic_id"
    )
    .eq("is_published", true)
    .eq("status", "published");

  if (
    difficulty === "easy" ||
    difficulty === "medium" ||
    difficulty === "hard"
  ) {
    query = query.eq("difficulty", difficulty);
  }

  const { data: questions, error: questionError } =
    await query;

  if (questionError) {
    return {
      success: false,
      error: questionError.message,
    };
  }

  if (!questions || questions.length === 0) {
    return {
      success: false,
      error: "No questions are available for this difficulty.",
    };
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];

  const { data: options, error: optionsError } =
    await supabase.rpc("get_practice_options", {
      p_question_id: question.id,
    });

  if (optionsError) {
    return {
      success: false,
      error: optionsError.message,
    };
  }

  return {
    success: true,
    question,
    options: options ?? [],
  };
}