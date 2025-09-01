import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  Zap
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface ProgressDashboardProps {
  userData: {
    name: string
    level: number
    xp: number
    xpToNext: number
    coursesCompleted: number
    coursesInProgress: number
    totalHours: number
    streak: number
    achievements: Array<{
      id: string
      name: string
      description: string
      icon: string
      rarity: 'bronze' | 'silver' | 'gold'
      unlockedAt: string
    }>
    weeklyProgress: Array<{
      day: string
      hours: number
    }>
  }
}

const rarityColors = {
  bronze: 'text-achievement-bronze border-achievement-bronze bg-achievement-bronze/10',
  silver: 'text-achievement-silver border-achievement-silver bg-achievement-silver/10',
  gold: 'text-achievement-gold border-achievement-gold bg-achievement-gold/10'
}

export function ProgressDashboard({ userData }: ProgressDashboardProps) {
  const xpProgress = (userData.xp / (userData.xp + userData.xpToNext)) * 100

  const stats = [
    {
      title: 'Courses Completed',
      value: userData.coursesCompleted,
      icon: BookOpen,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'In Progress',
      value: userData.coursesInProgress,
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total Hours',
      value: userData.totalHours,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Day Streak',
      value: userData.streak,
      icon: Zap,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header with User Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="font-heading font-bold text-3xl mb-2">
          Welcome back, {userData.name}!
        </h2>
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="secondary" className="px-4 py-2 text-lg">
            Level {userData.level}
          </Badge>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Trophy className="w-5 h-5" />
            <span>{userData.xp.toLocaleString()} XP</span>
          </div>
        </div>
      </motion.div>

      {/* XP Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Progress to Level {userData.level + 1}</span>
              <span className="text-sm text-muted-foreground">
                {userData.xpToNext} XP remaining
              </span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <p className="text-xs text-muted-foreground text-center">
              You're {Math.round(xpProgress)}% of the way there!
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="p-6 text-center hover:shadow-medium transition-shadow duration-300">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="font-bold text-2xl mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-achievement-gold" />
            <h3 className="font-heading font-bold text-xl">Recent Achievements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.achievements.slice(0, 3).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-lg border-2 ${rarityColors[achievement.rarity]} hover:scale-105 transition-transform duration-200 cursor-pointer`}
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">{achievement.icon}</div>
                  <h4 className="font-bold">{achievement.name}</h4>
                  <p className="text-xs opacity-80">{achievement.description}</p>
                  <div className="flex items-center justify-center space-x-1 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(achievement.unlockedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-bold text-xl">Weekly Activity</h3>
          </div>
          <div className="flex items-end justify-between space-x-2 h-32">
            {userData.weeklyProgress.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ height: 0 }}
                animate={{ height: `${(day.hours / Math.max(...userData.weeklyProgress.map(d => d.hours))) * 100}%` }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="flex-1 bg-gradient-primary rounded-t opacity-80 hover:opacity-100 transition-opacity duration-200 min-h-[8px]"
                title={`${day.hours} hours on ${day.day}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {userData.weeklyProgress.map(day => (
              <span key={day.day}>{day.day.slice(0, 3)}</span>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}