import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { Users, Shield, Send, Heart, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { profile, awardPoints, triggerCrisis } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [activeSpace, setActiveSpace] = useState<'newly_diagnosed' | 'food' | 'movement'>('newly_diagnosed');
  const [newPostText, setNewPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 'p-1',
      authorNickname: 'KidneyWarrior99',
      avatarIcon: '🌱',
      space: 'newly_diagnosed',
      content: 'Was diagnosed with stage 3a three weeks ago. Felt terrified initially, but tracking my blood pressure and reading the salt guide here has helped me feel in control.',
      likes: 8,
      timestamp: '2 hours ago',
    },
    {
      id: 'p-2',
      authorNickname: 'GreenRunner',
      avatarIcon: '🏃',
      space: 'movement',
      content: 'Managed a gentle 15-minute walk around the local park today. Taking it one step at a time!',
      likes: 12,
      timestamp: '5 hours ago',
    },
    {
      id: 'p-3',
      authorNickname: 'SproutChef',
      avatarIcon: '🍲',
      space: 'food',
      content: 'Swapped normal salt for fresh garlic, rosemary, and lemon juice on my roast chicken. Tasted even better and kept my numbers happy.',
      likes: 15,
      timestamp: '1 day ago',
    },
  ]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    // Crisis screening regex (Online Safety Act 2023 & Clinical Safety DCB0129)
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'die', 'no point living'];
    const lower = newPostText.toLowerCase();
    const isCrisis = crisisKeywords.some((kw) => lower.includes(kw));

    if (isCrisis) {
      triggerCrisis('community_post_keyword');
      return;
    }

    const newPost = {
      id: 'p-' + Date.now(),
      authorNickname: profile.nickname,
      avatarIcon: '🌱',
      space: activeSpace,
      content: newPostText,
      likes: 1,
      timestamp: 'Just now (Pre-moderated)',
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    awardPoints(10, 'Community Voice');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.nav.community}</h2>
        <p className="text-xs text-nhs-secondaryText">
          Safe, 18+ pseudonymous peer support. Moderated with love and strict safety rules.
        </p>
      </div>

      {/* House Rules & Online Safety Box */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 text-xs text-nhs-darkBlue space-y-1.5 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-sm text-nhs-blue">
          <Shield className="w-4 h-4" />
          <span>Community House Rules (Online Safety Act 2023 Compliant)</span>
        </div>
        <p>
          1. <strong>No Medical Advice:</strong> Share personal stories and encouragement, never medical or medicine prescriptions.
          <br />
          2. <strong>Kindness First:</strong> Respect everyone's unique journey. Zero tolerance for harassment or selling products.
        </p>
      </div>

      {/* Spaces Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveSpace('newly_diagnosed')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold min-h-[44px] ${
            activeSpace === 'newly_diagnosed' ? 'bg-nhs-blue text-white shadow' : 'bg-white border text-gray-700'
          }`}
        >
          Newly Told (Stage 1-3)
        </button>
        <button
          onClick={() => setActiveSpace('food')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold min-h-[44px] ${
            activeSpace === 'food' ? 'bg-nhs-blue text-white shadow' : 'bg-white border text-gray-700'
          }`}
        >
          Food & Cooking
        </button>
        <button
          onClick={() => setActiveSpace('movement')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold min-h-[44px] ${
            activeSpace === 'movement' ? 'bg-nhs-blue text-white shadow' : 'bg-white border text-gray-700'
          }`}
        >
          Gentle Movement
        </button>
      </div>

      {/* Create Post Input */}
      <div className="bg-white rounded-2xl p-5 border border-nhs-borderGrey/30 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-nhs-darkBlue flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-nhs-yellow" />
          <span>Share a positive moment or question (+10 pts)</span>
        </h3>
        <form onSubmit={handlePostSubmit} className="space-y-3">
          <textarea
            rows={3}
            placeholder="What positive step did you take for your kidneys today? (All posts are reviewed by our moderator)"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            className="w-full p-3 border border-nhs-borderGrey/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nhs-blue"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 min-h-[44px]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post to Community</span>
          </button>
        </form>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {posts
          .filter((p) => p.space === activeSpace)
          .map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-5 border border-nhs-borderGrey/30 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center font-bold text-sm">
                    {post.avatarIcon}
                  </span>
                  <span className="font-bold text-nhs-text">{post.authorNickname}</span>
                </div>
                <span className="text-gray-400">{post.timestamp}</span>
              </div>
              <p className="text-sm text-nhs-text leading-relaxed">{post.content}</p>
              <div className="pt-2 flex items-center gap-4 text-xs text-nhs-secondaryText">
                <button className="flex items-center gap-1 hover:text-nhs-red text-xs">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  <span>{post.likes} Helpful</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
