import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GeneratedAppPage } from '@/components/GeneratedAppPage';
import { chatService } from '@/lib/chat';
import { GeneratedAppData } from '@/types';
import { SparkleIcon } from '@/components/icons/SparkleIcon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Toaster, toast } from 'sonner';
type AppState = 'input' | 'loading' | 'display' | 'error';
const PROMPT_TEMPLATE = `
You are an expert Product Manager and Brand Strategist. Your task is to take a user's raw app idea and transform it into a complete, structured, and compelling project presentation.
The user's idea is: "{USER_INPUT}"
Generate a JSON object that strictly follows this structure. Do not add any extra text, comments, or explanations outside of the JSON object. Your entire response must be only the JSON object itself.
{
  "appName": "A creative and catchy name for the app",
  "tagline": "A short, memorable tagline that captures the app's essence",
  "heroIllustration": "A simple keyword for a hero illustration (e.g., 'rocket', 'idea', 'connection')",
  "features": [
    {
      "title": "Feature 1 Title",
      "description": "A concise description of the first key feature.",
      "illustration": "A simple keyword for an illustration (e.g., 'zap', 'shield', 'chart')"
    },
    {
      "title": "Feature 2 Title",
      "description": "A concise description of the second key feature.",
      "illustration": "A simple keyword for an illustration (e.g., 'collaboration', 'automation', 'search')"
    },
    {
      "title": "Feature 3 Title",
      "description": "A concise description of the third key feature.",
      "illustration": "A simple keyword for an illustration (e.g., 'design', 'code', 'analytics')"
    }
  ],
  "problemStatement": {
    "title": "The Problem",
    "description": "A clear and relatable description of the problem the app solves.",
    "illustration": "A simple keyword for an illustration (e.g., 'problem', 'confusion', 'target')"
  },
  "solutionStatement": {
    "title": "Our Solution",
    "description": "A compelling explanation of how the app solves the problem.",
    "illustration": "A simple keyword for an illustration (e.g., 'solution', 'clarity', 'check-circle')"
  },
  "targetAudience": {
    "title": "Who It's For",
    "description": "A profile of the ideal user for this application.",
    "illustration": "A simple keyword for an illustration (e.g., 'users', 'team', 'developer')"
  },
  "cta": {
    "title": "Ready to Get Started?",
    "description": "A final, engaging call-to-action to encourage users.",
    "buttonText": "Launch Now"
  }
}
`;
const LoadingState = () => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
    <motion.div
      animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <SparkleIcon className="w-24 h-24 text-primary" />
    </motion.div>
    <p className="font-heading text-3xl mt-8 text-foreground">
      Sparking your design...
    </p>
  </div>
);
export function HomePage() {
  const [appState, setAppState] = useState<AppState>('input');
  const [inputText, setInputText] = useState('');
  const [generatedData, setGeneratedData] = useState<GeneratedAppData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cleanup function to abort fetch on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast.error('Please describe your app idea first!');
      return;
    }
    setAppState('loading');
    setError(null);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const prompt = PROMPT_TEMPLATE.replace('{USER_INPUT}', inputText);
      
      // Use a non-streaming call to get the full response
      const response = await chatService.sendMessage(prompt, undefined, undefined, signal);

      if (!response) {
        throw new Error("Received an empty response from the AI.");
      }

      // Extract JSON from the response, handling potential markdown code blocks
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
      if (!jsonMatch) {
        throw new Error("AI did not return a valid JSON object.");
      }
      
      const jsonString = jsonMatch[1] || jsonMatch[2];
      const data = JSON.parse(jsonString);

      setGeneratedData(data);
      setAppState('display');
    } catch (e: any) {
      if (e.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }
      console.error('Generation failed:', e);
      setError(
        'Sorry, the AI failed to generate a design. It might be a bit busy. Please try again.'
      );
      setAppState('error');
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleReset = () => {
    setAppState('input');
    setGeneratedData(null);
    setInputText('');
    setError(null);
  };
  return (
    <>
      <Toaster richColors position="top-center" />
      <AnimatePresence>
        {appState === 'loading' && <LoadingState />}
      </AnimatePresence>
      {appState !== 'display' ? (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent to-70% opacity-50"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-2xl text-center z-10"
          >
            <SparkleIcon className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-5xl md:text-7xl font-heading mb-4 text-foreground">
              DesignSpark AI
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12">
              Describe your app idea, and we'll generate a stunning presentation
              page for it.
            </p>
            <div className="space-y-4">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g., A mobile app that helps users find and book dog-walking services in their area."
                className="min-h-[120px] text-lg p-4 rounded-2xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-background/80"
                rows={4}
              />
              <Button
                onClick={handleGenerate}
                size="lg"
                className="w-full text-lg py-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/40"
              >
                <SparkleIcon className="w-5 h-5 mr-2" />
                Spark Design
              </Button>
            </div>
            {appState === 'error' && error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Generation Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </motion.div>
          <footer className="absolute bottom-8 text-center text-muted-foreground/80">
            <p>Built with ❤️ at Cloudflare</p>
          </footer>
        </main>
      ) : generatedData ? (
        <GeneratedAppPage data={generatedData} onReset={handleReset} />
      ) : null}
    </>
  );
}