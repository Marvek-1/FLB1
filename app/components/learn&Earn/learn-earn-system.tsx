"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
import { Badge } from "@/app/components/ui/badge"
import { Textarea } from "@/app/components/ui/textarea"
import { BookOpen, Brain, Heart, Video, CheckCircle, Star, Zap, Trophy, Clock } from "lucide-react"
import { proverbValidator, type AfricanProverb } from "@/app/lib/proverb-validator"

interface Module {
  id: string
  title: string
  description: string
  type: "interactive" | "quiz" | "story" | "video"
  difficulty: "beginner" | "intermediate" | "advanced"
  rewardFLB: number
  rewardXP: number
  estimatedTime: number
  completed: boolean
  content?: any
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  proverb?: AfricanProverb
}

interface UserProgress {
  totalXP: number
  totalFLB: number
  completedModules: string[]
  currentStreak: number
  storiesShared: number
}

const mockModules: Module[] = [
  {
    id: "akan-wisdom-1",
    title: "Akan Wisdom: Sankofa Philosophy",
    description: "Learn the profound meaning of looking back to move forward",
    type: "interactive",
    difficulty: "beginner",
    rewardFLB: 25,
    rewardXP: 50,
    estimatedTime: 15,
    completed: false,
    content: {
      proverb: "Se wo were fi na wosankofa a yenkyi",
      language: "Akan",
      meaning: "It is not wrong to go back for that which you have forgotten",
      culturalContext:
        "Sankofa teaches us to learn from the past to move forward wisely. The symbol shows a bird looking backward while moving forward.",
      modernApplication:
        "In today's fast-paced world, Sankofa reminds us to honor our ancestors' wisdom while embracing progress.",
    },
  },
  {
    id: "ubuntu-philosophy-1",
    title: "Ubuntu: I Am Because We Are",
    description: "Explore the foundational African philosophy of interconnectedness",
    type: "interactive",
    difficulty: "beginner",
    rewardFLB: 30,
    rewardXP: 60,
    estimatedTime: 20,
    completed: false,
    content: {
      proverb: "Ubuntu ngumuntu ngabantu",
      language: "Zulu",
      meaning: "I am because we are",
      culturalContext:
        "Ubuntu emphasizes our shared humanity and interconnectedness. Individual well-being is tied to community well-being.",
      modernApplication:
        "Ubuntu principles guide community building, conflict resolution, and social justice in modern Africa.",
    },
  },
  {
    id: "health-advocacy-1",
    title: "Community Health Leadership",
    description: "Learn how to advocate for health in African communities",
    type: "video",
    difficulty: "intermediate",
    rewardFLB: 40,
    rewardXP: 80,
    estimatedTime: 25,
    completed: false,
    content: {
      topics: ["Primary Healthcare", "Community Mobilization", "Health Education", "Disease Prevention"],
      practicalSkills: ["Health Screening", "Community Outreach", "Health Data Collection", "Emergency Response"],
    },
  },
  {
    id: "proverb-mastery-quiz",
    title: "African Proverbs Mastery Quiz",
    description: "Test your knowledge of African wisdom across cultures",
    type: "quiz",
    difficulty: "intermediate",
    rewardFLB: 35,
    rewardXP: 70,
    estimatedTime: 10,
    completed: false,
    content: {
      questions: 5,
      themes: ["wisdom", "community", "patience", "humility", "healing"],
    },
  },
]

