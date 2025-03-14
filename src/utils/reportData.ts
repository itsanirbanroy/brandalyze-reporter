
export interface AIModel {
  id: 'openai' | 'gemini' | 'perplexity';
  name: string;
  logo: string;
  color: string;
}

export interface ScoreCategory {
  name: string;
  score: number;
  description: string;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface CompetitorData {
  name: string;
  score: number;
}

export interface AudienceSegment {
  segment: string;
  percentage: number;
  description: string;
}

export interface MarketPositionData {
  position: string;
  description: string;
  growthRate: number;
  marketShare: number;
  competitors: CompetitorData[];
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  sources: Array<{
    name: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
  }>;
}

export interface BrandReport {
  brandName: string;
  industry: string;
  overallScore: number;
  summary: string;
  logoUrl: string;
  lastUpdated: string;
  strengths: string[];
  weaknesses: string[];
  sentiment: SentimentData;
  targetAudience: {
    primaryDescription: string;
    segments: AudienceSegment[];
  };
  marketPosition: MarketPositionData;
  scoreCategories: ScoreCategory[];
  recommendations: Recommendation[];
}

export interface AIModelReport {
  model: AIModel;
  report: BrandReport;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png',
    color: '#10a37f'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logo: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini_1.max-1300x1300.jpg',
    color: '#4285f4'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    logo: 'https://pbs.twimg.com/profile_images/1754892478002933760/QXN-O__X_400x400.png',
    color: '#6c54d8'
  }
];

