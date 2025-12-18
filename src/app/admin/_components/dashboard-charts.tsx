"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  getCoursesPerGrade,
  getMonthlyUserStats,
  getUserStatusDistribution,
} from "@/actions/dashboard";
import { toast } from "react-toastify";

const monthlyProgressData = [
  { month: "Jan", nouveauxCours: 4, nouveauxQuiz: 8, nouveauxDocuments: 12 },
  { month: "Fév", nouveauxCours: 6, nouveauxQuiz: 12, nouveauxDocuments: 18 },
  { month: "Mar", nouveauxCours: 8, nouveauxQuiz: 15, nouveauxDocuments: 22 },
  { month: "Avr", nouveauxCours: 5, nouveauxQuiz: 10, nouveauxDocuments: 16 },
  { month: "Mai", nouveauxCours: 9, nouveauxQuiz: 18, nouveauxDocuments: 25 },
  { month: "Juin", nouveauxCours: 7, nouveauxQuiz: 14, nouveauxDocuments: 20 },
];

export function DashboardCharts() {
  const [loading, setLoading] = useState(true);
  const [coursesPerGradeData, setCoursesPerGradeData] = useState<any[]>();
  const [users, setUsers] = useState<any[]>();
  const [users0, setUsers0] = useState<any[]>();
  useEffect(() => {
    let isMounted = true; // Track if component is mounted to prevent state updates after unmount

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Parallelize API calls for better performance
        const [coursesData, statusData, monthlyStats] =
          await Promise.allSettled([
            getCoursesPerGrade(),
            getUserStatusDistribution(),
            getMonthlyUserStats(),
          ]);

        if (!isMounted) return;

        // Handle each response with proper type checking
        if (coursesData.status === "fulfilled" && coursesData.value.success) {
          setCoursesPerGradeData(coursesData.value.data);
        } else {
          console.error(
            "Failed to load courses data:",
            coursesData.status === "rejected" ? coursesData.reason : coursesData
          );
        }

        if (statusData.status === "fulfilled") {
          setUsers0(statusData.value);
        } else {
          console.error("Failed to load user status data:", statusData.reason);
        }

        if (monthlyStats.status === "fulfilled") {
          setUsers(monthlyStats.value);
        } else {
          console.error("Failed to load monthly stats:", monthlyStats.reason);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Unexpected error in dashboard data fetch:", error);
          // Optionally set error state for UI feedback
          toast.error("Failed to load dashboard data. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-80 bg-gray-100 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Graphique en barres - Cours par classe */}
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Progression Mensuelle des Utilisateurs</CardTitle>
            <CardDescription>
              Nombre d&apos;utilisateurs inscrits chaque mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={users}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="nouveauxUtilisateurs"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                  name="Nouveaux Utilisateurs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Répartition des Cours par Classe</CardTitle>
          <CardDescription>
            Nombre de cours, documents et quiz par niveau de classe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursesPerGradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="courses" fill="#3B82F6" name="Cours" />
              <Bar dataKey="documents" fill="#10B981" name="Documents" />
              <Bar dataKey="quizzes" fill="#F59E0B" name="Quiz" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graphique en secteurs - Répartition par matière */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Utilisateurs par Statut</CardTitle>
          <CardDescription>
            Nombre d&apos;utilisateurs selon leur statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={users0}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                dataKey="value"
              >
                {users0?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graphique en aires - Progression mensuelle */}
      <Card>
        <CardHeader>
          <CardTitle>Progression Mensuelle</CardTitle>
          <CardDescription>
            Évolution du contenu ajouté chaque mois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="nouveauxCours"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Nouveaux Cours"
              />
              <Area
                type="monotone"
                dataKey="nouveauxQuiz"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
                name="Nouveaux Quiz"
              />
              <Area
                type="monotone"
                dataKey="nouveauxDocuments"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.6}
                name="Nouveaux Documents"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
