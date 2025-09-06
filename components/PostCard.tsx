import React, { useState } from 'react';
import { SocialPost } from '../types';

interface PostCardProps {
  post: SocialPost;
}

const getPlatformIcon = (platform: SocialPost['platform']) => {
    switch (platform) {
        case 'LinkedIn':
            return (
                <svg className="w-6 h-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            );
        case 'X (Twitter)':
            return (
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                </svg>
            );
        case 'Facebook':
            return (
                <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
            );
        case 'Instagram':
            return (
                 <svg className="w-6 h-6" fill="url(#instagram-gradient)" viewBox="0 0 24 24">
                    <defs>
                        <radialGradient id="instagram-gradient" cx="0.3" cy="1" r="1">
                            <stop offset="0" stopColor="#F58529"/>
                            <stop offset="0.2" stopColor="#FEDA77"/>
                            <stop offset="0.4" stopColor="#DD2A7B"/>
                            <stop offset="0.6" stopColor="#8134AF"/>
                            <stop offset="0.8" stopColor="#515BD4"/>
                        </radialGradient>
                    </defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.28-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
                </svg>
            );
        default:
            return null;
    }
};

const ClipboardIcon: React.FC<{ copied: boolean }> = ({ copied }) => copied ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9.75A2.25 2.25 0 0 1 7.5 4.5v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0V6.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 10.5Z" />
    </svg>
);


export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = `${post.content}\n\n${post.hashtags.map(h => `#${h}`).join(' ')}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        const text = `${post.content}\n\n${post.hashtags.map(h => `#${h}`).join(' ')}`;
        const encodedText = encodeURIComponent(text);
        let shareUrl = '';

        switch (post.platform) {
            case 'X (Twitter)':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
                break;
            case 'LinkedIn':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&text=${encodedText}`;
                break;
            case 'Facebook':
                const urlMatch = post.content.match(/(https?:\/\/[^\s]+)/);
                const urlToShare = urlMatch ? urlMatch[0] : '';
                if (urlToShare) {
                    const encodedQuote = encodeURIComponent(post.content);
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}&quote=${encodedQuote}`;
                } else {
                    console.warn("No URL found in Facebook post content to share.");
                }
                break;
            case 'Instagram':
                return; // Direct sharing not supported
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    };


  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex flex-col h-full overflow-hidden transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-indigo-500/20">
      {post.imageUrl ? (
        <img src={post.imageUrl} alt={`AI-generated image for ${post.platform} post`} className="w-full h-56 object-cover" />
      ) : (
        <div className="w-full h-56 bg-gray-700/50 flex items-center justify-center animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm16.5-1.5H3.75" />
            </svg>
        </div>
      )}
      <div className="p-5 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          {getPlatformIcon(post.platform)}
          <h3 className="font-bold text-lg text-white">{post.platform}</h3>
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={handleShare}
                disabled={post.platform === 'Instagram'}
                className="flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={post.platform === 'Instagram' ? "Direct sharing is not supported for Instagram" : "Share post"}
            >
                <ShareIcon />
                Share
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-md transition-colors"
              title="Copy post text"
            >
              <ClipboardIcon copied={copied} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
      </div>
      <div className="p-5 flex-grow">
        <p className="text-gray-300 whitespace-pre-wrap">{post.content}</p>
      </div>
      {post.hashtags && post.hashtags.length > 0 && (
          <div className="p-5 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                  {post.hashtags.map((tag, i) => (
                      <span key={i} className="text-sm bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                          #{tag}
                      </span>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};