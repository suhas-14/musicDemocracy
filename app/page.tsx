import { AppBar } from "./components/Appbar";
import { Redirect } from "./components/Redirect";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, Users, Radio, Headphones, ChevronRight, Play, Vote } from "lucide-react"


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppBar />
      <Redirect />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Let Your Fans Choose the Music That Plays on Your Stream
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    MusicDemocracy gives your audience the power to vote on what plays next. Create deeper connections
                    and boost engagement with fan-powered playlists.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#get-started">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Start Streaming
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline">See How It Works</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[400px] aspect-video overflow-hidden rounded-xl border shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm">
                    <div className="absolute top-4 left-4 right-4 h-8 bg-gray-800/80 rounded-md flex items-center px-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                      <div className="text-xs text-white/80 ml-2">DJ Sarah's Stream</div>
                    </div>
                    <div className="absolute top-16 left-4 right-4 bottom-4 bg-gray-900/70 rounded-md p-3 flex flex-col">
                      <div className="text-white text-sm mb-2">Now Playing:</div>
                      <div className="flex items-center bg-purple-600/30 p-2 rounded-md mb-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center mr-2">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-white text-xs">Summer Vibes</div>
                          <div className="text-white/70 text-xs">Electronic Beats</div>
                        </div>
                      </div>
                      <div className="text-white text-sm mb-2">Vote for Next:</div>
                      <div className="space-y-2 flex-1 overflow-hidden">
                        {[
                          { title: "Midnight Dreams", artist: "Luna Waves", votes: 18 },
                          { title: "Neon City", artist: "Cyber Pulse", votes: 12 },
                        ].map((track, i) => (
                          <div key={i} className="flex items-center bg-gray-800/50 p-2 rounded-md">
                            <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-2">
                              <Vote className="h-4 w-4 text-gray-300" />
                            </div>
                            <div>
                              <div className="text-white text-xs">{track.title}</div>
                              <div className="text-white/70 text-xs">{track.artist}</div>
                            </div>
                            <div className="ml-auto">
                              <span className="text-white text-xs">{track.votes} votes</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Why Creators Love Us</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  MusicDemocracy gives you everything you need to create interactive music experiences
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 md:grid-cols-3">
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 mx-auto dark:bg-purple-900">
                  <Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Audience Engagement</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Boost viewer retention by giving fans a say in what plays next
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 mx-auto dark:bg-purple-900">
                  <Radio className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Real-time Voting</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Fans vote in real-time for the next track with automatic queuing
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 mx-auto dark:bg-purple-900">
                  <Headphones className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Massive Music Library</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access millions of tracks with no licensing headaches
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Simple for Creators, Fun for Fans</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Set up interactive music streams in minutes
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl items-start gap-6 py-8 md:grid-cols-3">
              <div className="grid gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white mx-auto">
                  1
                </div>
                <h3 className="text-lg font-bold">Create Your Stream</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sign up and connect your streaming platform</p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white mx-auto">
                  2
                </div>
                <h3 className="text-lg font-bold">Share With Fans</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Invite fans to join your music democracy</p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white mx-auto">
                  3
                </div>
                <h3 className="text-lg font-bold">Let Fans Vote</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Fans vote for songs while you focus on creating
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="get-started" className="w-full py-12 md:py-24 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Ready to Transform Your Streams?</h2>
                <p className="max-w-[600px] text-purple-100 md:text-xl/relaxed">
                  Join creators who are building deeper connections with their audience through music
                </p>
              </div>
              <div className="w-full max-w-sm">
                <Link href="#" className="w-full">
                  <Button className="w-full bg-white text-purple-600 hover:bg-white/90">Get Started Free</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-purple-600" />
          <span className="font-semibold">MusicDemocracy</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} MusicDemocracy. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}