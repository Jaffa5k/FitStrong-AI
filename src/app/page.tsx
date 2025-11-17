'use client'

import { useState } from 'react'
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
  Trophy,
  Lock,
  Check,
  X,
  Video,
  TrendingDown,
  Activity,
  Flame,
  Weight,
  Salad,
  Pizza,
  Coffee
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
}

type WorkoutDay = {
  day: string
  focus: string
  exercises: Array<{
    name: string
    sets: number
    reps: string
    rest: string
    muscle: string
    videoUrl?: string
  }>
  duration: number
}

type MealPlan = {
  meal: string
  time: string
  calories: number
  protein: number
  carbs: number
  fats: number
  foods: string[]
}

export default function FitStrongPremium() {
  const [currentSection, setCurrentSection] = useState<'landing' | 'onboarding' | 'paywall' | 'dashboard' | 'workout' | 'nutrition' | 'subscription' | 'profile'>('landing')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({})
  const [isPremium, setIsPremium] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual')

  // Mock data
  const workoutPlan: WorkoutDay[] = [
    {
      day: 'Segunda-feira',
      focus: 'Peito e Tríceps',
      exercises: [
        { name: 'Supino Reto', sets: 4, reps: '8-12', rest: '90s', muscle: 'Peitoral', videoUrl: '#' },
        { name: 'Supino Inclinado', sets: 3, reps: '10-12', rest: '90s', muscle: 'Peitoral', videoUrl: '#' },
        { name: 'Crucifixo', sets: 3, reps: '12-15', rest: '60s', muscle: 'Peitoral', videoUrl: '#' },
        { name: 'Tríceps Testa', sets: 3, reps: '10-12', rest: '60s', muscle: 'Tríceps', videoUrl: '#' },
        { name: 'Tríceps Corda', sets: 3, reps: '12-15', rest: '45s', muscle: 'Tríceps', videoUrl: '#' }
      ],
      duration: 75
    },
    {
      day: 'Terça-feira',
      focus: 'Costas e Bíceps',
      exercises: [
        { name: 'Puxada Frontal', sets: 4, reps: '8-12', rest: '90s', muscle: 'Dorsal', videoUrl: '#' },
        { name: 'Remada Curvada', sets: 3, reps: '10-12', rest: '90s', muscle: 'Dorsal', videoUrl: '#' },
        { name: 'Remada Unilateral', sets: 3, reps: '12-15', rest: '60s', muscle: 'Dorsal', videoUrl: '#' },
        { name: 'Rosca Direta', sets: 3, reps: '10-12', rest: '60s', muscle: 'Bíceps', videoUrl: '#' },
        { name: 'Rosca Martelo', sets: 3, reps: '12-15', rest: '45s', muscle: 'Bíceps', videoUrl: '#' }
      ],
      duration: 80
    },
    {
      day: 'Quarta-feira',
      focus: 'Pernas',
      exercises: [
        { name: 'Agachamento Livre', sets: 4, reps: '8-12', rest: '120s', muscle: 'Quadríceps', videoUrl: '#' },
        { name: 'Leg Press', sets: 3, reps: '12-15', rest: '90s', muscle: 'Quadríceps', videoUrl: '#' },
        { name: 'Cadeira Extensora', sets: 3, reps: '12-15', rest: '60s', muscle: 'Quadríceps', videoUrl: '#' },
        { name: 'Cadeira Flexora', sets: 3, reps: '12-15', rest: '60s', muscle: 'Posterior', videoUrl: '#' },
        { name: 'Panturrilha', sets: 4, reps: '15-20', rest: '45s', muscle: 'Panturrilha', videoUrl: '#' }
      ],
      duration: 85
    },
    {
      day: 'Quinta-feira',
      focus: 'Ombros e Abdômen',
      exercises: [
        { name: 'Desenvolvimento', sets: 4, reps: '8-12', rest: '90s', muscle: 'Ombros', videoUrl: '#' },
        { name: 'Elevação Lateral', sets: 3, reps: '12-15', rest: '60s', muscle: 'Ombros', videoUrl: '#' },
        { name: 'Elevação Frontal', sets: 3, reps: '12-15', rest: '60s', muscle: 'Ombros', videoUrl: '#' },
        { name: 'Abdominal Supra', sets: 3, reps: '15-20', rest: '45s', muscle: 'Abdômen', videoUrl: '#' },
        { name: 'Prancha', sets: 3, reps: '60s', rest: '60s', muscle: 'Core', videoUrl: '#' }
      ],
      duration: 70
    },
    {
      day: 'Sexta-feira',
      focus: 'Full Body',
      exercises: [
        { name: 'Levantamento Terra', sets: 4, reps: '6-10', rest: '120s', muscle: 'Corpo todo', videoUrl: '#' },
        { name: 'Supino Reto', sets: 3, reps: '10-12', rest: '90s', muscle: 'Peitoral', videoUrl: '#' },
        { name: 'Puxada Frontal', sets: 3, reps: '10-12', rest: '90s', muscle: 'Dorsal', videoUrl: '#' },
        { name: 'Agachamento', sets: 3, reps: '12-15', rest: '90s', muscle: 'Pernas', videoUrl: '#' },
        { name: 'Desenvolvimento', sets: 3, reps: '10-12', rest: '60s', muscle: 'Ombros', videoUrl: '#' }
      ],
      duration: 90
    }
  ]

  const mealPlan: MealPlan[] = [
    {
      meal: 'Café da Manhã',
      time: '07:00',
      calories: 450,
      protein: 30,
      carbs: 50,
      fats: 12,
      foods: ['3 ovos mexidos', '2 fatias de pão integral', '1 banana', 'Café preto']
    },
    {
      meal: 'Lanche da Manhã',
      time: '10:00',
      calories: 200,
      protein: 20,
      carbs: 15,
      fats: 8,
      foods: ['Whey protein', '1 maçã', '10 amêndoas']
    },
    {
      meal: 'Almoço',
      time: '13:00',
      calories: 650,
      protein: 45,
      carbs: 70,
      fats: 18,
      foods: ['200g frango grelhado', '150g arroz integral', '100g brócolis', 'Salada verde']
    },
    {
      meal: 'Lanche da Tarde',
      time: '16:00',
      calories: 250,
      protein: 15,
      carbs: 30,
      fats: 8,
      foods: ['Iogurte grego', '1 banana', 'Granola']
    },
    {
      meal: 'Jantar',
      time: '19:00',
      calories: 550,
      protein: 40,
      carbs: 45,
      fats: 20,
      foods: ['200g salmão', '150g batata doce', 'Legumes grelhados']
    },
    {
      meal: 'Ceia',
      time: '22:00',
      calories: 150,
      protein: 25,
      carbs: 5,
      fats: 5,
      foods: ['Caseína', '1 colher de pasta de amendoim']
    }
  ]

  const progressData = [
    { week: 'Sem 1', weight: 85, muscle: 35, fat: 20 },
    { week: 'Sem 2', weight: 84.5, muscle: 35.2, fat: 19.3 },
    { week: 'Sem 3', weight: 84, muscle: 35.5, fat: 18.5 },
    { week: 'Sem 4', weight: 83.5, muscle: 36, fat: 17.5 },
    { week: 'Sem 5', weight: 83, muscle: 36.5, fat: 16.5 },
    { week: 'Sem 6', weight: 82.5, muscle: 37, fat: 15.5 }
  ]

  const handleStartOnboarding = () => {
    setCurrentSection('onboarding')
    setOnboardingStep(0)
  }

  const handleOnboardingNext = () => {
    const totalSteps = 4
    if (onboardingStep < totalSteps - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      setCurrentSection('paywall')
    }
  }

  const updateProfile = (field: string, value: any) => {
    setUserProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    setSelectedPlan(plan)
    setIsPremium(true)
    setCurrentSection('dashboard')
  }

  // LANDING PAGE
  if (currentSection === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <header className="relative z-10 p-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">FitStrong</span>
            </div>
            <button className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all">
              Login
            </button>
          </div>
        </header>

        <main className="relative z-10 px-6 pt-12 pb-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Transforme Seu Corpo
                <span className="block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Com Inteligência
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Treinos personalizados, planos de nutrição inteligentes e acompanhamento completo do seu progresso.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Treinos Premium</h3>
                <p className="text-gray-400">Planos de 4-5 dias com biblioteca de vídeos e rastreamento de carga</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nutrição Completa</h3>
                <p className="text-gray-400">Planos de dieta personalizados com rastreamento de macros</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Progresso Visual</h3>
                <p className="text-gray-400">Gráficos detalhados da sua evolução física e performance</p>
              </div>
            </div>

            <button 
              onClick={handleStartOnboarding}
              className="group bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Começar Agora
              <ChevronRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-gray-400 mt-4">7 dias grátis • Cancele quando quiser</p>
          </div>
        </main>
      </div>
    )
  }

  // ONBOARDING
  if (currentSection === 'onboarding') {
    const steps = [
      {
        title: "Qual é o seu objetivo principal?",
        component: (
          <div className="space-y-4">
            {[
              { id: 'weight_loss', label: 'Emagrecimento', icon: TrendingDown, desc: 'Perder peso e definir o corpo' },
              { id: 'muscle_gain', label: 'Hipertrofia', icon: Dumbbell, desc: 'Ganhar massa muscular' },
              { id: 'definition', label: 'Definição', icon: Target, desc: 'Manter peso e definir músculos' },
              { id: 'recomposition', label: 'Recomposição', icon: Trophy, desc: 'Perder gordura e ganhar músculo' }
            ].map((goal) => (
              <button
                key={goal.id}
                onClick={() => updateProfile('goal', goal.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  userProfile.goal === goal.id 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <goal.icon className="w-8 h-8 text-purple-500" />
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
        title: "Qual seu nível de experiência?",
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
                    ? 'border-purple-500 bg-purple-500/10' 
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
        title: "Informações pessoais",
        component: (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Nome</label>
              <input
                type="text"
                value={userProfile.name || ''}
                onChange={(e) => updateProfile('name', e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
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
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="25"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Gênero</label>
                <select
                  value={userProfile.gender || ''}
                  onChange={(e) => updateProfile('gender', e.target.value)}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
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
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="70"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Altura (cm)</label>
                <input
                  type="number"
                  value={userProfile.height || ''}
                  onChange={(e) => updateProfile('height', parseInt(e.target.value))}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="175"
                />
              </div>
            </div>
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
                        ? 'border-purple-500 bg-purple-500/10' 
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
                        ? 'border-purple-500 bg-purple-500/10' 
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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FitStrong</span>
            </div>
            <div className="text-gray-400">
              {onboardingStep + 1} de {steps.length}
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((onboardingStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-8">
              {steps[onboardingStep].title}
            </h2>
            {steps[onboardingStep].component}
            
            <button
              onClick={handleOnboardingNext}
              className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-2xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              {onboardingStep === steps.length - 1 ? 'Ver Planos' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // PAYWALL
  if (currentSection === 'paywall') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 p-6">
        <div className="max-w-5xl mx-auto py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Desbloqueie Seu Potencial Máximo
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Acesso completo a treinos premium, planos de nutrição e acompanhamento profissional
            </p>
          </div>

          {/* Plan Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 inline-flex">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setSelectedPlan('annual')}
                className={`px-8 py-3 rounded-xl font-bold transition-all relative ${
                  selectedPlan === 'annual'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  -40%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">Gratuito</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">R$ 0</span>
                <span className="text-gray-400">/mês</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">3 treinos básicos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Rastreamento básico</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-400" />
                  <span className="text-gray-500">Planos de nutrição</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-400" />
                  <span className="text-gray-500">Biblioteca de vídeos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-400" />
                  <span className="text-gray-500">Gráficos de progresso</span>
                </li>
              </ul>
              
              <button className="w-full py-4 bg-gray-800 text-gray-400 rounded-2xl font-bold cursor-not-allowed">
                Plano Atual
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  MAIS POPULAR
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="mb-6">
                {selectedPlan === 'monthly' ? (
                  <>
                    <span className="text-4xl font-bold text-white">R$ 49,90</span>
                    <span className="text-gray-400">/mês</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-white">R$ 29,90</span>
                    <span className="text-gray-400">/mês</span>
                    <div className="text-sm text-gray-400 mt-1">
                      R$ 358,80 cobrado anualmente
                    </div>
                  </>
                )}
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Treinos ilimitados personalizados</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Planos de 4-5 dias por semana</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Biblioteca com 500+ vídeos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Rastreamento de carga e progresso</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Planos de nutrição completos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Rastreamento de macros</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Gráficos detalhados de evolução</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Suporte prioritário</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleSubscribe(selectedPlan)}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                Começar 7 Dias Grátis
              </button>
              
              <p className="text-center text-gray-400 text-sm mt-4">
                Cancele quando quiser • Sem compromisso
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-1">7 Dias Grátis</h4>
              <p className="text-gray-400 text-sm">Teste sem compromisso</p>
            </div>
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6">
              <Lock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-1">Pagamento Seguro</h4>
              <p className="text-gray-400 text-sm">Criptografia SSL</p>
            </div>
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-1">+10k Usuários</h4>
              <p className="text-gray-400 text-sm">Avaliação 4.9/5</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // DASHBOARD
  if (currentSection === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <header className="p-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Olá, {userProfile.name}!</h1>
                <p className="text-gray-400 text-sm">Pronto para treinar hoje?</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentSection('workout')}
                className="text-gray-400 hover:text-white transition-all"
              >
                Treinos
              </button>
              <button 
                onClick={() => setCurrentSection('nutrition')}
                className="text-gray-400 hover:text-white transition-all"
              >
                Nutrição
              </button>
              <button 
                onClick={() => setCurrentSection('profile')}
                className="text-gray-400 hover:text-white transition-all"
              >
                Perfil
              </button>
              {isPremium && (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-full">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-bold">Premium</span>
                </div>
              )}
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
                  <span className="text-2xl font-bold text-white">24</span>
                </div>
                <h3 className="text-gray-400 text-sm">Treinos Concluídos</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">-3.5kg</span>
                </div>
                <h3 className="text-gray-400 text-sm">Progresso</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">2,450</span>
                </div>
                <h3 className="text-gray-400 text-sm">Calorias Queimadas</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-orange-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">92%</span>
                </div>
                <h3 className="text-gray-400 text-sm">Consistência</h3>
              </div>
            </div>

            {/* Today's Workout */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Treino de Hoje</h2>
                  <p className="text-gray-400">{workoutPlan[0].focus} • {workoutPlan[0].duration} min</p>
                </div>
                <button 
                  onClick={() => setCurrentSection('workout')}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  <Play className="w-5 h-5" />
                  <span>Iniciar Treino</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {workoutPlan[0].exercises.slice(0, 4).map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <span className="text-purple-400 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{exercise.name}</h3>
                        <p className="text-gray-400 text-sm">{exercise.muscle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{exercise.sets} x {exercise.reps}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <button 
                onClick={() => setCurrentSection('workout')}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Treinos Premium</h3>
                <p className="text-gray-400 text-sm">Acesse sua biblioteca completa de treinos</p>
              </button>
              
              <button 
                onClick={() => setCurrentSection('nutrition')}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Plano Alimentar</h3>
                <p className="text-gray-400 text-sm">Dieta personalizada com rastreamento de macros</p>
              </button>
              
              <button 
                onClick={() => setCurrentSection('profile')}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Ver Progresso</h3>
                <p className="text-gray-400 text-sm">Acompanhe sua evolução com gráficos detalhados</p>
              </button>
            </div>

            {/* Premium CTA (if not premium) */}
            {!isPremium && (
              <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-600/10 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Crown className="w-6 h-6 text-yellow-500" />
                      <h2 className="text-2xl font-bold text-white">Upgrade para Premium</h2>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Desbloqueie treinos avançados, planos de nutrição completos e muito mais
                    </p>
                  </div>
                  <button 
                    onClick={() => setCurrentSection('subscription')}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all whitespace-nowrap"
                  >
                    Ver Planos
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  // WORKOUT SECTION
  if (currentSection === 'workout') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <header className="p-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Voltar</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Treinos Premium</h1>
            <div className="w-20" />
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Seu Plano Semanal</h2>
              <p className="text-gray-400 mb-6">
                Plano personalizado de {workoutPlan.length} dias por semana • Objetivo: {
                  userProfile.goal === 'muscle_gain' ? 'Hipertrofia' :
                  userProfile.goal === 'weight_loss' ? 'Emagrecimento' :
                  userProfile.goal === 'definition' ? 'Definição' : 'Recomposição'
                }
              </p>
            </div>

            <div className="space-y-6">
              {workoutPlan.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{day.day}</h3>
                      <p className="text-gray-400">{day.focus} • {day.duration} minutos</p>
                    </div>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:from-purple-600 hover:to-pink-700 transition-all">
                      <Play className="w-5 h-5" />
                      <span>Iniciar</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {day.exercises.map((exercise, exIndex) => (
                      <div key={exIndex} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-800 transition-all group">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-purple-400 font-bold">{exIndex + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium mb-1">{exercise.name}</h4>
                            <p className="text-gray-400 text-sm">{exercise.muscle}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-white font-medium">{exercise.sets} séries</p>
                            <p className="text-gray-400 text-sm">{exercise.reps} reps</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">Descanso</p>
                            <p className="text-gray-400 text-sm">{exercise.rest}</p>
                          </div>
                          <button className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center hover:bg-purple-500/30 transition-all">
                            <Video className="w-5 h-5 text-purple-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Exercise Library */}
            <div className="mt-8 bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Biblioteca de Exercícios</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {['Peito', 'Costas', 'Pernas', 'Ombros', 'Bíceps', 'Tríceps', 'Abdômen', 'Cardio'].map((muscle) => (
                  <button key={muscle} className="p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-800 transition-all text-left group">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Dumbbell className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold">{muscle}</h3>
                    <p className="text-gray-400 text-sm">50+ exercícios</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // NUTRITION SECTION
  if (currentSection === 'nutrition') {
    const totalCalories = mealPlan.reduce((sum, meal) => sum + meal.calories, 0)
    const totalProtein = mealPlan.reduce((sum, meal) => sum + meal.protein, 0)
    const totalCarbs = mealPlan.reduce((sum, meal) => sum + meal.carbs, 0)
    const totalFats = mealPlan.reduce((sum, meal) => sum + meal.fats, 0)

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <header className="p-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Voltar</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Nutrição Premium</h1>
            <div className="w-20" />
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Macros Summary */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">{totalCalories}</span>
                </div>
                <h3 className="text-gray-400 text-sm">Calorias Diárias</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">{totalProtein}g</span>
                </div>
                <h3 className="text-gray-400 text-sm">Proteínas</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Pizza className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">{totalCarbs}g</span>
                </div>
                <h3 className="text-gray-400 text-sm">Carboidratos</h3>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <Coffee className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">{totalFats}g</span>
                </div>
                <h3 className="text-gray-400 text-sm">Gorduras</h3>
              </div>
            </div>

            {/* Meal Plan */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Plano Alimentar de Hoje</h2>
              
              <div className="space-y-4">
                {mealPlan.map((meal, index) => (
                  <div key={index} className="p-6 bg-gray-800/50 rounded-2xl hover:bg-gray-800 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                          <Utensils className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{meal.meal}</h3>
                          <p className="text-gray-400 text-sm">{meal.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{meal.calories} kcal</p>
                        <p className="text-gray-400 text-sm">
                          P: {meal.protein}g • C: {meal.carbs}g • G: {meal.fats}g
                        </p>
                      </div>
                    </div>
                    
                    <div className="pl-16">
                      <ul className="space-y-2">
                        {meal.foods.map((food, foodIndex) => (
                          <li key={foodIndex} className="flex items-center space-x-2 text-gray-300">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Macro Distribution */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Distribuição de Macros</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Proteínas</span>
                    <span className="text-gray-400">{Math.round((totalProtein * 4 / totalCalories) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all"
                      style={{ width: `${(totalProtein * 4 / totalCalories) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Carboidratos</span>
                    <span className="text-gray-400">{Math.round((totalCarbs * 4 / totalCalories) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${(totalCarbs * 4 / totalCalories) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Gorduras</span>
                    <span className="text-gray-400">{Math.round((totalFats * 9 / totalCalories) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all"
                      style={{ width: `${(totalFats * 9 / totalCalories) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // SUBSCRIPTION PAGE
  if (currentSection === 'subscription') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <header className="p-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Voltar</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Planos e Assinatura</h1>
            <div className="w-20" />
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-5xl mx-auto py-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Escolha Seu Plano
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Invista no seu corpo e saúde com acesso completo a todos os recursos premium
              </p>
            </div>

            {/* Plan Toggle */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 inline-flex">
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${
                    selectedPlan === 'monthly'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setSelectedPlan('annual')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all relative ${
                    selectedPlan === 'annual'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Anual
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Economize 40%
                  </span>
                </button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Comparação de Planos</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Recursos</th>
                      <th className="text-center py-4 px-4 text-gray-400 font-medium">Gratuito</th>
                      <th className="text-center py-4 px-4 text-white font-bold">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr>
                      <td className="py-4 px-4 text-white">Treinos personalizados</td>
                      <td className="py-4 px-4 text-center text-gray-400">3 básicos</td>
                      <td className="py-4 px-4 text-center text-green-400">Ilimitados</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">Planos de 4-5 dias</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">Biblioteca de vídeos</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center text-green-400">500+ vídeos</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">Rastreamento de carga</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">Planos de nutrição</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">Rastreamento de macros</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">Gráficos de progresso</td>
                      <td className="py-4 px-4 text-center text-gray-400">Básico</td>
                      <td className="py-4 px-4 text-center text-green-400">Avançado</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">Suporte</td>
                      <td className="py-4 px-4 text-center text-gray-400">Email</td>
                      <td className="py-4 px-4 text-center text-green-400">Prioritário</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-500">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Plano Premium</h3>
                  {selectedPlan === 'monthly' ? (
                    <>
                      <div className="text-5xl font-bold text-white mb-2">R$ 49,90</div>
                      <div className="text-gray-400">por mês</div>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl font-bold text-white mb-2">R$ 29,90</div>
                      <div className="text-gray-400">por mês</div>
                      <div className="text-sm text-green-400 mt-2">
                        R$ 358,80 cobrado anualmente • Economize R$ 240
                      </div>
                    </>
                  )}
                </div>

                <button 
                  onClick={() => handleSubscribe(selectedPlan)}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 mb-4"
                >
                  Assinar Agora
                </button>

                <p className="text-center text-gray-400 text-sm">
                  7 dias grátis • Cancele quando quiser
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Perguntas Frequentes</h2>
              
              <div className="space-y-4">
                {[
                  {
                    q: 'Posso cancelar a qualquer momento?',
                    a: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas.'
                  },
                  {
                    q: 'Como funciona o período de teste?',
                    a: '7 dias grátis para testar todos os recursos premium. Cancele antes do fim do período e não será cobrado.'
                  },
                  {
                    q: 'Quais formas de pagamento são aceitas?',
                    a: 'Aceitamos cartão de crédito, PayPal e Pix para pagamentos recorrentes.'
                  },
                  {
                    q: 'Posso mudar de plano depois?',
                    a: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // PROFILE SECTION
  if (currentSection === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <header className="p-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Voltar</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Perfil e Progresso</h1>
            <div className="w-20" />
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Profile Info */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 mb-8">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{userProfile.name}</h2>
                  <p className="text-gray-400">
                    {userProfile.age} anos • {userProfile.weight}kg • {userProfile.height}cm
                  </p>
                  {isPremium && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <span className="text-yellow-500 font-bold">Membro Premium</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-800/50 rounded-2xl">
                  <h3 className="text-gray-400 text-sm mb-2">Objetivo</h3>
                  <p className="text-white font-bold">
                    {userProfile.goal === 'muscle_gain' ? 'Hipertrofia' :
                     userProfile.goal === 'weight_loss' ? 'Emagrecimento' :
                     userProfile.goal === 'definition' ? 'Definição' : 'Recomposição'}
                  </p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-2xl">
                  <h3 className="text-gray-400 text-sm mb-2">Nível</h3>
                  <p className="text-white font-bold">
                    {userProfile.experience === 'beginner' ? 'Iniciante' :
                     userProfile.experience === 'intermediate' ? 'Intermediário' : 'Avançado'}
                  </p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-2xl">
                  <h3 className="text-gray-400 text-sm mb-2">Frequência</h3>
                  <p className="text-white font-bold">{userProfile.daysPerWeek}x por semana</p>
                </div>
              </div>
            </div>

            {/* Progress Charts */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Weight Progress */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Evolução de Peso</h2>
                <div className="space-y-4">
                  {progressData.map((data, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">{data.week}</span>
                        <span className="text-white font-bold">{data.weight}kg</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${(data.weight / 85) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-medium">Progresso Total</span>
                    <span className="text-green-400 font-bold text-xl">-2.5kg</span>
                  </div>
                </div>
              </div>

              {/* Body Composition */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Composição Corporal</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Massa Muscular</span>
                      <span className="text-blue-400 font-bold">{progressData[progressData.length - 1].muscle}kg</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                        style={{ width: '65%' }}
                      />
                    </div>
                    <p className="text-green-400 text-sm mt-1">+2kg desde o início</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Gordura Corporal</span>
                      <span className="text-orange-400 font-bold">{progressData[progressData.length - 1].fat}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all"
                        style={{ width: '35%' }}
                      />
                    </div>
                    <p className="text-green-400 text-sm mt-1">-4.5% desde o início</p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                      <div className="text-blue-400 text-2xl font-bold mb-1">+2kg</div>
                      <div className="text-gray-400 text-sm">Músculo Ganho</div>
                    </div>
                    <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                      <div className="text-orange-400 text-2xl font-bold mb-1">-4.5kg</div>
                      <div className="text-gray-400 text-sm">Gordura Perdida</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Estatísticas de Performance</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="p-6 bg-gray-800/50 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">24</div>
                  <div className="text-gray-400 text-sm">Treinos Completos</div>
                </div>

                <div className="p-6 bg-gray-800/50 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Flame className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">18,450</div>
                  <div className="text-gray-400 text-sm">Calorias Queimadas</div>
                </div>

                <div className="p-6 bg-gray-800/50 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">32h</div>
                  <div className="text-gray-400 text-sm">Tempo Total</div>
                </div>

                <div className="p-6 bg-gray-800/50 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">92%</div>
                  <div className="text-gray-400 text-sm">Taxa de Conclusão</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}
