"use client";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bell,
  Search,
  GraduationCap,
  BookOpen,
  Brain,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NotificationBell from "@/app/(user)/_components/NotificationBell";

interface WelcomeHeaderProps {
  studentName: string;
  gradeName: string;
}
interface SearchSuggestion {
  label: string;
  url: string;
  icon: React.ReactNode;
}

const searchSuggestions: SearchSuggestion[] = [
  {
    label: "Toutes les matières",
    url: "/dashboard/matiere",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    label: "Tous les quizzes",
    url: "/dashboard/quizzes",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    label: "Profile",
    url: "/dashboard/profile",
    icon: <User className="w-4 h-4" />,
  },
];
export const WelcomeHeader = ({
  studentName,
  gradeName,
}: WelcomeHeaderProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    SearchSuggestion[]
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(searchSuggestions);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (url: string) => {
    router.push(url);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20  rounded-3xl bg-gradient-to-br from-blue-600/90 via-cyan-500 to-cyan-800 p-8 text-primary-foreground shadow-lg"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      {/* Floating particles */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-20 w-3 h-3 bg-white/30 rounded-full"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 right-40 w-2 h-2 bg-white/20 rounded-full"
      />
      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 right-32 w-4 h-4 bg-white/25 rounded-full"
      />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Greeting */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-2"
            >
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">
                {gradeName}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl lg:text-4xl font-bold font-display"
            >
              {getGreeting()}, {studentName}! 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-lg opacity-90"
            >
              Prêt à apprendre quelque chose de nouveau aujourd&apos;hui?
            </motion.p>
          </div>

          {/* Actions */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative z-50">
              <Input
                placeholder="Rechercher un cours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className="w-64 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
              />
              <Search className="absolute  right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
              {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {filteredSuggestions.length > 0 ? (
                    <div className="py-2">
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.url)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors text-left"
                        >
                          <div className="text-gray-600">{suggestion.icon}</div>
                          <span className="text-gray-700 font-medium">
                            {suggestion.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      Aucun résultat trouvé
                    </div>
                  )}
                </div>
              )}
            </div>

            <NotificationBell />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
