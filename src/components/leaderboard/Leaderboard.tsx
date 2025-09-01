import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, TrendingUp, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  avatar?: string
  xp: number
  level: number
  coursesCompleted: number
  streak: number
  badge?: 'top-performer' | 'rising-star' | 'consistent-learner'
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
  timeframe?: 'weekly' | 'monthly' | 'all-time'
}

const rankIcons = {
  1: Crown,
  2: Trophy,
  3: Medal
}

const rankColors = {
  1: 'text-achievement-gold',
  2: 'text-achievement-silver', 
  3: 'text-achievement-bronze'
}

const badgeConfig = {
  'top-performer': {
    label: 'Top Performer',
    color: 'bg-primary text-primary-foreground',
    icon: Star
  },
  'rising-star': {
    label: 'Rising Star',
    color: 'bg-warning text-warning-foreground',
    icon: TrendingUp
  },
  'consistent-learner': {
    label: 'Consistent',
    color: 'bg-success text-success-foreground',
    icon: Trophy
  }
}

export function Leaderboard({ entries, currentUserId, timeframe = 'all-time' }: LeaderboardProps) {
  const timeframeLabels = {
    'weekly': 'This Week',
    'monthly': 'This Month',
    'all-time': 'All Time'
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-achievement-gold" />
            <h2 className="font-heading font-bold text-2xl">Leaderboard</h2>
          </div>
          <Badge variant="secondary">
            {timeframeLabels[timeframe]}
          </Badge>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {entries.slice(0, 3).map((entry, index) => {
            const RankIcon = rankIcons[entry.rank as 1 | 2 | 3]
            const isCenter = entry.rank === 1

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  height: isCenter ? 'auto' : '90%'
                }}
                transition={{ delay: 0.1 * index }}
                className={`text-center p-4 rounded-xl ${
                  isCenter ? 'bg-gradient-achievement transform scale-105' : 'bg-gradient-card'
                } ${entry.id === currentUserId ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="relative mb-4">
                  <Avatar className={`mx-auto ${isCenter ? 'w-16 h-16' : 'w-12 h-12'}`}>
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback className="font-bold">
                      {entry.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {RankIcon && (
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card flex items-center justify-center ${
                      isCenter ? 'scale-125' : ''
                    }`}>
                      <RankIcon className={`w-4 h-4 ${rankColors[entry.rank as 1 | 2 | 3]}`} />
                    </div>
                  )}
                </div>

                <h3 className={`font-bold ${isCenter ? 'text-lg' : 'text-base'} mb-1 truncate`}>
                  {entry.name}
                </h3>
                <p className={`${isCenter ? 'text-achievement-gold' : 'text-primary'} font-bold mb-2`}>
                  {entry.xp.toLocaleString()} XP
                </p>
                <Badge variant="secondary" className="text-xs">
                  Level {entry.level}
                </Badge>

                {entry.badge && (
                  <div className="mt-2">
                    <Badge className={`${badgeConfig[entry.badge].color} text-xs`}>
                      {badgeConfig[entry.badge].label}
                    </Badge>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Remaining Rankings */}
        <div className="space-y-2">
          {entries.slice(3).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`flex items-center justify-between p-4 rounded-lg hover:bg-card-hover transition-colors duration-200 ${
                entry.id === currentUserId ? 'bg-primary/5 border border-primary/20' : 'bg-card/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                  {entry.rank}
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>
                    {entry.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{entry.name}</h4>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <span>Level {entry.level}</span>
                    <span>•</span>
                    <span>{entry.coursesCompleted} courses</span>
                    <span>•</span>
                    <span>{entry.streak} day streak</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {entry.badge && (
                  <Badge className={`${badgeConfig[entry.badge].color} text-xs`}>
                    {badgeConfig[entry.badge].label}
                  </Badge>
                )}
                <div className="text-right">
                  <p className="font-bold text-primary">
                    {entry.xp.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center pt-4 border-t border-border/50">
          <Button variant="outline" size="sm">
            View Full Leaderboard
          </Button>
        </div>
      </div>
    </Card>
  )
}