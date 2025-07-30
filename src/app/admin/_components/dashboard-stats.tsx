'use client';

import { useState, useEffect } from 'react';
import { StatsCard } from './stats-card';
import { 
  BookOpen, 
  GraduationCap,
  PlayCircle,
  TrendingUp
} from 'lucide-react';
import { getStats } from '@/actions/dashboard';

interface DashboardStats {
  totalCourses: number;
  totalSubjects: number;
  totalGrades: number;
  totalNiveaux: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalSubjects: 0,
    totalGrades: 0,
    totalNiveaux: 0,

  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      setLoading(true);

      const data = await getStats();

      if (data.success) {
        setStats(data);
      } else {
        setStats({
          totalCourses: 0,
          totalSubjects: 0,
          totalGrades: 0,
          totalNiveaux: 0,
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
      setStats({
        totalCourses: 12,
        totalSubjects: 8,
        totalGrades: 15,
        totalNiveaux: 4,
      });
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);


  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
         title="Total Etudiants"
        value={stats.totalNiveaux}
        description="Etudiants inscrit sur la plateforme"
        icon={TrendingUp}
        color="orange"
      />
        <StatsCard
        title="Classes"
        value={stats.totalGrades}
        description="Classes disponibles"
        icon={GraduationCap}
        color="purple"
        trend={{ value: 5, isPositive: true }}
      />
          <StatsCard
        title="Matières"
        value={stats.totalSubjects}
        description="Matières enseignées"
        icon={BookOpen}
        color="green"
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title="Total Cours"
        value={stats.totalCourses}
        description="Cours disponibles sur la plateforme"
        icon={PlayCircle}
        color="blue"
        trend={{ value: 12, isPositive: true }}
      />
      
  
      
    
      
      
      
     
    </div>
  );
}