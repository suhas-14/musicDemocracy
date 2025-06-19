"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, ChevronDown, Play, Users, Clock, Share, Check, Music } from "lucide-react"

interface Song {
  id: string
  title: string
  channel: string
  duration: string
  thumbnail: string
  votes: number
  addedBy: string
  youtubeId: string
}

export default function musicVoting() {
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "current",
    title: "Bohemian Rhapsody",
    channel: "Queen Official",
    duration: "5:55",
    thumbnail: "/placeholder.svg?height=180&width=320",
    votes: 0,
    addedBy: "StreamHost",
    youtubeId: "fJ9rUzIMcZQ",
  })

  const [queue, setQueue] = useState<Song[]>([
    {
      id: "2",
      title: "Sweet Child O' Mine",
      channel: "Guns N' Roses",
      duration: "5:03",
      thumbnail: "/placeholder.svg?height=90&width=160",
      votes: 12,
      addedBy: "RockFan88",
      youtubeId: "1w7OgIMMRc4",
    },
    {
      id: "3",
      title: "Hotel California",
      channel: "Eagles",
      duration: "6:30",
      thumbnail: "/placeholder.svg?height=90&width=160",
      votes: 8,
      addedBy: "ClassicRock",
      youtubeId: "09839DpTctU",
    },
    {
      id: "4",
      title: "Stairway to Heaven",
      channel: "Led Zeppelin",
      duration: "8:02",
      thumbnail: "/placeholder.svg?height=90&width=160",
      votes: 6,
      addedBy: "ZeppelinFan",
      youtubeId: "QkF3oxziUI4",
    },
  ])

  const [newSongUrl, setNewSongUrl] = useState("")
  const [previewSong, setPreviewSong] = useState<Song | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isShared, setIsShared] = useState(false)

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Mock function to get video details (in real app, you'd use YouTube API)
  const getVideoDetails = async (videoId: string): Promise<Song | null> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock video details with realistic data
    const mockTitles = [
      "Amazing Song Title",
      "Epic Music Video",
      "Best Song Ever",
      "Incredible Performance",
      "Must Listen Track",
    ]

    const mockChannels = ["Music Channel", "Artist Official", "Record Label", "Music Videos", "Top Hits"]

    const mockSong: Song = {
      id: Date.now().toString(),
      title: mockTitles[Math.floor(Math.random() * mockTitles.length)],
      channel: mockChannels[Math.floor(Math.random() * mockChannels.length)],
      duration: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      votes: 0,
      addedBy: "You",
      youtubeId: videoId,
    }

    setIsLoading(false)
    return mockSong
  }

  // Handle URL input change and preview
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (newSongUrl) {
        const videoId = extractYouTubeId(newSongUrl)
        if (videoId) {
          const songDetails = await getVideoDetails(videoId)
          setPreviewSong(songDetails)
        } else {
          setPreviewSong(null)
        }
      } else {
        setPreviewSong(null)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [newSongUrl])

  // Add song to queue
  const addToQueue = () => {
    if (previewSong) {
      setQueue((prev) => [...prev, previewSong])
      setNewSongUrl("")
      setPreviewSong(null)
    }
  }

  // Vote on songs
  const vote = (songId: string, direction: "up" | "down") => {
    setQueue((prev) =>
      prev
        .map((song) => (song.id === songId ? { ...song, votes: song.votes + (direction === "up" ? 1 : -1) } : song))
        .sort((a, b) => b.votes - a.votes),
    )
  }

  // Play next song
  const playNext = () => {
    if (queue.length > 0) {
      const nextSong = queue[0]
      setCurrentSong(nextSong)
      setQueue((prev) => prev.slice(1))
    }
  }

  // Share page with fans
  const shareWithFans = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsShared(true)
      setTimeout(() => setIsShared(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setIsShared(true)
      setTimeout(() => setIsShared(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center text-gray-900 dark:text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">🎵 Live Music Voting</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Vote for the next song in the queue!</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>247 viewers</span>
            </div>
            <div className="flex items-center gap-1">
              <Play className="w-4 h-4" />
              <span>Live</span>
            </div>
            <Button
              onClick={shareWithFans}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              size="sm"
            >
              {isShared ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Share className="w-4 h-4" />
                  Share with Fans
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Add New Song - Top Section */}
        <Card className="bg-white/80 dark:bg-black/20 border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white text-xl">🎵 Add a Song</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Paste YouTube URL here (e.g., https://youtu.be/dQw4w9WgXcQ)"
                value={newSongUrl}
                onChange={(e) => setNewSongUrl(e.target.value)}
                className="bg-white dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-lg py-3"
              />
              <Button
                onClick={addToQueue}
                disabled={!previewSong || isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg"
              >
                Add to Queue
              </Button>
            </div>

            {isLoading && (
              <div className="text-gray-900 dark:text-white text-center py-4">
                <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                Loading preview...
              </div>
            )}

            {previewSong && !isLoading && (
              <div className="bg-gray-100 dark:bg-white/5 rounded-lg p-4 border border-gray-200 dark:border-white/10">
                <div className="flex gap-4">
                  <img
                    src={previewSong.thumbnail || "/placeholder.svg"}
                    alt={previewSong.title}
                    className="w-24 h-16 rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=64&width=96"
                    }}
                  />
                  <div className="flex-1 text-gray-900 dark:text-white">
                    <h4 className="font-semibold text-lg">{previewSong.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{previewSong.channel}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{previewSong.duration}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Playing Video */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-black/20 border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2 w-fit">
                  <Play className="w-5 h-5 text-green-400" />
                  Now Playing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1`}
                    title={currentSong.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="text-gray-900 dark:text-white">
                  <h3 className="text-xl font-semibold mb-1">{currentSong.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{currentSong.channel}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {currentSong.duration}
                      </span>
                      <span>Added by {currentSong.addedBy}</span>
                    </div>
                    <Button
                      onClick={playNext}
                      disabled={queue.length === 0}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Play Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Queue */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-black/20 border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center justify-between">
                  <span>Queue ({queue.length})</span>
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    Live Voting
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {queue.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <p>No songs in queue</p>
                    <p className="text-sm">Add a song to get started!</p>
                  </div>
                ) : (
                  queue.map((song, index) => (
                    <div
                      key={song.id}
                      className="bg-gray-50 dark:bg-white/5 rounded-lg p-3 border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                      <div className="flex gap-3">
                        <div className="relative">
                          <img
                            src={song.thumbnail || "/placeholder.svg"}
                            alt={song.title}
                            className="w-16 h-10 rounded object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=40&width=64"
                            }}
                          />
                          <div className="absolute -top-1 -left-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 dark:text-white font-medium text-sm truncate">{song.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-xs truncate">{song.channel}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{song.duration}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">by {song.addedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => vote(song.id, "up")}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-400/10"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <span className="text-gray-900 dark:text-white font-medium min-w-[2rem] text-center">
                            {song.votes}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => vote(song.id, "down")}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-400/10"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-300"
                        >
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
