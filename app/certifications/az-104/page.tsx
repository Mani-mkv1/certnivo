import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
export default async function AZ104Page() {
  const supabase = await createClient();

  const { data: certification, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("code", "AZ-104")
    .eq("is_published", true)
    .single();

  if (error || !certification) {
    return (
      <main className="container section">
        <h1>AZ-104 not found</h1>
        <p>
          The certification is not currently available.
        </p>
      </main>
    );
  }

  const { data: domains } = await supabase
    .from("domains")
    .select(
      `
      id,
      name,
      description,
      sort_order,
      topics (
        id,
        name,
        description,
        sort_order
      )
      `
    )
    .eq("certification_id", certification.id)
    .eq("is_published", true)
    .order("sort_order");

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">
            Microsoft Azure Certification
          </div>

          <h1>{certification.code}</h1>

          <p className="hero-description">
            {certification.title}
          </p>

          <p className="hero-description">
            {certification.description}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">
              Learning path
            </div>

            <h2>What you will learn</h2>

            <p>
              Follow the certification structure and work
              through each topic step by step.
            </p>
          </div>

          <div className="certification-grid">
            {domains?.map((domain) => (
              <article
                className="certification-card"
                key={domain.id}
              >
                <div className="certification-header">
                  <div className="certification-code">
                    Domain {domain.sort_order}
                  </div>
                </div>

                <h3>{domain.name}</h3>

                <p>{domain.description}</p>

                <div className="topic-list">
                  {domain.topics
  ?.sort(
    (a, b) =>
      a.sort_order - b.sort_order
  )
  .map((topic) => (
    <Link
      key={topic.id}
      href={`/certifications/az-104/topics/${topic.id}`}
      className="topic-link"
    >
      <span>
        {String(topic.sort_order).padStart(2, "0")}
      </span>

      {topic.name}
    </Link>
  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}