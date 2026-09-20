import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import PracticeQuestion from "./PracticeQuestion";

type PageProps = {
  searchParams: Promise<{
    difficulty?: string;
  }>;
};

export default async function PracticePage({
  searchParams,
}: PageProps) {
  const { difficulty } = await searchParams;

  const selectedDifficulty =
    difficulty === "easy" ||
    difficulty === "medium" ||
    difficulty === "hard"
      ? difficulty
      : null;

  const supabase = await createClient();

  let query = supabase
    .from("questions")
    .select(
      "id, question_text, difficulty, question_type, topic_id"
    )
    .eq("is_published", true)
    .eq("status", "published");

  if (selectedDifficulty) {
    query = query.eq("difficulty", selectedDifficulty);
  }

  const { data: questions, error } = await query;

  if (error) {
    return (
      <main className="container section">
        <h1>AZ-104 Practice</h1>
        <p>Database error:</p>
        <p>{error.message}</p>
      </main>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <main className="container section">
        <h1>AZ-104 Practice</h1>

        <p>
          No questions found for{" "}
          {selectedDifficulty ?? "all difficulties"}.
        </p>

        <Link
          href="/certifications/az-104/practice"
          className="text-link"
        >
          ← View all questions
        </Link>
      </main>
    );
  }

  const question =
    questions[Math.floor(Math.random() * questions.length)];

  const { data: options, error: optionsError } =
    await supabase.rpc("get_practice_options", {
      p_question_id: question.id,
    });

  if (optionsError) {
    return (
      <main className="container section">
        <h1>AZ-104 Practice</h1>
        <p>Could not load the answer options.</p>
        <p>{optionsError.message}</p>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">
            AZ-104 · Practice
          </div>

          <h1>Test your knowledge.</h1>

          <p className="hero-description">
            Practice with original CertNivo questions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container practice-container">

          <div className="practice-filters">
            <span className="practice-filter-label">
              Difficulty
            </span>

            <div className="practice-filter-buttons">
              <Link
                href="/certifications/az-104/practice"
                className={
                  !selectedDifficulty
                    ? "practice-filter active"
                    : "practice-filter"
                }
              >
                All
              </Link>

              <Link
                href="/certifications/az-104/practice?difficulty=easy"
                className={
                  selectedDifficulty === "easy"
                    ? "practice-filter active"
                    : "practice-filter"
                }
              >
                Easy
              </Link>

              <Link
                href="/certifications/az-104/practice?difficulty=medium"
                className={
                  selectedDifficulty === "medium"
                    ? "practice-filter active"
                    : "practice-filter"
                }
              >
                Medium
              </Link>

              <Link
                href="/certifications/az-104/practice?difficulty=hard"
                className={
                  selectedDifficulty === "hard"
                    ? "practice-filter active"
                    : "practice-filter"
                }
              >
                Hard
              </Link>
            </div>
          </div>

          <div className="practice-current-filter">
            Current filter:{" "}
            <strong>
              {selectedDifficulty ?? "All"}
            </strong>
          </div>

          <PracticeQuestion
            question={question}
            options={options ?? []}
            difficulty={selectedDifficulty ?? undefined}
          />

          <div className="practice-back">
            <Link
              href="/certifications/az-104"
              className="text-link"
            >
              ← Back to AZ-104 learning path
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}