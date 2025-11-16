import { X, Copy, Send, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  activityTitle: string;
  onClose: () => void;
};

export default function ShareActivitySheet({ activityTitle, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCopyLink = async () => {
    const link = `https://pulse.app/activity/${activityTitle.toLowerCase().replace(/\s+/g, '-')}`;
    
    try {
      // Try modern clipboard API
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback: create a temporary input element
      try {
        const input = document.createElement('input');
        input.value = link;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        document.body.removeChild(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        // If all else fails, show an alert with the link
        alert(`Copy this link:\n\n${link}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-xl text-gray-900">Share Activity</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="mb-4 text-sm text-gray-600">Share "{activityTitle}" with your friends</p>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="mb-3 flex w-full items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:bg-gray-50 active:scale-98"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Copy size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">{copied ? 'Link copied!' : 'Copy link'}</h3>
              <p className="text-sm text-gray-600">Share link via clipboard</p>
            </div>
          </button>

          {/* Share to Contacts */}
          <button
            onClick={() => alert('Share to contacts functionality')}
            className="mb-3 flex w-full items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:bg-gray-50 active:scale-98"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Send size={20} className="text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">Share to contacts</h3>
              <p className="text-sm text-gray-600">Send directly to your Pulse contacts</p>
            </div>
          </button>

          {/* Share to Apps */}
          <button
            onClick={() => alert('Share to other apps')}
            className="flex w-full items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:bg-gray-50 active:scale-98"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Share2 size={20} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">Share to apps</h3>
              <p className="text-sm text-gray-600">Share via WhatsApp, Messages, etc.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}