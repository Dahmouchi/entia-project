"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  FileText,
  BookOpen,
  Eye,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useRouter } from "next/navigation";
import Progress from "@/components/ui/progress";
import VimeoTest from "@/app/(user)/_components/vimeoPlayer";
import { getCourseCompletionStatus } from "@/actions/progress";
import { getNotes } from "@/actions/noteOpenAI";
import ButtonComplete from "./buttonComplete";
import ButtonSynthese from "./ButtonSynthese";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SimplePDFViewer from "./cours-pdf";
import QuizDisplay from "./quizSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CourseChat } from "./course-chat";

const CoursDetails = ({ subject, user, progressCount }: any) => {
  const { id } = useParams();
  const navigate = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [results, setResults] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [completedStatus, setCompletedStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  // Initialize with the first course or find by id
  useEffect(() => {
    const fetchNotes = async () => {
      if (subject?.courses && subject.courses.length > 0) {
        if (id) {
          const course = subject.courses.find((c: any) => c.id === id);

          setSelectedCourse(course || subject.courses[0]);

          if (course) {
            const res = await getNotes(user?.id, course.id);
            setResults(res);
            console.log(res, "res");
          }
        } else {
          setSelectedCourse(subject.courses[0]);
        }
      }
    };

    fetchNotes();
  }, [subject, id]);

  useEffect(() => {
    const fetchCompletionStatus = async () => {
      const results = await Promise.all(
        subject.courses.map(async (course: any) => {
          const res = await getCourseCompletionStatus(user.id, course.id);
          return { courseId: course.id, completed: res.completed };
        })
      );

      const statusMap: { [key: string]: boolean } = {};
      results.forEach(({ courseId, completed }) => {
        statusMap[courseId] = completed;
      });
      setCompletedStatus(statusMap);
    };

    fetchCompletionStatus();
  }, [subject, id]);

  const handleCourseSelect = async (course: any) => {
    setSelectedCourse(course);
    const res = await getNotes(user?.id, course?.id);
    console.log(res, "res");
    setResults(res);
    setVideoProgress(0);
    setIsPlaying(false);

    // Optionally update URL
    // navigate.push(`/student/course/${course.id}`);
  };

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement du cours...</p>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen"></div>;
};

export default CoursDetails;
