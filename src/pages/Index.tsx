import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayCircle, 
  Users, 
  Trophy, 
  BookOpen, 
  Star,
  ArrowRight,
  Zap,
  Target,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react'

import { HeroScene } from '@/components/three/HeroScene'
import { Navigation } from '@/components/navigation/Navigation'
import { CourseCard } from '@/components/courses/CourseCard'
import { ProgressDashboard } from '@/components/progress/ProgressDashboard'
import { Leaderboard } from '@/components/leaderboard/Leaderboard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock data for demonstration
const featuredCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    reviews: 15420,
    duration: '52 hours',
    students: 89345,
    thumbnail: '',
    price: 89,
    level: 'Intermediate' as const,
    category: 'Web Development',
    lessons: 120
  },
  {
    id: '2',
    title: 'Data Science & Machine Learning',
    instructor: 'Dr. Michael Chen',
    rating: 4.8,
    reviews: 8930,
    duration: '38 hours',
    students: 45621,
    thumbnail: '',
    price: 79,
    level: 'Advanced' as const,
    category: 'Data Science',
    lessons: 95
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emily Rodriguez',
    rating: 4.9,
    reviews: 12340,
    duration: '28 hours',
    students: 67890,
    thumbnail: '',
    level: 'Beginner' as const,
    category: 'Design',
    lessons: 85
  },
  {
    id: '4',
    title: 'Mobile App Development with React Native',
    instructor: 'James Wilson',
    rating: 4.7,
    reviews: 5670,
    duration: '45 hours',
    students: 23456,
    thumbnail: '',
    price: 95,
    level: 'Intermediate' as const,
    category: 'Mobile Development',
    lessons: 110
  }
]

const mockUserData = {
  name: 'Alex Thompson',
  level: 8,
  xp: 12750,
  xpToNext: 2250,
  coursesCompleted: 12,
  coursesInProgress: 3,
  totalHours: 156,
  streak: 15,
  achievements: [
    {
      id: '1',
      name: 'Fast Learner',
      description: 'Complete 5 courses in one month',
      icon: '🚀',
      rarity: 'gold' as const,
      unlockedAt: '2024-08-15'
    },
    {
      id: '2',
      name: 'Consistency Master',
      description: '15-day learning streak',
      icon: '🔥',
      rarity: 'silver' as const,
      unlockedAt: '2024-08-20'
    },
    {
      id: '3',
      name: 'Quiz Champion',
      description: 'Score 100% on 10 quizzes',
      icon: '🏆',
      rarity: 'bronze' as const,
      unlockedAt: '2024-08-10'
    }
  ],
  weeklyProgress: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 },
    { day: 'Fri', hours: 2.9 },
    { day: 'Sat', hours: 3.7 },
    { day: 'Sun', hours: 2.1 }
  ]
}

const leaderboardData = [
  {
    id: '1',
    rank: 1,
    name: 'Jessica Lee',
    xp: 28500,
    level: 15,
    coursesCompleted: 28,
    streak: 45,
    badge: 'top-performer' as const
  },
  {
    id: '2',
    rank: 2,
    name: 'Marcus Johnson',
    xp: 25200,
    level: 14,
    coursesCompleted: 25,
    streak: 32,
    badge: 'consistent-learner' as const
  },
  {
    id: '3',
    rank: 3,
    name: 'Sofia Rodriguez',
    xp: 23100,
    level: 13,
    coursesCompleted: 22,
    streak: 28,
    badge: 'rising-star' as const
  },
  {
    id: '4',
    rank: 4,
    name: 'Alex Thompson',
    xp: 12750,
    level: 8,
    coursesCompleted: 12,
    streak: 15
  },
  {
    id: '5',
    rank: 5,
    name: 'David Kim',
    xp: 11900,
    level: 7,
    coursesCompleted: 11,
    streak: 12
  }
]

const stats = [
  { 
    label: 'Active Students', 
    value: '500K+', 
    icon: Users,
    color: 'text-primary'
  },
  { 
    label: 'Expert Instructors', 
    value: '2,500+', 
    icon: Award,
    color: 'text-success'
  },
  { 
    label: 'Courses Available', 
    value: '15,000+', 
    icon: BookOpen,
    color: 'text-warning'
  },
  { 
    label: 'Success Rate', 
    value: '94%', 
    icon: Trophy,
    color: 'text-achievement-gold'
  }
]

