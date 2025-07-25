"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Badge } from "@/app/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import {
  BookOpen,
  Search,
  Hash,
  CheckCircle,
  XCircle,
  Globe,
  Heart,
  Zap,
  RefreshCw,
  Filter,
  MapPin,
  Languages,
  Lightbulb,
  Shield,
  AlertTriangle,
} from "lucide-react"
import { proverbValidator, type AfricanProverb } from "@/app/lib/proverb-validator"

interface ProverbValidationResult {
  isValid: boolean
  proverb?: AfricanProverb
  proverbHash?: string
  culturalValidation?: {
    isValid: boolean
    culturalRelevance: number
    message: string
  }
  message?: string
  suggestedProverb?: AfricanProverb
}

export function ProverbTester() {
  const [testProverb, setTestProverb] = useState("")
  const [testAction, setTestAction] = useState("")
  const [validationResult, setValidationResult] = useState<ProverbValidationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<AfricanProverb[]>([])
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [availableFilters, setAvailableFilters] = useState({
    regions: [] as string[],
    languages: [] as string[],
    countries: [] as string[],
  })
  const [challenge, setChallenge] = useState<any>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const useProverbFromSearch = (proverb: AfricanProverb) => {
    setTestProverb(proverb.translated_meaning)
    setValidationResult(null)
  }

  // Load available filters on component mount
  useEffect(() => {
    setAvailableFilters({
      regions: proverbValidator.getAvailableRegions(),
      languages: proverbValidator.getAvailableLanguages(),
      countries: proverbValidator.getAvailableCountries(),
    })
  }, [])

  // Search proverbs when filters change
  useEffect(() => {
    const filters: any = {}
    if (selectedRegion) filters.region = selectedRegion
    if (selectedLanguage) filters.language = selectedLanguage
    if (selectedCountry) filters.country = selectedCountry

    const results = proverbValidator.searchProverbs(filters)
    setSearchResults(results.slice(0, 10)) // Limit to 10 results for display
  }, [selectedRegion, selectedLanguage, selectedCountry])

  const handleProverbValidation = async () => {
    if (!testProverb.trim()) return

    setIsLoading(true)
    setValidationResult(null)

    try {
      // Use the API route for validation
      const response = await fetch("/api/proverb-validation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proverb: testProverb,
          action: testAction || undefined,
        }),
      })

      const result = await response.json()
      setValidationResult(result)
    } catch (error) {
      console.error("Validation error:", error)
      setValidationResult({
        isValid: false,
        message: "Failed to validate proverb. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRandomProverb = () => {
    const randomProverb = proverbValidator.getRandomProverb()
    setTestProverb(randomProverb.translated_meaning)
    setValidationResult(null)
  }

  const generateChallenge = () => {
    const newChallenge = proverbValidator.generateProverbChallenge()
    setChallenge(newChallenge)
    setSelectedAnswer(null)
    setShowAnswer(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
  }

  const clearFilters = () => {
    setSelectedRegion("")
    setSelectedLanguage("")
    setSelectedCountry("")
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-600 to-yellow-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <BookOpen className="w-8 h-8 mr-3" />
            African Proverb Wisdom Tester
          </CardTitle>
          <p className="text-yellow-100">
            Test and explore verified African proverbs for cultural anchoring in FlameBorn actions
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proverb Validation Section */}
        <Card className="bg-gray-900 border-yellow-600">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Proverb Validation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-proverb" className="text-white">
                Enter African Proverb (original or translated)
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="test-proverb"
                  value={testProverb}
                  onChange={(e) => setTestProverb(e.target.value)}
                  placeholder="Enter proverb to validate..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Button
                  onClick={handleRandomProverb}
                  variant="outline"
                  size="icon"
                  className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white bg-transparent"
                  title="Get random proverb"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="test-action" className="text-white">
                Generative Action (optional - for cultural context validation)
              </Label>
              <Textarea
                id="test-action"
                value={testAction}
                onChange={(e) => setTestAction(e.target.value)}
                placeholder="Describe your generative action for cultural relevance testing..."
                className="bg-gray-800 border-gray-600 text-white mt-1"
                rows={3}
              />
            </div>

            <Button
              onClick={handleProverbValidation}
              disabled={!testProverb.trim() || isLoading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validate Proverb
                </>
              )}
            </Button>

            {/* Validation Results */}
            {validationResult && (
              <Card className={`${validationResult.isValid ? "border-green-500" : "border-red-500"}`}>
                <CardContent className="pt-4">
                  <div className="flex items-center mb-3">
                    {validationResult.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mr-2" />
                    )}
                    <span className={`font-semibold ${validationResult.isValid ? "text-green-400" : "text-red-400"}`}>
                      {validationResult.isValid ? "Valid African Proverb" : "Proverb Not Found"}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm mb-3">{validationResult.message}</p>

                  {validationResult.proverb && (
                    <div className="space-y-2 p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-600">
                          <Languages className="w-3 h-3 mr-1" />
                          {validationResult.proverb.language}
                        </Badge>
                        <Badge variant="secondary" className="bg-green-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {validationResult.proverb.country}
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-600">
                          {validationResult.proverb.region}
                        </Badge>
                      </div>
                      <p className="text-white italic">"{validationResult.proverb.translated_meaning}"</p>
                      {validationResult.proverb.proverb !== validationResult.proverb.translated_meaning && (
                        <p className="text-gray-400 text-sm">Original: "{validationResult.proverb.proverb}"</p>
                      )}
                      <p className="text-gray-400 text-sm">{validationResult.proverb.cultural_notes}</p>
                      {validationResult.proverbHash && (
                        <div className="flex items-center text-xs text-purple-300">
                          <Hash className="w-3 h-3 mr-1" />
                          Hash: {validationResult.proverbHash.substring(0, 16)}...
                        </div>
                      )}
                    </div>
                  )}

                  {validationResult.culturalValidation && (
                    <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Heart className="w-4 h-4 text-orange-400 mr-2" />
                        <span className="text-orange-400 font-semibold">Cultural Relevance Analysis</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-300 mr-2">Relevance Score:</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              validationResult.culturalValidation.culturalRelevance >= 0.7
                                ? "bg-green-500"
                                : validationResult.culturalValidation.culturalRelevance >= 0.4
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{
                              width: `${validationResult.culturalValidation.culturalRelevance * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-300 ml-2">
                          {Math.round(validationResult.culturalValidation.culturalRelevance * 100)}%
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{validationResult.culturalValidation.message}</p>
                    </div>
                  )}

                  {validationResult.suggestedProverb && (
                    <div className="mt-3 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                      <div className="flex items-center mb-2">
                        <Lightbulb className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-blue-400 font-semibold">Suggested Alternative</span>
                      </div>
                      <p className="text-white italic mb-2">"{validationResult.suggestedProverb.translated_meaning}"</p>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="secondary" className="bg-blue-600">
                          {validationResult.suggestedProverb.language}
                        </Badge>
                        <Badge variant="secondary" className="bg-green-600">
                          {validationResult.suggestedProverb.country}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => useProverbFromSearch(validationResult.suggestedProverb!)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Use This Proverb
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Proverb Search & Browse Section */}
        <Card className="bg-gray-900 border-yellow-600">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Browse Wisdom Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label className="text-white">Filter by Region</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="All regions" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {availableFilters.regions.map((region) => (
                      <SelectItem key={region} value={region} className="text-white hover:bg-gray-700">
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white">Filter by Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="All languages" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {availableFilters.languages.map((language) => (
                      <SelectItem key={language} value={language} className="text-white hover:bg-gray-700">
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white">Filter by Country</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="All countries" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {availableFilters.countries.map((country) => (
                      <SelectItem key={country} value={country} className="text-white hover:bg-gray-700">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={clearFilters}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-700 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>

            {/* Search Results */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {searchResults.map((proverb, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-yellow-600 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-blue-600 text-xs">
                          {proverb.language}
                        </Badge>
                        <Badge variant="secondary" className="bg-green-600 text-xs">
                          {proverb.country}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => useProverbFromSearch(proverb)}
                        size="sm"
                        variant="outline"
                        className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white text-xs"
                      >
                        Use
                      </Button>
                    </div>
                    <p className="text-white text-sm italic mb-1">"{proverb.translated_meaning}"</p>
                    {proverb.proverb !== proverb.translated_meaning && (
                      <p className="text-gray-400 text-xs mb-1">Original: "{proverb.proverb}"</p>
                    )}
                    <p className="text-gray-400 text-xs">{proverb.cultural_notes}</p>
                  </CardContent>
                </Card>
              ))}
              {searchResults.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No proverbs found with current filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learn & Earn Challenge Section */}
      <Card className="bg-gray-900 border-yellow-600">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Learn & Earn Challenge
          </CardTitle>
          <p className="text-gray-300 text-sm">Test your knowledge of African wisdom and earn FLB tokens!</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={generateChallenge} className="bg-yellow-600 hover:bg-yellow-700 text-white">
            <Lightbulb className="w-4 h-4 mr-2" />
            Generate New Challenge
          </Button>

          {challenge && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="mb-4">
                  <div className="flex gap-2 mb-3">
                    <Badge variant="secondary" className="bg-blue-600">
                      {challenge.proverb.language}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-600">
                      {challenge.proverb.country}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-600">
                      {challenge.proverb.region}
                    </Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{challenge.question}</h3>
                </div>

                <div className="space-y-2">
                  {challenge.options.map((option: string, index: number) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showAnswer}
                      variant="outline"
                      className={`w-full text-left justify-start p-3 h-auto ${
                        showAnswer
                          ? index === challenge.correctAnswer
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : selectedAnswer === index
                              ? "border-red-500 bg-red-500/20 text-red-400"
                              : "border-gray-600 text-gray-400"
                          : "border-gray-600 text-white hover:border-yellow-600"
                      }`}
                    >
                      <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {showAnswer && index === challenge.correctAnswer && (
                        <CheckCircle className="w-4 h-4 ml-auto text-green-400" />
                      )}
                      {showAnswer && selectedAnswer === index && index !== challenge.correctAnswer && (
                        <XCircle className="w-4 h-4 ml-auto text-red-400" />
                      )}
                    </Button>
                  ))}
                </div>

                {showAnswer && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      {selectedAnswer === challenge.correctAnswer ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                      )}
                      <span className="text-white font-semibold">
                        {selectedAnswer === challenge.correctAnswer ? "Correct! 🎉" : "Not quite right"}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      <strong>Cultural Context:</strong> {challenge.proverb.cultural_notes}
                    </p>
                    {selectedAnswer === challenge.correctAnswer && (
                      <div className="flex items-center text-yellow-400 text-sm">
                        <Zap className="w-4 h-4 mr-1" />
                        You earned 10 FLB tokens for correct answer!
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Database Stats */}
      <Card className="bg-gray-900 border-yellow-600">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Wisdom Database Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{availableFilters.countries.length}</div>
              <div className="text-sm text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{availableFilters.regions.length}</div>
              <div className="text-sm text-gray-400">Regions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{availableFilters.languages.length}</div>
              <div className="text-sm text-gray-400">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-sm text-gray-400">Proverbs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProverbTester
