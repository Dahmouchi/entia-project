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
  return <div></div>;
};

export default CoursDetails;
