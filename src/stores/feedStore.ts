import { create } from 'zustand'
import { Post, FeedFilters } from '@/types'

interface FeedState {
  posts: Post[]
  loading: boolean
  error: string | null
  filters: FeedFilters
  hasMore: boolean
  setFilters: (filters: FeedFilters) => void
  refreshFeed: () => void
  loadMore: () => void
  filterPostsByPersona: (personaId: string) => Post[]
  initializeFeed: (posts: Post[]) => void
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  filters: {},
  hasMore: true,

  setFilters: (filters) => set({ filters }),

  refreshFeed: () => {
    const { posts } = get()
    set({ loading: true, error: null })
    // Simulate API call
    setTimeout(() => {
      set({ loading: false, posts })
    }, 1000)
  },

  loadMore: () => {
    const { posts, loading } = get()
    if (loading) return

    set({ loading: true })
    // Simulate loading more posts
    setTimeout(() => {
      const basePosts = posts.length > 0 ? posts : []
      const newPosts = basePosts.map((post: Post) => ({
        ...post,
        id: `${post.id}-${Date.now()}`,
        created_at: new Date().toISOString()
      }))
      set({
        loading: false,
        posts: [...posts, ...newPosts],
        hasMore: posts.length < 50 // Limit for demo
      })
    }, 1000)
  },

  filterPostsByPersona: (personaId: string) => {
    const { posts } = get()
    return posts
      .filter(post => {
        const score = post.persona_scores?.[personaId] || 0
        return score >= 0.3
      })
      .sort((a, b) => {
        const scoreA = a.persona_scores?.[personaId] || 0
        const scoreB = b.persona_scores?.[personaId] || 0
        return scoreB - scoreA
      })
  },

  initializeFeed: (posts) => {
    set({
      posts,
      loading: false,
      error: null,
      hasMore: true
    })
  }
}))
