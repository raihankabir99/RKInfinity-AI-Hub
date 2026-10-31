export interface AIService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  techStack: string[];
  processSteps: string[];
  timeline: string;
  accent: string;
}

export const AI_SERVICES: AIService[] = [
  {
    id: 'ai-website-dev',
    title: 'AI Website Development',
    shortDesc: 'Modern, high-performance web applications equipped with native AI features, automated search, and responsive design.',
    fullDesc: 'We architect and build tailored web applications that embed intelligent AI capabilities directly into the user experience. From interactive knowledge portals to smart e-commerce interfaces, we integrate modern frontends with secure server endpoints.',
    iconName: 'Globe',
    deliverables: [
      'Custom React / TypeScript / Next.js web application',
      'AI conversational & semantic search integration',
      'Responsive UI with dark/light mode optimization',
      'SEO & accessibility compliance (WCAG AA)'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite / Next.js', 'Gemini API', 'Express'],
    processSteps: ['Discovery & Requirements Mapping', 'UI/UX Wireframing', 'AI Model Integration', 'Testing & Launch'],
    timeline: '2–4 Weeks Delivery',
    accent: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    shortDesc: 'Autonomous pipelines that connect your tools, databases, and APIs to remove repetitive operational friction.',
    fullDesc: 'Eliminate manual bottlenecks with custom AI-powered workflow automations. We build reliable event-driven systems connecting your CRM, communication tools, and data pipelines with autonomous verification logic.',
    iconName: 'Workflow',
    deliverables: [
      'Custom webhook & API pipeline links',
      'Intelligent document extraction & routing',
      'CRM & ERP bi-directional sync',
      'Exception alerting & fallback controls'
    ],
    techStack: ['Python', 'Node.js', 'Zapier / Make', 'Webhooks', 'REST APIs', 'OpenAI / Gemini SDK'],
    processSteps: ['Workflow Mapping Audit', 'Pipeline Blueprinting', 'API Trigger Setup', 'End-to-End Stress Testing'],
    timeline: '1–3 Weeks Delivery',
    accent: 'from-purple-500/20 to-pink-500/10',
  },
  {
    id: 'ai-content-creation',
    title: 'AI Content Creation',
    shortDesc: 'Scalable multi-format content generation pipelines aligned with your unique brand voice and guidelines.',
    fullDesc: 'Empower your marketing and communications team with custom AI content frameworks that generate high-quality articles, social copy, video scripts, and product descriptions while strictly respecting your brand voice.',
    iconName: 'Sparkles',
    deliverables: [
      'Custom brand voice system prompt tuning',
      'Automated editorial calendar pipelines',
      'Multi-variant copywriting generators',
      'Plagiarism & factual validation filters'
    ],
    techStack: ['System Prompt Engineering', 'GPT-4o / Claude 3.5 / Gemini', 'Canva AI API', 'Custom CMS Connectors'],
    processSteps: ['Brand Tone Analysis', 'Prompt Architecture Tuning', 'Generator UI Deployment', 'Editor Onboarding'],
    timeline: '1–2 Weeks Delivery',
    accent: 'from-pink-500/20 to-rose-500/10',
  },
  {
    id: 'ai-seo-solutions',
    title: 'AI SEO Solutions',
    shortDesc: 'Semantic keyword modeling, automated structured data generation, and AI search engine visibility optimization.',
    fullDesc: 'Prepare your brand for both traditional search engines and AI answer engines (ChatGPT, Perplexity, Gemini). We construct AI-first SEO frameworks, JSON-LD schemas, and content cluster maps that maximize organic visibility.',
    iconName: 'Search',
    deliverables: [
      'Semantic keyword & topic cluster mapping',
      'Automated JSON-LD schema & structured metadata',
      'AI Search Engine Optimization (LLM answer optimization)',
      'Programmatic SEO content templates & audits'
    ],
    techStack: ['Google Search Console', 'Perplexity API', 'Schema.org JSON-LD', 'Python SEO Auditing', 'Ahrefs Data Connectors'],
    processSteps: ['Current SEO Audit', 'LLM Visibility Mapping', 'Schema & Metadata Injection', 'Ranking Monitoring'],
    timeline: '2–3 Weeks Delivery',
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    id: 'ai-digital-marketing',
    title: 'AI Digital Marketing',
    shortDesc: 'Data-driven marketing intelligence, predictive campaign modeling, and algorithmic ad optimization.',
    fullDesc: 'Transform customer acquisition with predictive intelligence. We configure AI-driven customer journey personalization, dynamic ad variant generators, and marketing analytics consoles that elevate conversion metrics.',
    iconName: 'TrendingUp',
    deliverables: [
      'Predictive customer segmentation models',
      'Dynamic ad creative generation pipelines',
      'A/B testing automated evaluation engines',
      'Real-time attribution & ROI dashboards'
    ],
    techStack: ['Google Analytics 4', 'MetaData APIs', 'Predictive Analytics SDKs', 'Looker Studio', 'Custom AI Generators'],
    processSteps: ['Campaign Strategy Audit', 'Data Pipeline Integration', 'AI Generator Setup', 'Performance Tuning'],
    timeline: '2–3 Weeks Delivery',
    accent: 'from-amber-500/20 to-yellow-500/10',
  },
  {
    id: 'ai-business-automation',
    title: 'AI Business Automation',
    shortDesc: 'Enterprise-grade intelligence solutions, proprietary knowledge bases, and custom decision-support systems.',
    fullDesc: 'Solve complex corporate challenges with dedicated internal AI systems. We develop private document retrieval (RAG) platforms, decision support consoles, and automated compliance auditing designed for high security.',
    iconName: 'Building2',
    deliverables: [
      'Private RAG knowledge base setup',
      'Role-based permission security (RBAC)',
      'Internal decision-support consoles',
      'Executive briefing synthesis & reporting'
    ],
    techStack: ['Vector Databases (Pinecone / Qdrant)', 'LangChain / LlamaIndex', 'OAuth 2.0 / RBAC', 'PostgreSQL / Firestore'],
    processSteps: ['Security & Compliance Audit', 'Knowledge Vectorization', 'Dashboard UI Assembly', 'Enterprise Rollout'],
    timeline: '3–6 Weeks Delivery',
    accent: 'from-indigo-500/20 to-blue-500/10',
  },
];
