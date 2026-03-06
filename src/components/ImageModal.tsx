'use client'

import { useState } from 'react'

interface ImageModalProps {
    src: string
    alt: string
    className?: string
}

export function ImageModal({ src, alt, className }: ImageModalProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={`cursor-pointer transition-opacity hover:opacity-90 ${className || ''}`}
                onClick={() => setIsOpen(true)}
            />

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <button
                            className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close image modal"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl scale-100 animate-in zoom-in-95 duration-200"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
