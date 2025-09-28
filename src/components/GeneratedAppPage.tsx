import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Target,
  Lightbulb,
  Users,
  CheckCircle,
  Rocket,
  Paintbrush,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneratedAppData } from '@/types';
import { SparkleIcon } from './icons/SparkleIcon';
const illustrationMap: { [key: string]: React.ElementType } = {
  idea: Lightbulb,
  features: Zap,
  users: Users,
  problem: Target,
  solution: CheckCircle,
  rocket: Rocket,
  design: Paintbrush,
  code: Code,
  default: SparkleIcon,
};
const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={`py-16 md:py-24 ${className}`}
  >
    {children}
  </motion.section>
);
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-heading text-center mb-12 text-foreground">
    {children}
  </h2>
);
export const GeneratedAppPage: React.FC<{
  data: GeneratedAppData;
  onReset: () => void;
}> = ({ data, onReset }) => {
  const getIllustration = (key: string) => {
    const lowerKey = key.toLowerCase();
    // Ordered to prevent "problem" matching before "solution" if both are present
    const orderedKeys = ['solution', 'problem', 'features', 'users', 'idea', 'rocket', 'design', 'code'];
    for (const mapKey of orderedKeys) {
      if (lowerKey.includes(mapKey)) {
        return illustrationMap[mapKey];
      }
    }
    return illustrationMap.default;
  };
  const HeroIllustration = getIllustration(data.heroIllustration);
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SparkleIcon className="w-6 h-6 text-primary" />
            <span className="font-heading text-xl">{data.appName}</span>
          </div>
          <Button
            onClick={onReset}
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Generate New
          </Button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Section className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
          >
            <HeroIllustration className="w-24 h-24 mx-auto mb-8 text-primary" />
            <h1 className="text-6xl md:text-8xl font-heading mb-4 text-foreground">
              {data.appName}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {data.tagline}
            </p>
          </motion.div>
        </Section>
        <Section>
          <SectionTitle>Features</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.map((feature, index) => {
              const FeatureIcon = getIllustration(feature.illustration);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 border-2 border-transparent hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-2xl">
                    <CardHeader>
                      <div className="mb-4">
                        <FeatureIcon className="w-10 h-10 text-primary" />
                      </div>
                      <CardTitle className="font-heading text-2xl">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Section>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <SectionTitle>{data.problemStatement.title}</SectionTitle>
              <p className="text-lg text-muted-foreground">
                {data.problemStatement.description}
              </p>
            </div>
            <div>
              {(() => {
                const Illustration = getIllustration(data.problemStatement.illustration);
                return <Illustration className="w-48 h-48 mx-auto text-destructive/50" />;
              })()}
            </div>
          </div>
        </Section>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              {(() => {
                const Illustration = getIllustration(data.solutionStatement.illustration);
                return <Illustration className="w-48 h-48 mx-auto text-green-500/50" />;
              })()}
            </div>
            <div className="text-center md:text-left order-1 md:order-2">
              <SectionTitle>{data.solutionStatement.title}</SectionTitle>
              <p className="text-lg text-muted-foreground">
                {data.solutionStatement.description}
              </p>
            </div>
          </div>
        </Section>
        <Section>
          <div className="text-center max-w-3xl mx-auto">
            <SectionTitle>{data.targetAudience.title}</SectionTitle>
            {(() => {
              const Illustration = getIllustration(data.targetAudience.illustration);
              return <Illustration className="w-24 h-24 mx-auto mb-8 text-blue-500/50" />;
            })()}
            <p className="text-lg text-muted-foreground">
              {data.targetAudience.description}
            </p>
          </div>
        </Section>
        <Section>
          <div className="bg-primary/10 rounded-2xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">
              {data.cta.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {data.cta.description}
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              {data.cta.buttonText}
            </Button>
          </div>
        </Section>
      </main>
      <footer className="text-center py-8 text-muted-foreground">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
};