export const MOCK_REPORTS: AIModelReport[] = [
  {
    model: AI_MODELS[0], // OpenAI
    report: {
      brandName: 'Acme Technologies',
      industry: 'Software & Technology',
      overallScore: 82,
      summary: 'Acme Technologies has established a strong brand presence in the tech industry with consistent messaging and innovative products. Their digital presence shows good SEO optimization with room for improvement in social media engagement.',
      logoUrl: 'https://placehold.co/400x400/10a37f/FFFFFF/png?text=A',
      lastUpdated: '2023-11-15',
      strengths: [
        'Strong technical blog with high-quality content',
        'Excellent product documentation and resources',
        'Clear brand voice and messaging across channels',
        'High domain authority and backlink profile'
      ],
      weaknesses: [
        'Limited social media engagement metrics',
        'Inconsistent posting schedule on key platforms',
        'Slow response time to negative customer feedback',
        'Mobile optimization issues on some product pages'
      ],
      sentiment: {
        positive: 68,
        neutral: 22,
        negative: 10,
        sources: [
          { name: 'Twitter', sentiment: 'positive', score: 72 },
          { name: 'Reddit', sentiment: 'positive', score: 65 },
          { name: 'News Articles', sentiment: 'positive', score: 80 },
          { name: 'Customer Reviews', sentiment: 'neutral', score: 55 }
        ]
      },
      targetAudience: {
        primaryDescription: 'Tech-savvy professionals and enterprise IT decision-makers between 28-45 years old with a focus on productivity and innovation.',
        segments: [
          { segment: 'IT Professionals', percentage: 45, description: 'Technical decision-makers with focus on implementation and maintenance' },
          { segment: 'Startup Founders', percentage: 30, description: 'Growth-focused entrepreneurs looking for scalable solutions' },
          { segment: 'Enterprise Managers', percentage: 15, description: 'Project managers and team leads in large organizations' },
          { segment: 'Other', percentage: 10, description: 'Students, hobbyists, and other tech enthusiasts' }
        ]
      },
      marketPosition: {
        position: 'Industry Leader',
        description: 'Positioned as a premium solution with cutting-edge technology and exceptional support',
        growthRate: 18,
        marketShare: 24,
        competitors: [
          { name: 'TechGiant', score: 86 },
          { name: 'InnovateCorp', score: 79 },
          { name: 'DevSolutions', score: 74 },
          { name: 'CodeMasters', score: 68 }
        ]
      },
      scoreCategories: [
        { name: 'Brand Recognition', score: 85, description: 'Strong brand recognition within target market segments' },
        { name: 'Digital Presence', score: 78, description: 'Solid website metrics with SEO optimization' },
        { name: 'Content Strategy', score: 82, description: 'High-quality, consistent content with good engagement' },
        { name: 'Social Media', score: 72, description: 'Active presence but room for improved engagement' },
        { name: 'Technical SEO', score: 88, description: 'Excellent site structure and optimization' },
        { name: 'Customer Perception', score: 79, description: 'Mostly positive view with some improvement areas' }
      ],
      recommendations: [
        {
          title: 'Enhance Social Media Engagement',
          description: 'Implement a more consistent posting schedule and increase response rate to user comments and messages.',
          priority: 'high'
        },
        {
          title: 'Optimize Mobile Experience',
          description: 'Address mobile optimization issues on product pages to improve user experience and SEO ranking.',
          priority: 'high'
        },
        {
          title: 'Expand Content Strategy',
          description: 'Develop more video content and interactive resources to engage a broader audience.',
          priority: 'medium'
        },
        {
          title: 'Improve Customer Feedback Loop',
          description: 'Establish a faster response system for customer feedback and implement regular sentiment analysis.',
          priority: 'medium'
        },
        {
          title: 'Leverage Industry Partnerships',
          description: 'Develop co-branded content with complementary services to expand reach and authority.',
          priority: 'low'
        }
      ]
    }
  },
  {
    model: AI_MODELS[1], // Gemini
    report: {
      brandName: 'Acme Technologies',
      industry: 'Software & Technology',
      overallScore: 79,
      summary: 'Acme Technologies demonstrates solid brand positioning with effective digital marketing strategies. Their technical content is excellent but customer engagement shows inconsistencies across platforms.',
      logoUrl: 'https://placehold.co/400x400/4285f4/FFFFFF/png?text=A',
      lastUpdated: '2023-11-15',
      strengths: [
        'Comprehensive product documentation and resources',
        'Strong technical content with high engagement',
        'Good keyword optimization across product pages',
        'Regular industry-leading thought leadership content'
      ],
      weaknesses: [
        'Inconsistent brand messaging on secondary channels',
        'Below-average video content engagement metrics',
        'Customer support response times lag behind competitors',
        'Limited localization for international markets'
      ],
      sentiment: {
        positive: 62,
        neutral: 25,
        negative: 13,
        sources: [
          { name: 'Twitter', sentiment: 'positive', score: 65 },
          { name: 'Reddit', sentiment: 'neutral', score: 58 },
          { name: 'News Articles', sentiment: 'positive', score: 77 },
          { name: 'Customer Reviews', sentiment: 'neutral', score: 52 }
        ]
      },
      targetAudience: {
        primaryDescription: 'Software developers and technical managers in mid-to-large enterprises with emphasis on reliability and scalability.',
        segments: [
          { segment: 'Software Developers', percentage: 52, description: 'Professional developers working with enterprise systems' },
          { segment: 'System Architects', percentage: 23, description: 'Technical decision-makers focused on infrastructure' },
          { segment: 'Technical Managers', percentage: 18, description: 'Team leaders overseeing technical implementation' },
          { segment: 'Other', percentage: 7, description: 'Consultants and independent contractors' }
        ]
      },
      marketPosition: {
        position: 'Strong Competitor',
        description: 'Known for reliable solutions with strong technical support and documentation',
        growthRate: 15,
        marketShare: 21,
        competitors: [
          { name: 'TechGiant', score: 88 },
          { name: 'InnovateCorp', score: 76 },
          { name: 'DevSolutions', score: 73 },
          { name: 'CodeMasters', score: 69 }
        ]
      },
      scoreCategories: [
        { name: 'Brand Recognition', score: 77, description: 'Good recognition but opportunities for improvement' },
        { name: 'Digital Presence', score: 82, description: 'Strong website performance and search visibility' },
        { name: 'Content Strategy', score: 84, description: 'High-quality technical content that resonates with audience' },
        { name: 'Social Media', score: 68, description: 'Inconsistent engagement across platforms' },
        { name: 'Technical SEO', score: 85, description: 'Well-optimized site structure and performance' },
        { name: 'Customer Perception', score: 73, description: 'Generally positive with noted concerns about support' }
      ],
      recommendations: [
        {
          title: 'Standardize Brand Messaging',
          description: 'Develop clear guidelines for brand voice and messaging across all platforms and channels.',
          priority: 'high'
        },
        {
          title: 'Improve Customer Support Systems',
          description: 'Implement faster response protocols and more efficient ticket management systems.',
          priority: 'high'
        },
        {
          title: 'Develop Video Content Strategy',
          description: 'Create more engaging video content with clear educational value for target audience.',
          priority: 'medium'
        },
        {
          title: 'Expand International Presence',
          description: 'Prioritize content localization for key international markets to increase global reach.',
          priority: 'medium'
        },
        {
          title: 'Implement Regular Competitive Analysis',
          description: 'Establish quarterly competitive analysis to identify market trends and opportunities.',
          priority: 'low'
        }
      ]
    }
  },
  {
    model: AI_MODELS[2], // Perplexity
    report: {
      brandName: 'Acme Technologies',
      industry: 'Software & Technology',
      overallScore: 85,
      summary: 'Acme Technologies exhibits excellent brand positioning with strong technical content and developer engagement. Their SEO strategy is well-executed but audience expansion opportunities exist in adjacent markets.',
      logoUrl: 'https://placehold.co/400x400/6c54d8/FFFFFF/png?text=A',
      lastUpdated: '2023-11-15',
      strengths: [
        'Exceptional developer community engagement',
        'Industry-leading technical documentation',
        'Strong organic search performance for key terms',
        'High customer retention and loyalty metrics'
      ],
      weaknesses: [
        'Limited appeal to non-technical decision makers',
        'Underutilization of emerging social platforms',
        'Gaps in competitive positioning messaging',
        'Inconsistent content publication calendar'
      ],
      sentiment: {
        positive: 71,
        neutral: 19,
        negative: 10,
        sources: [
          { name: 'Twitter', sentiment: 'positive', score: 76 },
          { name: 'Reddit', sentiment: 'positive', score: 73 },
          { name: 'News Articles', sentiment: 'positive', score: 82 },
          { name: 'Customer Reviews', sentiment: 'positive', score: 69 }
        ]
      },
      targetAudience: {
        primaryDescription: 'Technical professionals with focus on development efficiency and product innovation, primarily in technology and financial services industries.',
        segments: [
          { segment: 'Developers', percentage: 48, description: 'Professional software engineers and developers' },
          { segment: 'Product Managers', percentage: 25, description: 'Technical product owners and managers' },
          { segment: 'CTO/Technical Directors', percentage: 18, description: 'Executive technical decision makers' },
          { segment: 'Other', percentage: 9, description: 'Technical educators and consultants' }
        ]
      },
      marketPosition: {
        position: 'Innovation Leader',
        description: 'Recognized for technical excellence and continuous innovation in developer tools',
        growthRate: 22,
        marketShare: 26,
        competitors: [
          { name: 'TechGiant', score: 83 },
          { name: 'InnovateCorp', score: 81 },
          { name: 'DevSolutions', score: 76 },
          { name: 'CodeMasters', score: 69 }
        ]
      },
      scoreCategories: [
        { name: 'Brand Recognition', score: 83, description: 'Strong recognition within core technical audience' },
        { name: 'Digital Presence', score: 87, description: 'Excellent website metrics and search visibility' },
        { name: 'Content Strategy', score: 89, description: 'Outstanding technical content with high engagement' },
        { name: 'Social Media', score: 77, description: 'Strong on primary platforms but gaps in coverage' },
        { name: 'Technical SEO', score: 91, description: 'Exceptional optimization and site performance' },
        { name: 'Customer Perception', score: 84, description: 'Very positive perception among core users' }
      ],
      recommendations: [
        {
          title: 'Expand Content for Non-Technical Audience',
          description: 'Develop content specifically tailored to business stakeholders and non-technical decision makers.',
          priority: 'high'
        },
        {
          title: 'Establish Presence on Emerging Platforms',
          description: 'Develop strategy for engaging with audiences on emerging social and community platforms.',
          priority: 'medium'
        },
        {
          title: 'Refine Competitive Positioning',
          description: 'Create clearer differentiation messaging against key competitors in marketing materials.',
          priority: 'high'
        },
        {
          title: 'Implement Consistent Content Calendar',
          description: 'Develop and adhere to a structured content publication schedule across all channels.',
          priority: 'medium'
        },
        {
          title: 'Leverage User Success Stories',
          description: 'Produce more case studies and success stories highlighting real-world implementation.',
          priority: 'low'
        }
      ]
    }
  }
];

export const getReportByModel = (modelId: string): AIModelReport | undefined => {
  return MOCK_REPORTS.find(report => report.model.id === modelId);
};

export const getAllReports = (): AIModelReport[] => {
  return MOCK_REPORTS;
};
