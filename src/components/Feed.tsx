'use client'

import { useState, useEffect } from 'react'
import { useFeedStore } from '@/stores/feedStore'
import { usePersonaStore } from '@/stores/personaStore'
import { PostCard } from './PostCard'
import { Button } from './ui/button'
import { RefreshCw, TrendingUp, Filter } from 'lucide-react'

export function Feed() {
  const { posts, loading, filterPostsByPersona, loadMore } = useFeedStore()
  const { currentPersona } = usePersonaStore()
  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    if (currentPersona) {
      const filtered = filterPostsByPersona(currentPersona.id)
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    }
  }, [currentPersona, posts, filterPostsByPersona])

  return (
    <div className="flex-1 overflow-y-auto font-sans">
      {/* Feed Header */}
      <div className="sticky top-0 bg-card border border-border rounded-xl p-4 mb-4 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-foreground">
              {currentPersona ? `${currentPersona.name} Feed` : 'Professional Feed'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {filteredPosts.length > 0
                ? `${filteredPosts.length} posts matched to your context`
                : currentPersona
                  ? `Content optimized for ${currentPersona.name.toLowerCase()}`
                  : 'All professional content'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <Filter className="h-3 w-3" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <TrendingUp className="h-3 w-3" />
              Top
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                if (currentPersona) {
                  const filtered = filterPostsByPersona(currentPersona.id)
                  setFilteredPosts([...filtered].sort(() => Math.random() - 0.5))
                }
              }}
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <TrendingUp className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-sm font-medium text-foreground mb-1">No posts found</h3>
            <p className="text-xs text-muted-foreground">
              {currentPersona
                ? `No posts matched for ${currentPersona.name}. Try a different persona.`
                : 'Select a persona to see relevant content.'}
            </p>
          </div>
        )}

        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            personaRelevance={
              currentPersona ? post.persona_scores[currentPersona.id] * 100 : undefined
            }
          />
        ))}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
          </div>
        )}

        {!loading && filteredPosts.length > 0 && (
          <div className="flex justify-center py-4">
            <Button onClick={loadMore} variant="outline" size="sm" className="text-xs">
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
