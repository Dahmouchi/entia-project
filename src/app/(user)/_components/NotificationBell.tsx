import { useState, useEffect, useRef } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const bellRef = useRef<HTMLDivElement>(null);

  // Simulate fetching notifications (replace with your actual API call)
  useEffect(() => {
    // Example: setNotifications(fetchedNotifications);
    setNotifications([]); // Empty for now
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div ref={bellRef} className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        size="icon"
        className="bg-white/20 hover:bg-white/30 text-white border-white/30 relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute z-50 right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <h4 className="font-medium text-gray-800 text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {notification.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(notification.timestamp).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BellOff className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-800 mb-1">
                  Aucune notification
                </h4>
                <p className="text-sm text-gray-500">
                  Vous n&apos;avez pas de nouvelles notifications pour le moment
                </p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                Tout marquer comme lu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
