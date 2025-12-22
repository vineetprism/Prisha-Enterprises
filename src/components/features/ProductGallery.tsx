"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
    images: string[]
    title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = React.useState(0)

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-slate-100">
                {/* Placeholder for Main Image */}
                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                    <span className="text-sm">Main Image: {images[selectedImage]}</span>
                </div>
                {/* 
        <Image
          src={images[selectedImage]}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        */}
            </div>
            <div className="flex gap-4 overflow-auto pb-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={cn(
                            "relative aspect-square w-20 flex-none overflow-hidden rounded-md border bg-slate-100",
                            selectedImage === index ? "ring-2 ring-brand-500" : "ring-1 ring-transparent hover:ring-brand-200"
                        )}
                        onClick={() => setSelectedImage(index)}
                    >
                        {/* Placeholder for Thumbnail */}
                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50 text-[10px]">
                            Thumb {index + 1}
                        </div>
                        {/* 
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
            */}
                    </button>
                ))}
            </div>
        </div>
    )
}
