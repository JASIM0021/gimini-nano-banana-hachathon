
import React, { useState } from 'react';

interface InputFormProps {
  onGenerate: (topic: string, url: string, tone: string, callToAction: string, postLength: string) => void;
  isLoading: boolean;
}

const SparklesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);


export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [url, setUrl] = useState('');
  const [tone, setTone] = useState('Professional');
  const [callToAction, setCallToAction] = useState('');
  const [postLength, setPostLength] = useState('Medium');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && url.trim()) {
      onGenerate(topic, url, tone, callToAction, postLength);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-300">
            Topic / Product / Service
          </label>
          <div className="mt-2">
            <input
              id="topic"
              name="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., 'New SaaS for project management'"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-300">
            Company URL
          </label>
          <div className="mt-2">
            <input
              id="url"
              name="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g., 'https://www.mycompany.com/product'"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-6">
             <h3 className="text-base font-semibold leading-6 text-white">Customization Options</h3>
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="tone" className="block text-sm font-medium leading-6 text-gray-300">Tone</label>
                    <select id="tone" name="tone" value={tone} onChange={e => setTone(e.target.value)} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Witty</option>
                        <option>Urgent</option>
                        <option>Inspirational</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="postLength" className="block text-sm font-medium leading-6 text-gray-300">Post Length</label>
                    <select id="postLength" name="postLength" value={postLength} onChange={e => setPostLength(e.target.value)} className="mt-2 block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all">
                        <option>Short</option>
                        <option>Medium</option>
                        <option>Long</option>
                    </select>
                </div>
            </div>
             <div>
                <label htmlFor="cta" className="block text-sm font-medium leading-6 text-gray-300">
                    Call to Action (Optional)
                </label>
                <div className="mt-2">
                    <input
                    id="cta"
                    name="cta"
                    type="text"
                    value={callToAction}
                    onChange={(e) => setCallToAction(e.target.value)}
                    placeholder="e.g., 'Learn more on our website!'"
                    className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all"
                    />
                </div>
            </div>
        </div>


        <div>
          <button
            type="submit"
            disabled={isLoading || !topic || !url}
            className="flex w-full justify-center items-center rounded-md bg-indigo-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Generating...' : (
              <>
                <SparklesIcon />
                Generate Posts
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};