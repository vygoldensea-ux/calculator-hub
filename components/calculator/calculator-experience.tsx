"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { ArticleCard } from "@/components/content/article-card";
import { CalculatorField } from "@/components/calculator/calculator-field";
import { CalculatorResultCard } from "@/components/calculator/calculator-result-card";
import { GoldenseaLeadCard } from "@/components/marketing/goldensea-lead-card";
import { MonetizationSlot } from "@/components/marketing/monetization-slot";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ToolCard } from "@/components/tool/tool-card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { trackEvent } from "@/lib/analytics/ga";
import { getCalculatorDefinition } from "@/lib/calculators/registry";
import { getToolBySlug } from "@/lib/site";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { useAuthUser } from "@/lib/supabase/use-auth-user";
import type { ImplementedCalculatorSlug, CalculatorResultView } from "@/types/calculator";
import type { BlogArticle } from "@/types/content";
import type { PersistedCalculationPayload } from "@/types/persistence";
import type { CategoryManifestItem, ToolManifestItem } from "@/types/site";
import { cn } from "@/lib/utils";

type CalculatorExperienceProps = {
  category: CategoryManifestItem;
  relatedArticles: BlogArticle[];
  slug: ImplementedCalculatorSlug;
  tool: ToolManifestItem;
};

