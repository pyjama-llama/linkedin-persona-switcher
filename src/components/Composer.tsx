'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Image, Video, Calendar, BarChart3, MoreHorizontal } from 'lucide-react'
import { ImageModal } from './ImageModal'

export function Composer() {
  const [content, setContent] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = () => {
    if (content.trim()) {
      console.log('Posting:', content)
      setContent('')
      setIsExpanded(false)
    }
  }

  return (
    <div className="bg-card border rounded-lg p-4 mb-4">
      <div className="flex space-x-3">
        <ImageModal
          src="/default-avatar.png"
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Share your professional insights..."
            className="w-full resize-none border-0 focus:ring-0 text-foreground placeholder-muted-foreground text-sm leading-relaxed"
            rows={isExpanded ? 4 : 1}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {/* Media and formatting options */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Image className="h-4 w-4 mr-2" />
              Photo
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Event
            </Button>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Poll
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              AI will automatically categorize your content for the right professional audience
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setContent('')
                  setIsExpanded(false)
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim()}
                size="sm"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
