'use client'

import { Post } from '@/types'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Send } from 'lucide-react'
import { useState } from 'react'

interface PostCardProps {
  post: Post
  personaRelevance?: number
}

// Persona colors for relevance badge
const personaColors: Record<string, string> = {
  'data-viz': '#3B82F6',
  'business-strategy': '#10B981',
  'creative-design': '#8B5CF6',
  'tech-innovation': '#F59E0B',
}

function AvatarFallback({ name, size = 48 }: { name: string; size?: number }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '??'
  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899']
  const color = colors[name?.charCodeAt(0) % colors.length] || '#3B82F6'
  return (
    <div
      style={{ width: size, height: size, backgroundColor: color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
    >
      <span style={{ color: 'white', fontWeight: 700, fontSize: size * 0.35 }}>{initials}</span>
    </div>
  )
}

export function PostCard({ post, personaRelevance }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.engagement?.likes ?? post.likes ?? 0)
  const [imgError, setImgError] = useState(false)

  const author = post.author
  const authorName = author?.name ?? 'Unknown'
  const authorHeadline = author?.headline ?? ''
  const authorImage = author?.profileImage ?? ''
  const authorLocation = author?.location ?? ''

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const formatNumber = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n.toString()
  }

  const relevanceColor = (() => {
    // Find which persona score this belongs to (highest score)
    if (!post.persona_scores) return '#10B981'
    const topPersona = Object.entries(post.persona_scores).sort((a, b) => b[1] - a[1])[0]?.[0]
    return personaColors[topPersona] || '#10B981'
  })()

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-start space-x-3 p-4 pb-3">
        <div className="relative flex-shrink-0">
          {authorImage && !imgError ? (
            <img
              src={authorImage}
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <AvatarFallback name={authorName} size={48} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground leading-tight text-sm">{authorName}</h3>
              <p className="text-xs text-muted-foreground leading-tight mt-0.5 line-clamp-1">{authorHeadline}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {authorLocation && (
                  <span className="text-xs text-muted-foreground">{authorLocation}</span>
                )}
                <span className="text-xs text-muted-foreground">• {post.timestamp}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 flex-shrink-0">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          {/* Relevance Badge */}
          {personaRelevance !== undefined && personaRelevance > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: relevanceColor }} />
              <span className="text-xs font-medium" style={{ color: relevanceColor }}>
                {Math.round(personaRelevance)}% match
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* AI Tags */}
      {post.ai_tags && post.ai_tags.length > 0 && (
        <div className="flex flex-wrap gap-1 px-4 pb-3">
          {post.ai_tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-border/50 text-xs text-muted-foreground">
        <span>{formatNumber(likeCount)} reactions</span>
        <div className="flex gap-2">
          <span>{formatNumber(post.engagement?.comments ?? post.comments ?? 0)} comments</span>
          <span>·</span>
          <span>{formatNumber(post.engagement?.shares ?? post.shares ?? 0)} reposts</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-around px-2 py-1 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex-1 gap-1.5 text-xs font-medium ${isLiked ? 'text-blue-600' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          Like
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
          <MessageCircle className="h-4 w-4" />
          Comment
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
          <Share2 className="h-4 w-4" />
          Repost
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
          <Send className="h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  )
}
