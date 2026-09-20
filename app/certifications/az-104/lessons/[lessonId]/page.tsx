import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: PageProps) {
  const { lessonId } = await params;

  const supabase = await createClient();

  // Get the lesson
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("id, title, content, sort_order, topic_id")
    .eq("id", lessonId)
    .eq("is_published", true)
    .single();

  if (lessonError || !lesson) {
    return (
      <main className="container section">
        <h1>Lesson not found</h1>
        <p>This lesson is not currently available.</p>

        <Link
          href="/certifications/az-104"
          className="text-link"
        >
          ← Back to AZ-104
        </Link>
      </main>
    );
  }

  // Get the topic
  const { data: topic } = await supabase
    .from("topics")
    .select("id, name")
    .eq("id", lesson.topic_id)
    .eq("is_published", true)
    .single();

  return (
    <main>
      {/* Lesson header */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow">
            AZ-104 · {topic?.name ?? "Learning topic"}
          </div>

          <h1>{lesson.title}</h1>

          <p className="hero-description">
            Lesson {lesson.sort_order}
          </p>
        </div>
      </section>

      {/* Lesson content */}
      <section className="section">
        <div className="container lesson-container">
          <article className="lesson-content">
            {lesson.content
              ?.split("\n")
              .map((line, index) => {
                const trimmed = line.trim();

                if (!trimmed) {
                  return (
                    <div
                      key={index}
                      className="lesson-spacer"
                    />
                  );
                }

                if (trimmed.startsWith("# ")) {
                  return (
                    <h2 key={index}>
                      {trimmed.replace("# ", "")}
                    </h2>
                  );
                }

                if (trimmed.startsWith("## ")) {
                  return (
                    <h3 key={index}>
                      {trimmed.replace("## ", "")}
                    </h3>
                  );
                }

                if (trimmed.startsWith("- ")) {
                  return (
                    <li key={index}>
                      {trimmed.replace("- ", "")}
                    </li>
                  );
                }

                if (/^\d+\.\s/.test(trimmed)) {
                  return (
                    <li key={index}>
                      {trimmed.replace(/^\d+\.\s/, "")}
                    </li>
                  );
                }

                return <p key={index}>{trimmed}</p>;
              })}
          </article>

          {/* Navigation */}
          <div className="lesson-navigation">
            <Link
              href={`/certifications/az-104/topics/${lesson.topic_id}`}
              className="secondary-button"
            >
              ← Back to topic
            </Link>

            <Link
              href="/certifications/az-104"
              className="primary-button"
            >
              Back to AZ-104
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}