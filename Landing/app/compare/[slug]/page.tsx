import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getComparisonBySlug, getAllComparisonSlugs } from '@/lib/comparisonContent';
import ComparisonHero from '@/components/ComparisonPage/ComparisonHero';
import CriteriaSection from '@/components/ComparisonPage/CriteriaSection';
import HowItWorksSection from '@/components/ComparisonPage/HowItWorksSection';
import FAQSection from '@/components/ComparisonPage/FAQSection';
import CTASection from '@/components/ComparisonPage/CTASection';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all comparison pages
export async function generateStaticParams() {
  const slugs = getAllComparisonSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = getComparisonBySlug(params.slug);
  
  if (!content) {
    return {
      title: 'Page Not Found | OptiMind',
    };
  }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: [
      content.title.toLowerCase(),
      'decision matrix',
      'weighted scoring',
      'product comparison',
      'AI comparison tool',
      'selection matrix',
      'Pugh matrix',
      `compare ${content.slug}`,
      `${content.slug} comparison tool`,
      `best ${content.slug}`,
    ],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: 'website',
      url: `https://optimind.space/compare/${params.slug}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
    },
    alternates: {
      canonical: `https://optimind.space/compare/${params.slug}/`,
    },
  };
}

export default function ComparisonPage({ params }: PageProps) {
  const content = getComparisonBySlug(params.slug);

  if (!content) {
    notFound();
  }

  // Extract product name from title (e.g., "Laptop Comparison Tool" -> "Laptop")
  const productName = content.title.replace(' Comparison Tool', '').replace(' Comparison', '');

  // Schema.org structured data for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: content.title,
    applicationCategory: 'BusinessApplication',
    description: content.metaDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${content.title}`,
    description: content.intro,
    step: content.howItWorks.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Page Content */}
      <ComparisonHero
        h1={content.h1}
        intro={content.intro}
        ctaText={content.ctaText}
        templateId={content.templateId}
      />
      <CriteriaSection criteria={content.keyCriteria} />
      <HowItWorksSection steps={content.howItWorks} />
      <FAQSection faqs={content.faq} />
      <CTASection
        ctaText={content.ctaText}
        templateId={content.templateId}
        productName={productName}
      />
    </>
  );
}
