export interface GeneratedAppData {
  appName: string;
  tagline: string;
  heroIllustration: string;
  features: {
    title: string;
    description: string;
    illustration: string;
  }[];
  problemStatement: {
    title: string;
    description: string;
    illustration: string;
  };
  solutionStatement: {
    title: string;
    description: string;
    illustration: string;
  };
  targetAudience: {
    title: string;
    description: string;
    illustration: string;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}