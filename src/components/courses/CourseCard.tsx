import { motion } from 'framer-motion'
import { Star, Clock, Users, PlayCircle, BookOpen, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface CourseCardProps {
  course: {
    id: string
    title: string
    instructor: string
    rating: number
    reviews: number
    duration: string
    students: number
    thumbnail: string
    price?: number
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    category: string
    progress?: number
    isEnrolled?: boolean
    lessons: number
  }
  variant?: 'default' | 'enrolled'
}

const levelColors = {
  'Beginner': 'bg-success text-success-foreground',
  'Intermediate': 'bg-warning text-warning-foreground', 
  'Advanced': 'bg-destructive text-destructive-foreground'
}

export function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const isEnrolled = variant === 'enrolled' || course.isEnrolled

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-border/50"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-hero rounded-t-xl relative">
          {/* Course Thumbnail Placeholder */}
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-primary-foreground opacity-80 group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          {/* Level Badge */}
          <Badge className={`absolute top-3 left-3 ${levelColors[course.level]}`}>
            {course.level}
          </Badge>
          
          {/* Category Badge */}
          <Badge variant="secondary" className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm">
            {course.category}
          </Badge>
          
          {isEnrolled && course.progress !== undefined && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-card/90 backdrop-blur-sm rounded-lg p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-card-foreground">Progress</span>
                  <span className="text-xs font-bold text-primary">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {/* Course Title & Instructor */}
            <div>
              <h3 className="font-heading font-bold text-lg text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">by {course.instructor}</p>
            </div>

            {/* Rating & Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="font-medium text-foreground">{course.rating}</span>
                <span>({course.reviews})</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
            </div>

            {/* Students Count */}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()} students</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              {isEnrolled ? (
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-achievement-gold" />
                  <span className="font-medium text-achievement-gold">Enrolled</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  {course.price ? (
                    <span className="font-bold text-lg text-primary">${course.price}</span>
                  ) : (
                    <span className="font-bold text-lg text-success">Free</span>
                  )}
                </div>
              )}
              
              <Button
                variant={isEnrolled ? 'secondary' : 'default'}
                size="sm"
                className="min-w-[100px]"
              >
                {isEnrolled ? 'Continue' : 'Enroll Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}