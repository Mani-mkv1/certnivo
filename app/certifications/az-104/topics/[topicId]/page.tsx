import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    topicId: string;
  }>;
};

export default async function TopicPage({ params }: PageProps) {
  const { topicId } = await params;

  const supabase = await createClient();

  const { data: topic, error } = await supabase
    .from("topics")
    .select(
      `
      id,
      name,
      description,
      sort_order,
      domains (
        id,
        name,
        certifications (
          id,
          code,
          title
        )
      )
      `
    )
    .eq("id", topicId)
    .eq("is_published", true)
    .single();

  if (error || !topic) {
    return (
      <main className="container section">
        <h1>Topic not found</h1>
        <p>This topic is not currently available.</p>
      </main>
    );
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("topic_id", topic.id)
    .eq("is_published", true)
    .order("sort_order");

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">
  AZ-104 · Learning topic
</div>

          <h1>{topic.name}</h1>

          <p className="hero-description">
            {topic.description}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">Lessons</div>
            <h2>Learn this topic</h2>
            <p>
              Work through the lessons in order and build your
              understanding step by step.
            </p>
          </div>

          <div className="certification-grid">
            {lessons?.map((lesson) => (
              <article
                className="certification-card"
                key={lesson.id}
              >
                <div className="certification-header">
                  <div className="certification-code">
                    Lesson {lesson.sort_order}
                  </div>
                </div>

                <h3>{lesson.title}</h3>

                <a
                  href={`/certifications/az-104/lessons/${lesson.id}`}
                  className="text-link"
                >
                  Start lesson →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}