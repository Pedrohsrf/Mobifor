import { useCallback, useEffect, useRef, useState } from "react"

export function useParkingMapControls() {
  const [transform, setTransform] = useState({ x: 20, y: 10, scale: 1 })

  const isPanning = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return

    isPanning.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.style.cursor = "grabbing"
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!isPanning.current) return

    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y

    lastPos.current = { x: e.clientX, y: e.clientY }

    setTransform((t) => ({
      ...t,
      x: t.x + dx,
      y: t.y + dy,
    }))
  }, [])

  const onMouseUp = useCallback((e) => {
    isPanning.current = false
    e.currentTarget.style.cursor = "grab"
  }, [])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    const normalizedDelta = Math.max(-1, Math.min(1, e.deltaY / 500))
    const zoomFactor = 1 - normalizedDelta * 0.08

    setTransform((t) => {
      const newScale = Math.min(Math.max(t.scale * zoomFactor, 0.8), 2.1)
      const ratio = newScale / t.scale

      return {
        scale: newScale,
        x: mx - ratio * (mx - t.x),
        y: my - ratio * (my - t.y),
      }
    })
  }, [])

  useEffect(() => {
    const mapElement = containerRef.current

    if (!mapElement) return

    mapElement.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      mapElement.removeEventListener("wheel", onWheel)
    }
  }, [onWheel])

  const zoomIn = () => {
    setTransform((t) => ({
      ...t,
      scale: Math.min(t.scale * 1.05, 2.1),
    }))
  }

  const zoomOut = () => {
    setTransform((t) => ({
      ...t,
      scale: Math.max(t.scale * 0.95, 0.8),
    }))
  }

  return {
    transform,
    containerRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    zoomIn,
    zoomOut,
  }
}