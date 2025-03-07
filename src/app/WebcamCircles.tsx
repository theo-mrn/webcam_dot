"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import Webcam from "react-webcam"

const WebcamCircles: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [dotsCount, setDotsCount] = useState(50) // Nombre de points sur la largeur

  const processImageData = (imageData: ImageData, ctx: CanvasRenderingContext2D) => {
    const { width, height, data } = imageData
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, height)

    // Calculer l'espacement en fonction de la largeur et du nombre de points souhaité
    const spacing = Math.floor(width / dotsCount)
    // La taille du cercle est proportionnelle à l'espacement
    const circleSize = spacing * 0.8

    for (let y = spacing/2; y < height; y += spacing) {
      for (let x = spacing/2; x < width; x += spacing) {
        // Calculer la moyenne des pixels dans la zone du point
        let avgBrightness = 0
        let count = 0
        
        // Échantillonner la zone autour du point
        for (let sy = -spacing/4; sy < spacing/4; sy++) {
          for (let sx = -spacing/4; sx < spacing/4; sx++) {
            const sampleX = Math.floor(x + sx)
            const sampleY = Math.floor(y + sy)
            if (sampleX >= 0 && sampleX < width && sampleY >= 0 && sampleY < height) {
              const i = (sampleY * width + sampleX) * 4
              const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
              avgBrightness += brightness
              count++
            }
          }
        }
        
        avgBrightness = avgBrightness / count
        const radius = (avgBrightness / 255) * (circleSize / 2)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
      }
    }
  }

  const captureAndProcess = useCallback(() => {
    const webcam = webcamRef.current
    const canvas = canvasRef.current

    if (webcam && canvas) {
      const video = webcam.video
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        const { videoWidth, videoHeight } = video
        canvas.width = videoWidth
        canvas.height = videoHeight

        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
          const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight)
          processImageData(imageData, ctx)
        }
      }
    }
  }, [dotsCount])

  useEffect(() => {
    let animationFrameId: number

    const processFrame = () => {
      captureAndProcess()
      animationFrameId = requestAnimationFrame(processFrame)
    }

    if (isVideoReady) {
      processFrame()
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isVideoReady, captureAndProcess])

  const handleVideoReady = () => {
    setIsVideoReady(true)
  }

  return (
    <div className="relative w-screen h-screen">
      <Webcam
        ref={webcamRef}
        audio={false}
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedMetadata={handleVideoReady}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 p-4 rounded-lg">
        <label className="text-white mr-2">Nombre de points:</label>
        <input
          type="range"
          min="10"
          max="200"
          value={dotsCount}
          onChange={(e) => setDotsCount(Number(e.target.value))}
          className="w-48"
        />
        <span className="text-white ml-2">{dotsCount}</span>
      </div>
    </div>
  )
}

export default WebcamCircles