
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { PostCard } from './components/PostCard';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { SocialPost } from './types';
import { generateSocialMediaPosts } from './services/geminiService';
import { StartingContent } from './components/StartingContent';

const App: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePosts = useCallback(async (topic: string, url: string, tone: string, callToAction: string, postLength: string) => {
    setIsLoading(true);
    setError(null);
    setPosts([]);

    try {
      const generatedPosts = await generateSocialMediaPosts(topic, url, tone, callToAction, postLength);
      setPosts(generatedPosts);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <InputForm onGenerate={handleGeneratePosts} isLoading={isLoading} />
          
          {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-10">
            {isLoading ? (
              <Loader />
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                  <PostCard key={index} post={post} />
                ))}
              </div>
            ) : !error && (
              <StartingContent />
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;