const features = [
  {
    icon: PlayCircle,
    title: 'Interactive Video Learning',
    description: 'High-quality video content with interactive elements and note-taking capabilities'
  },
  {
    icon: Trophy,
    title: 'Gamified Learning',
    description: 'Earn XP, unlock achievements, and compete with peers on global leaderboards'
  },
  {
    icon: Target,
    title: 'Personalized Paths',
    description: 'AI-powered learning recommendations based on your goals and progress'
  },
  {
    icon: Zap,
    title: 'Real-time Progress',
    description: 'Track your learning journey with detailed analytics and progress insights'
  }
]

export default function Index() {
  const [currentView, setCurrentView] = useState<'hero' | 'dashboard'>('hero')

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="student" />
      
      {currentView === 'hero' ? (
        <>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
            <Suspense fallback={<div className="absolute inset-0 bg-gradient-hero" />}>
              <HeroScene />
            </Suspense>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <Badge className="bg-card/80 backdrop-blur-sm text-primary border-primary/20 px-6 py-2">
                  🚀 Welcome to the Future of Learning
                </Badge>
                
                <h1 className="font-heading font-bold text-6xl lg:text-7xl text-primary-foreground leading-tight">
                  Master New Skills<br />
                  <span className="bg-gradient-achievement bg-clip-text text-transparent">
                    Unlock Your Potential
                  </span>
                </h1>
                
                <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                  Join over 500,000 learners on EduZenith - the most advanced e-learning platform 
                  with gamified experiences, AI-powered recommendations, and expert instruction.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button 
                    size="lg" 
                    className="bg-card text-primary hover:bg-card/90 shadow-glow px-8 py-4 text-lg"
                    onClick={() => setCurrentView('dashboard')}
                  >
                    Start Learning Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg"
                  >
                    Watch Demo
                    <PlayCircle className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-foreground/60"
            >
              <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
                <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse" />
              </div>
            </motion.div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-heading font-bold text-4xl mb-4">
                  Trusted by Learners Worldwide
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join a global community of learners achieving their goals every day
                </p>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-card shadow-medium mb-4 group-hover:shadow-large transition-shadow duration-300">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <h3 className="font-bold text-3xl mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-heading font-bold text-4xl mb-4">
                  Why Choose EduZenith?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Experience learning like never before with our cutting-edge features
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 text-center hover:shadow-medium transition-all duration-300 group hover:-translate-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Courses */}
          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-heading font-bold text-4xl mb-4">
                  Featured Courses
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Discover our most popular courses taught by industry experts
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                  Browse All Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Dashboard View */
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Dashboard */}
            <div className="lg:col-span-2">
              <ProgressDashboard userData={mockUserData} />
              
              {/* Enrolled Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <h3 className="font-heading font-bold text-2xl mb-6">Continue Learning</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredCourses.slice(0, 2).map((course, index) => (
                    <CourseCard
                      key={course.id}
                      course={{
                        ...course,
                        progress: index === 0 ? 65 : 30,
                        isEnrolled: true
                      }}
                      variant="enrolled"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Leaderboard Sidebar */}
            <div className="lg:col-span-1">
              <Leaderboard 
                entries={leaderboardData} 
                currentUserId="4"
                timeframe="monthly"
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {currentView === 'hero' && (
        <section className="py-20 bg-gradient-hero relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-heading font-bold text-4xl lg:text-5xl text-primary-foreground">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of successful learners who have transformed their careers with EduZenith
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button 
                  size="lg" 
                  className="bg-card text-primary hover:bg-card/90 shadow-glow px-8 py-4 text-lg"
                  onClick={() => setCurrentView('dashboard')}
                >
                  Get Started Free
                  <CheckCircle2 className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex items-center space-x-2 text-primary-foreground/80">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-medium">4.9/5 from 50,000+ reviews</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Hero Button */}
      {currentView === 'dashboard' && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setCurrentView('hero')}
            className="shadow-large"
          >
            Back to Home
          </Button>
        </div>
      )}
    </div>
  )
}