export function CalculatorExperience({
  category,
  relatedArticles,
  slug,
  tool,
}: CalculatorExperienceProps) {
  const pathname = usePathname();
  const router = useRouter();
  const definition = getCalculatorDefinition(slug);
  const [values, setValues] = useState(() => ({ ...definition.defaultValues }));
  const [actionMessage, setActionMessage] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuthUser();

  const variantField = definition.variantField;
  const activeVariant =
    definition.variants.find(
      (variant) =>
        variant.value ===
        (variantField ? values[variantField] : definition.variants[0]?.value),
    ) ?? definition.variants[0];
  const resultState = definition.run(values);
  const relatedTools = useMemo(
    () =>
      definition.relatedSlugs
        .map((relatedSlug) => getToolBySlug(relatedSlug))
        .filter((relatedTool): relatedTool is ToolManifestItem => Boolean(relatedTool)),
    [definition.relatedSlugs],
  );

  function updateValue(name: string, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function resetValues() {
    setValues({ ...definition.defaultValues });
    setActionMessage("");
  }

  async function postCalculation(
    url: "/api/calculator-runs" | "/api/saved-calculations",
    result: CalculatorResultView,
  ) {
    const payload: PersistedCalculationPayload = {
      calculatorSlug: slug,
      inputs: values,
      result,
    };

    const response = await fetch(url, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      throw new Error(data?.error || "Something went wrong.");
    }
  }

  async function handleCalculate() {
    if (resultState.status !== "success") {
      return;
    }

    setActionMessage("");
    setIsCalculating(true);

    try {
      trackEvent("calculate", {
        calculator_slug: slug,
      });

      if (user) {
        await postCalculation("/api/calculator-runs", resultState.result);
        setActionMessage("Calculation added to your recent history.");
      } else {
        setActionMessage("Calculated locally. Sign in if you want saved history.");
      }
    } catch (error) {
      setActionMessage(
        error instanceof Error ? error.message : "Could not record the calculation.",
      );
    } finally {
      setIsCalculating(false);
    }
  }

  async function handleSave() {
    if (resultState.status !== "success") {
      return;
    }

    if (!user) {
      trackEvent("cta_click", {
        label: "save_requires_sign_in",
        location: slug,
      });
      router.push(`/auth?next=${encodeURIComponent(pathname || `/calculator/${slug}`)}`);
      return;
    }

    setActionMessage("");
    setIsSaving(true);

    try {
      await postCalculation("/api/saved-calculations", resultState.result);
      trackEvent("save_calculation", {
        calculator_slug: slug,
      });
      setActionMessage("Calculation saved to your account.");
    } catch (error) {
      setActionMessage(
        error instanceof Error ? error.message : "Could not save this calculation.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PageContainer className="space-y-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: `/category/${category.slug}`, label: `${category.title} calculators` },
          { label: tool.title },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="space-y-6">
          <Card className="relative overflow-hidden p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_40%),linear-gradient(135deg,_rgba(255,255,255,0.88),_rgba(245,247,251,0.95))]" />
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                <Badge>{category.title}</Badge>
                <Badge variant="success">Live</Badge>
              </div>
              <h1 className="page-hero-title mt-4 text-[var(--color-text)]">
                {tool.title}
              </h1>
              <p className="page-hero-copy mt-5 text-[var(--color-text-soft)]">
                {tool.intro}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)]">
                {tool.shortDescription}
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {[
                  { label: "Category", value: category.title },
                  { label: "Status", value: "Working calculator" },
                  {
                    label: "Related tools",
                    value: relatedTools.length.toString().padStart(2, "0"),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[var(--radius-lg)] border border-white/80 bg-white/78 p-4 shadow-[var(--shadow-soft)] backdrop-blur"
                  >
                    <p className="text-[var(--text-xs)] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base font-semibold text-[var(--color-text)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader
              eyebrow="Input panel"
              title={activeVariant.label}
              description={activeVariant.description}
            />

            {variantField && definition.variants.length > 1 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {definition.variants.map((variant) => {
                  const active = values[variantField] === variant.value;

                  return (
                    <button
                      key={variant.value}
                      className={cn(
                        "rounded-full px-4 py-2 text-left text-sm font-medium transition-[transform,background-color,color,border-color,box-shadow] duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none",
                        active
                          ? "bg-[var(--color-text)] !text-white shadow-[var(--shadow-soft)]"
                          : "border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-soft)] hover:bg-white",
                      )}
                      onClick={() => updateValue(variantField, variant.value)}
                      aria-pressed={active}
                      type="button"
                    >
                      {variant.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <form className="mt-6" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-4 md:grid-cols-2">
                {activeVariant.fields.map((field) => (
                  <CalculatorField
                    key={`${activeVariant.value}-${field.name}`}
                    field={field}
                    onChange={updateValue}
                    value={values[field.name] ?? ""}
                  />
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 md:flex-row md:items-center md:justify-between">
                <div className="min-h-[5.5rem] space-y-2">
                  <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                    Results update as you type. Use Calculate if you want the
                    result added to recent history, or Save if you want to keep
                    this scenario on your account.
                  </p>
                  {actionMessage ? (
                    <p className="text-sm leading-6 text-[var(--color-brand-strong)]">
                      {actionMessage}
                    </p>
                  ) : null}
                  {!hasSupabaseEnv ? (
                    <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                      Auth and saving stay disabled until Supabase environment
                      variables are configured.
                    </p>
                  ) : null}
                  {hasSupabaseEnv && !user ? (
                    <TrackedLink
                      className="inline-flex text-sm font-medium text-[var(--color-brand-strong)]"
                      href={`/auth?next=${encodeURIComponent(pathname || `/calculator/${slug}`)}`}
                      label="sign_in_to_save"
                      location={slug}
                    >
                      Sign in to save this calculation
                    </TrackedLink>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={resetValues} size="sm" variant="secondary">
                    Reset
                  </Button>
                  <Button
                    disabled={resultState.status !== "success" || isCalculating}
                    onClick={handleCalculate}
                    size="sm"
                    variant="primary"
                  >
                    {isCalculating ? "Recording..." : "Calculate"}
                  </Button>
                  <Button
                    disabled={!hasSupabaseEnv || resultState.status !== "success" || isSaving}
                    onClick={handleSave}
                    size="sm"
                    variant="ghost"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {definition.howToSteps?.length ? (
            <Card className="p-6">
              <SectionHeader
                eyebrow="How to use"
                title="Enter your numbers in a few clear steps"
                description="Use these quick steps to get a reliable result the first time, then review the worked example and explanation below if you want more context."
              />
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {definition.howToSteps.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5"
                  >
                    <p className="text-[var(--text-xs)] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      Step {index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          <Card className="p-6">
            <SectionHeader
              eyebrow="Formula and logic"
              title="Understand how the result is calculated"
              description="These notes explain the formula or interpretation behind the result so you can use the calculator with more confidence."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {definition.explanation.map((section) => (
                <div
                  key={section.title}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5"
                >
                  <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                    {section.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <CalculatorResultCard state={resultState} />
          <MonetizationSlot slot="belowResult" />

          <Card className="p-6">
            <SectionHeader
              eyebrow="Route context"
              title="Need a category view?"
              description="Jump back to the broader category listing or browse the related calculators below."
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/category/${category.slug}`}
                className={buttonStyles({ variant: "secondary" })}
                scroll={false}
              >
                Back to {category.title}
              </Link>
              <Link
                href="/saved"
                className={buttonStyles({ variant: "ghost" })}
                scroll={false}
              >
                Saved tools
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Worked examples"
          title="See how the numbers play out"
          description="These examples mirror real calculator use cases so you can sanity-check the logic before entering your own numbers."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {definition.examples.map((example) => (
            <Card key={example.title} className="p-6">
              <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {example.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                {example.values}
              </p>
              <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-medium leading-7 text-[var(--color-text)]">
                {example.result}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions"
          description="Short answers for the questions people usually have when they sanity-check calculator output."
        />
        <div className="space-y-3">
          {tool.faqItems.map((faq) => (
            <Card key={faq.question} className="p-0">
              <details className="group px-6 py-5">
                <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-[var(--color-text)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                  {faq.answer}
                </p>
              </details>
            </Card>
          ))}
        </div>
      </section>

      {relatedArticles.length > 0 ? (
      <section className="space-y-4">
        <SectionHeader
          eyebrow="Related articles"
          title="Read next"
          description="These guides cover the follow-up questions people often have after running the calculator."
        />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} compact />
            ))}
          </div>
        </section>
      ) : null}

      {relatedTools.length > 0 ? (
        <section className="space-y-4">
          <SectionHeader
            eyebrow="Related calculators"
            title="Keep exploring"
            description="If this result sends you to the next question, these related calculators are the natural places to continue."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedTools.map((relatedTool) => (
              <ToolCard key={relatedTool.slug} tool={relatedTool} />
            ))}
          </div>
        </section>
      ) : null}

      <GoldenseaLeadCard location={`calculator_${slug}`} />
    </PageContainer>
  );
}
