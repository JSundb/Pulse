import { X, MessageCircle, User } from 'lucide-react';

type Props = {
  userId: string;
  userName: string;
  userAvatar: string;
  onClose: () => void;
  onMessage: () => void;
  onViewProfile: () => void;
};

export default function UserPopup({ userId, userName, userAvatar, onClose, onMessage, onViewProfile }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <img
            src={userAvatar}
            alt={userName}
            className="mb-4 h-24 w-24 rounded-full bg-gray-200"
          />
          
          <h2 className="mb-1 text-2xl text-gray-900">{userName}</h2>
          <p className="text-sm text-gray-500">Member since Nov 2024</p>
        </div>

        <div className="space-y-2">
          <button
            onClick={onMessage}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
          >
            <MessageCircle size={20} />
            <span>Message User</span>
          </button>

          <button
            onClick={onViewProfile}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-gray-900 transition-all hover:bg-gray-50 active:scale-98"
          >
            <User size={20} />
            <span>View Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}