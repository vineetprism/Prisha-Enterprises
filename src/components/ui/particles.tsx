"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
}

export const Particles = ({
    className,
    quantity = 50,
    staticity = 50,
    ease = 50,
}: {
    className?: string
    quantity?: number
    staticity?: number
    ease?: number
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const particles: Particle[] = []

        const updateDimensions = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            setDimensions({ width: canvas.width, height: canvas.height })
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)

        // Initialize particles
        for (let i = 0; i < quantity; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
            })
        }

        function animate() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                particle.x += particle.speedX
                particle.y += particle.speedY

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width
                if (particle.x > canvas.width) particle.x = 0
                if (particle.y < 0) particle.y = canvas.height
                if (particle.y > canvas.height) particle.y = 0

                ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fill()
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, [quantity])

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none absolute inset-0 ${className}`}
        />
    )
}
