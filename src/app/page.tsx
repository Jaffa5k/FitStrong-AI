'use client'

import { useState, useEffect } from 'react'
import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  User, 
  Calendar, 
  Clock, 
  Zap, 
  Crown, 
  ChevronRight,
  Play,
  Star,
  CheckCircle,
  BarChart3,
  Apple,
  Utensils,
  Trophy
} from 'lucide-react'

type UserProfile = {
  name: string
  age: number
  weight: number
  height: number
  gender: 'male' | 'female'
  experience: 'beginner' | 'intermediate' | 'advanced'
  goal: 'weight_loss' | 'muscle_gain' | 'definition' | 'recomposition'
  daysPerWeek: number
  timePerSession: number
  restrictions: string[]
}

type WorkoutPlan = {
  day: string
  focus: string
  exercises: Array<{
    name: string
    sets: number
    reps: string
    rest: string
    muscle: string
  }>
  duration: number
}

export default function FitStrongAI() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'onboarding' | 'profile' | 'dashboard'>('landing')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({})
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan[]>([])
  const [isPremium, setIsPremium] = useState(false)

  // Simulação de geração de treino com IA
  const generateWorkoutPlan = (profile: UserProfile): WorkoutPlan[] => {
    const plans: WorkoutPlan[] = []
    
    if (profile.goal === 'muscle_gain') {
      plans.push({
        day: 'Segunda-feira',
        focus: 'Peito e Tríceps',
        exercises: [
          { name: 'Supino Reto', sets: 4, reps: '8-12', rest: '90s', muscle: 'Peitoral' },
          { name: 'Supino Inclinado', sets: 3, reps: '10-12', rest: '90s', muscle: 'Peitoral' },
          { name: 'Crucifixo', sets: 3, reps: '12-15', rest: '60s', muscle: 'Peitoral' },
          { name: 'Tríceps Testa', sets: 3, reps: '10-12', rest: '60s', muscle: 'Tríceps' },
          { name: 'Tríceps Corda', sets: 3, reps: '12-15', rest: '45s', muscle: 'Tríceps' }
        ],
        duration: 75
      })
      
      plans.push({
        day: 'Terça-feira',
        focus: 'Costas e Bíceps',
        exercises: [
          { name: 'Puxada Frontal', sets: 4, reps: '8-12', rest: '90s', muscle: 'Dorsal' },
          { name: 'Remada Curvada', sets: 3, reps: '10-12', rest: '90s', muscle: 'Dorsal' },
          { name: 'Remada Unilateral', sets: 3, reps: '12-15', rest: '60s', muscle: 'Dorsal' },
          { name: 'Rosca Direta', sets: 3, reps: '10-12', rest: '60s', muscle: 'Bíceps' },
          { name: 'Rosca Martelo', sets: 3, reps: '12-15', rest: '45s', muscle: 'Bíceps' }
        ],
        duration: 80
      })
    } else if (profile.goal === 'weight_loss') {
      plans.push({
        day: 'Segunda-feira',
        focus: 'HIIT + Força',
        exercises: [
          { name: 'Burpees', sets: 4, reps: '30s', rest: '30s', muscle: 'Corpo todo' },
          { name: 'Agachamento', sets: 3, reps: '15-20', rest: '45s', muscle: 'Pernas' },
          { name: 'Flexão', sets: 3, reps: '10-15', rest: '45s', muscle: 'Peito' },
          { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '30s', muscle: 'Core' },
          { name: 'Prancha', sets: 3, reps: '45s', rest: '60s', muscle: 'Core' }
        ],
        duration: 45
      })
    }
    
    return plans
  }

  const handleStartOnboarding = () => {
    setCurrentStep('onboarding')
    setOnboardingStep(0)
  }

  const handleOnboardingNext = (steps) => {
    if (onboardingStep < steps.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      // Gerar plano de treino com IA
      const plan = generateWorkoutPlan(userProfile as UserProfile)
      setWorkoutPlan(plan)
      setCurrentStep('dashboard')
    }
  }

  const updateProfile = (field: string, value: any) => {
    setUserProfile(prev => ({ ...prev, [field]: value }))
  }

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900">
        {/* Header */}
        <header className="relative z-10 p-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">FitStrong AI</span>
            </div>
            <button className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all">
              Login
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="relative z-10 px-6 pt-12 pb-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Seu Personal Trainer
                <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Inteligente
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Treinos e dietas personalizadas criadas por IA. Transforme seu corpo com planos únicos baseados no seu perfil e objetivos.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">IA Personalizada</h3>
                <p className="text-gray-400">Treinos únicos gerados automaticamente baseados no seu perfil e progresso</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Dietas Inteligentes</h3>
                <p className="text-gray-400">Planos alimentares adaptativos com receitas e substituições automáticas</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Progresso Real</h3>
                <p className="text-gray-400">Acompanhe sua evolução com métricas detalhadas e ajustes automáticos</p>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleStartOnboarding}
              className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Começar Agora
              <ChevronRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-gray-400 mt-4">Grátis por 7 dias • Cancele quando quiser</p>
          </div>
        </main>

        {/* Premium Badge */}
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full flex items-center space-x-2 shadow-2xl">
          <Crown className="w-5 h-5" />
          <span className="font-bold">Premium</span>
        </div>
      </div>
    )
  }

  if (currentStep === 'onboarding') {
    const steps = [
      {
        title: "Qual é o seu objetivo?",
        component: (
          <div className="space-y-4">
            {[
              { id: 'weight_loss', label: 'Emagrecimento', icon: TrendingUp, desc: 'Perder peso e definir o corpo' },
              { id: 'muscle_gain', label: 'Hipertrofia', icon: Dumbbell, desc: 'Ganhar massa muscular' },
              { id: 'definition', label: 'Definição', icon: Target, desc: 'Manter peso e definir músculos' },
              { id: 'recomposition', label: 'Recomposição', icon: Trophy, desc: 'Perder gordura e ganhar músculo' }
            ].map((goal) => (
              <button
                key={goal.id}
                onClick={() => updateProfile('goal', goal.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  userProfile.goal === goal.id 
                    ? 'border-orange-500 bg-orange-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <goal.icon className="w-8 h-8 text-orange-500" />
                  <div className="text-left">
                    <h3 className="text-white font-bold">{goal.label}</h3>
                    <p className="text-gray-400 text-sm">{goal.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )
      },
      {
        title: "Informações básicas",
        component: (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Nome</label>
              <input
                type="text"
                value={userProfile.name || ''}
                onChange={(e) => updateProfile('name', e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                placeholder="Seu nome"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Idade</label>
                <input
                  type="number"
                  value={userProfile.age || ''}
                  onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                  placeholder="25"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Gênero</label>
                <select
                  value={userProfile.gender || ''}
                  onChange={(e) => updateProfile('gender', e.target.value)}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Peso (kg)</label>
                <input
                  type="number"
                  value={userProfile.weight || ''}
                  onChange={(e) => updateProfile('weight', parseFloat(e.target.value))}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                  placeholder="70"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Altura (cm)</label>
                <input
                  type="number"
                  value={userProfile.height || ''}
                  onChange={(e) => updateProfile('height', parseInt(e.target.value))}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                  placeholder="175"
                />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Nível de experiência",
        component: (
          <div className="space-y-4">
            {[
              { id: 'beginner', label: 'Iniciante', desc: 'Pouca ou nenhuma experiência' },
              { id: 'intermediate', label: 'Intermediário', desc: '6 meses a 2 anos de treino' },
              { id: 'advanced', label: 'Avançado', desc: 'Mais de 2 anos de experiência' }
            ].map((level) => (
              <button
                key={level.id}
                onClick={() => updateProfile('experience', level.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  userProfile.experience === level.id 
                    ? 'border-orange-500 bg-orange-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="text-left">
                  <h3 className="text-white font-bold">{level.label}</h3>
                  <p className="text-gray-400 text-sm">{level.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )
      },
      {
        title: "Disponibilidade de treino",
        component: (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-4">Quantos dias por semana?</label>
              <div className="grid grid-cols-4 gap-3">
                {[3, 4, 5, 6].map((days) => (
                  <button
                    key={days}
                    onClick={() => updateProfile('daysPerWeek', days)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userProfile.daysPerWeek === days 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <span className="text-white font-bold text-xl">{days}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-4">Tempo por sessão (minutos)</label>
              <div className="grid grid-cols-3 gap-3">
                {[45, 60, 90].map((time) => (
                  <button
                    key={time}
                    onClick={() => updateProfile('timePerSession', time)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userProfile.timePerSession === time 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <span className="text-white font-bold">{time}min</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FitStrong AI</span>
            </div>
            <div className="text-gray-400">
              {onboardingStep + 1} de {steps.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((onboardingStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Step Content */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-8">{steps[onboardingStep].title ?? "Carregando..."}</h2>
            {steps[onboardingStep].component}
            
            <button
              onClick={() => handleOnboardingNext(steps)}
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              {onboardingStep === steps.length - 1 ? 'Gerar Meu Plano' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900">
        {/* Header */}
        <header className="p-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Olá, {userProfile.name}!</h1>
                <p className="text-gray-400 text-sm">Pronto para treinar hoje?</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isPremium && (
                <button 
                  onClick={() => setIsPremium(true)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-xl font-bold flex items-center space-x-2 hover:from-yellow-600 hover:to-yellow-700 transition-all"
                >
                  <Crown className="w-4 h-4" />
                  <span>Upgrade Premium</span>
                </button>
              )}
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">12</span>
                </div>
                <h3 className="text-gray-400 text-sm">Treinos Concluídos</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">-2.5kg</span>
                </div>
                <h3 className="text-gray-400 text-sm">Progresso</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">18h</span>
                </div>
                <h3 className="text-gray-400 text-sm">Tempo Total</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">85%</span>
                </div>
                <h3 className="text-gray-400 text-sm">Consistência</h3>
              </div>
            </div>

            {/* Today's Workout */}
            {workoutPlan.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Treino de Hoje</h2>
                    <p className="text-gray-400">{workoutPlan[0].focus} • {workoutPlan[0].duration} min</p>
                  </div>
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:from-orange-600 hover:to-orange-700 transition-all">
                    <Play className="w-5 h-5" />
                    <span>Iniciar Treino</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {workoutPlan[0].exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                          <span className="text-orange-400 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{exercise.name}</h3>
                          <p className="text-gray-400 text-sm">{exercise.muscle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{exercise.sets} x {exercise.reps}</p>
                        <p className="text-gray-400 text-sm">Descanso: {exercise.rest}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Premium Features */}
            {!isPremium && (
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/20 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Crown className="w-6 h-6 text-yellow-500" />
                      <h2 className="text-2xl font-bold text-white">Desbloqueie o Premium</h2>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Treinos avançados gerados por IA</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Planos de dieta personalizados</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Chat com IA nutricional</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Análise detalhada de progresso</span>
                      </li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => setIsPremium(true)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    Assinar Premium
                    <br />
                    <span className="text-sm">R$ 29,90/mês</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <button className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all text-left">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Ver Progresso</h3>
                <p className="text-gray-400 text-sm">Acompanhe sua evolução com gráficos detalhados</p>
              </button>
              
              <button className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all text-left">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Utensils className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Plano Alimentar</h3>
                <p className="text-gray-400 text-sm">Dieta personalizada baseada nos seus objetivos</p>
              </button>
              
              <button className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all text-left">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Dumbbell className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Biblioteca de Exercícios</h3>
                <p className="text-gray-400 text-sm">Mais de 500 exercícios com vídeos demonstrativos</p>
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}
