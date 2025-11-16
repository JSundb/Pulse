import { useState } from 'react';
import { motion } from 'motion/react';
import type { MicroGroup } from '../App';
import { Users, MessageSquare, ArrowLeft, Send, Plus, X } from 'lucide-react';

type Props = {
  groups: MicroGroup[];
  userInterests: string[];
};

export default function MicroGroups({ groups, userInterests }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<MicroGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Group detail view
  if (selectedGroup) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-5 py-4">
          <button
            onClick={() => setSelectedGroup(null)}
            className="mb-3 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to groups
          </button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-1 text-xl text-gray-900">{selectedGroup.name}</h2>
              <p className="text-sm text-gray-600">{selectedGroup.description}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <Users size={14} />
                <span>{selectedGroup.memberCount} members</span>
              </div>
            </div>
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white transition-all hover:bg-blue-700 active:scale-95">
              Leave
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {selectedGroup.posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare size={48} className="mb-4 text-gray-300" />
              <p className="text-gray-600">No posts yet</p>
              <p className="text-sm text-gray-500">Be the first to post</p>
            </div>
          ) : (
            selectedGroup.posts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-900">{post.author}</span>
                  <span className="text-xs text-gray-500">{post.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
              </motion.div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              disabled={!newMessage.trim()}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                newMessage.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Groups list view
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="mb-2 text-3xl text-gray-900">Micro-Groups</h1>
        <p className="text-gray-600">
          Connect with people who share your interests
        </p>
      </div>

      {/* Suggested Groups based on interests */}
      {userInterests.length > 0 && (
        <div className="mb-6 px-6">
          <h2 className="mb-3 text-lg text-gray-900">Based on your interests</h2>
          <div className="flex flex-wrap gap-2">
            {userInterests.map(interest => (
              <span key={interest} className="rounded-full bg-blue-600 px-3 py-1.5 text-sm text-white">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Groups List */}
      <div className="px-6 pb-6">
        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">👥</div>
            <h2 className="mb-2 text-xl text-gray-900">No groups yet</h2>
            <p className="text-gray-600">
              Groups will appear based on activities you save
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {groups.map((group, index) => (
              <motion.button
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedGroup(group)}
                className="overflow-hidden rounded-2xl bg-white shadow-md text-left transition-all hover:shadow-xl active:scale-98"
              >
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-lg text-gray-900">{group.name}</h3>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                          {group.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{group.description}</p>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{group.memberCount} members</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      <span>{group.posts.length} posts</span>
                    </div>
                  </div>

                  {/* Recent post preview */}
                  {group.posts.length > 0 && (
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="mb-1 text-xs text-gray-500">
                        {group.posts[0].author} • {group.posts[0].timestamp}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {group.posts[0].content}
                      </p>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Floating action button */}
      <div className="fixed bottom-20 right-6">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all hover:bg-blue-700 active:scale-95">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