export default function LearnEarnSystem() {
  const [modules, setModules] = useState<Module[]>(mockModules)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalXP: 0,
    totalFLB: 0,
    completedModules: [],
    currentStreak: 0,
    storiesShared: 0,
  })
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [storyContent, setStoryContent] = useState("")
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Generate quiz questions when quiz module is selected
    if (currentModule?.type === "quiz") {
      generateQuizQuestions()
    }
  }, [currentModule])

  const generateQuizQuestions = () => {
    const questions: QuizQuestion[] = []

    for (let i = 0; i < 5; i++) {
      const challenge = proverbValidator.generateProverbChallenge()
      questions.push({
        question: challenge.question,
        options: challenge.options,
        correctAnswer: challenge.correctAnswer,
        explanation: `This ${challenge.proverb.language} proverb from ${challenge.proverb.country} teaches us: ${challenge.proverb.cultural_notes}`,
        proverb: challenge.proverb,
      })
    }

    setQuizQuestions(questions)
    setQuizAnswers(new Array(questions.length).fill(-1))
    setCurrentQuestionIndex(0)
  }

  const startModule = (module: Module) => {
    setCurrentModule(module)
    setShowResults(false)

    if (module.type === "quiz") {
      generateQuizQuestions()
    }
  }

  const completeModule = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId)
    if (!module) return

    setModules((prev) => prev.map((m) => (m.id === moduleId ? { ...m, completed: true } : m)))

    setUserProgress((prev) => ({
      ...prev,
      totalXP: prev.totalXP + module.rewardXP,
      totalFLB: prev.totalFLB + module.rewardFLB,
      completedModules: [...prev.completedModules, moduleId],
      currentStreak: prev.currentStreak + 1,
    }))

    setCurrentModule(null)
    setShowResults(true)
  }

  const submitQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const finishQuiz = () => {
    if (!currentModule) return

    const correctAnswers = quizAnswers.reduce((count, answer, index) => {
      return answer === quizQuestions[index]?.correctAnswer ? count + 1 : count
    }, 0)

    const passingScore = Math.ceil(quizQuestions.length * 0.7) // 70% to pass

    if (correctAnswers >= passingScore) {
      completeModule(currentModule.id)
    } else {
      // Allow retry
      setCurrentQuestionIndex(0)
      setQuizAnswers(new Array(quizQuestions.length).fill(-1))
    }
  }

  const submitStory = () => {
    if (!currentModule || storyContent.length < 100) return

    setUserProgress((prev) => ({
      ...prev,
      storiesShared: prev.storiesShared + 1,
    }))

    completeModule(currentModule.id)
    setStoryContent("")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400"
      case "intermediate":
        return "text-yellow-400"
      case "advanced":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "interactive":
        return <BookOpen className="w-5 h-5" />
      case "quiz":
        return <Brain className="w-5 h-5" />
      case "story":
        return <Heart className="w-5 h-5" />
      case "video":
        return <Video className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  if (currentModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <Button variant="outline" onClick={() => setCurrentModule(null)} className="mb-4">
              ← Back to Modules
            </Button>

            <div className="flex items-center gap-3 mb-4">
              {getTypeIcon(currentModule.type)}
              <h1 className="text-3xl font-bold">{currentModule.title}</h1>
              <Badge className={getDifficultyColor(currentModule.difficulty)}>{currentModule.difficulty}</Badge>
            </div>

            <p className="text-slate-300 text-lg">{currentModule.description}</p>

            <div className="flex items-center gap-6 mt-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentModule.estimatedTime} min
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />+{currentModule.rewardFLB} FLB
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />+{currentModule.rewardXP} XP
              </div>
            </div>
          </div>

          {/* Module Content */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8">
              {currentModule.type === "interactive" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-orange-400 mb-4">"{currentModule.content.proverb}"</h2>
                    <p className="text-lg text-slate-300 mb-2">{currentModule.content.meaning}</p>
                    <Badge className="mb-6">{currentModule.content.language}</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-3">Cultural Context</h3>
                      <p className="text-slate-300">{currentModule.content.culturalContext}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-green-400 mb-3">Modern Application</h3>
                      <p className="text-slate-300">{currentModule.content.modernApplication}</p>
                    </div>
                  </div>

                  <div className="text-center pt-6">
                    <Button
                      onClick={() => completeModule(currentModule.id)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Complete Module
                    </Button>
                  </div>
                </div>
              )}

              {currentModule.type === "quiz" && quizQuestions.length > 0 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </h2>
                    <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="w-32" />
                  </div>

                  {currentQuestionIndex < quizQuestions.length && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        {quizQuestions[currentQuestionIndex].question}
                      </h3>

                      <div className="grid gap-3">
                        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={quizAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                            className="text-left justify-start p-4 h-auto"
                            onClick={() => submitQuizAnswer(currentQuestionIndex, index)}
                          >
                            {String.fromCharCode(65 + index)}) {option}
                          </Button>
                        ))}
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          disabled={currentQuestionIndex === 0}
                          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                        >
                          Previous
                        </Button>

                        {currentQuestionIndex === quizQuestions.length - 1 ? (
                          <Button
                            onClick={finishQuiz}
                            disabled={quizAnswers.includes(-1)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Submit Quiz
                          </Button>
                        ) : (
                          <Button
                            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                            disabled={quizAnswers[currentQuestionIndex] === -1}
                          >
                            Next
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentModule.type === "story" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-purple-400 mb-4">Share Your Ubuntu Story</h2>
                    <p className="text-slate-300 mb-6">
                      Tell us about a time when you embodied the Ubuntu philosophy - "I am because we are". How did you
                      help someone or how did community support help you?
                    </p>
                  </div>

                  <div>
                    <Textarea
                      placeholder="Share your Ubuntu story here... (minimum 100 words)"
                      value={storyContent}
                      onChange={(e) => setStoryContent(e.target.value)}
                      className="min-h-[200px] bg-slate-700 border-slate-600"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-slate-400">{storyContent.length} / 100 words minimum</span>
                      <span className={`text-sm ${storyContent.length >= 100 ? "text-green-400" : "text-slate-400"}`}>
                        {storyContent.length >= 100 ? "✓ Ready to submit" : "Keep writing..."}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={submitStory}
                      disabled={storyContent.length < 100}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Share Story & Earn Rewards
                    </Button>
                  </div>
                </div>
              )}

              {currentModule.type === "video" && (
                <div className="space-y-6">
                  <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-400">Video content coming soon</p>
                      <p className="text-sm text-slate-500">Interactive health advocacy training</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">Learning Objectives</h3>
                    <ul className="space-y-2">
                      {currentModule.content.topics.map((topic: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <Button onClick={() => completeModule(currentModule.id)} className="bg-blue-600 hover:bg-blue-700">
                      Mark as Complete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Learn & <span className="text-orange-400">Earn</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Master African wisdom, earn FLB tokens, and build Ubuntu community
          </p>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400">{userProgress.totalFLB}</div>
              <div className="text-sm text-slate-400">FLB Earned</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">{userProgress.totalXP}</div>
              <div className="text-sm text-slate-400">XP Gained</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">{userProgress.completedModules.length}</div>
              <div className="text-sm text-slate-400">Completed</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400">{userProgress.storiesShared}</div>
              <div className="text-sm text-slate-400">Stories Shared</div>
            </div>
          </div>
        </div>

        {/* Results Modal */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowResults(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-slate-800 rounded-lg p-8 max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Module Completed!</h2>
                  <p className="text-slate-300 mb-6">You've earned rewards for your learning</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span>FLB Tokens:</span>
                      <span className="text-orange-400 font-bold">+{currentModule?.rewardFLB}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="text-blue-400 font-bold">+{currentModule?.rewardXP} XP</span>
                    </div>
                  </div>

                  <Button onClick={() => setShowResults(false)} className="w-full">
                    Continue Learning
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <motion.div key={module.id} whileHover={{ scale: 1.02 }} className="relative">
              <Card
                className={`bg-slate-800 border-slate-700 h-full ${module.completed ? "ring-2 ring-green-500" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(module.type)}
                      <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                    </div>
                    {module.completed && <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>
                  <CardTitle className="text-white">{module.title}</CardTitle>
                  <CardDescription className="text-slate-300">{module.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.estimatedTime} min
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />+{module.rewardFLB}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />+{module.rewardXP}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => startModule(module)}
                      disabled={module.completed}
                      className={`w-full ${
                        module.completed ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      {module.completed ? "Completed" : "Start Module"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
