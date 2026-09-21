import { DEFAULT_UTILS_SETTINGS } from '@canvas/constants/app'
import { createStar, createStarPath, getStarBorder } from '@canvas/utils/shapes/star'
import { describe, expect, it } from 'vitest'

if (typeof globalThis.Path2D === 'undefined') {
  globalThis.Path2D = class Path2D {
    moveTo() {}
    lineTo() {}
    closePath() {}
    rect() {}
    arc() {}
  } as unknown as typeof Path2D
}

describe('Star Shape Utilities', () => {
  it('should create a valid Path2D for star shape', () => {
    const starPath = createStarPath({ x: 100, y: 100, width: 200, height: 200, pointsCount: 5, innerRatio: 0.4 })
    expect(starPath).toBeInstanceOf(Path2D)
  })

  it('should create a star shape entity with default properties', () => {
    const mockSettings = {
      ...DEFAULT_UTILS_SETTINGS,
      canvasSize: { realWidth: 1000, realHeight: 600, width: 1000, height: 600, scaleRatio: 1, scaleRatioWithNoZoom: 1 },
      canvasOffset: [0, 0] as [number, number],
      canvasZoom: 1,
      selectionPadding: 0
    }
    const starEntity = createStar(
      {
        id: 'star-tool',
        type: 'star',
        settings: {
          strokeColor: { values: ['black'], default: 'black' },
          fillColor: { values: ['transparent'], default: 'transparent' },
          opacity: { min: 0, max: 100, step: 1, default: 100 },
          lineWidth: { min: 1, max: 20, step: 1, default: 2 },
          lineDash: { values: [0], default: 0 }
        }
      },
      [50, 50],
      mockSettings,
      100,
      100
    )

    expect(starEntity.type).toBe('star')
    expect(starEntity.x).toBe(50)
    expect(starEntity.y).toBe(50)
    expect(starEntity.width).toBe(100)
    expect(starEntity.height).toBe(100)
    expect(starEntity.pointsCount).toBe(5)
    expect(starEntity.innerRatio).toBe(0.4)
  })

  it('should calculate star border correctly', () => {
    const border = getStarBorder({ x: 10, y: 10, width: 50, height: 50 }, { selectionPadding: 5 })
    expect(border).toEqual({
      x: 5,
      y: 5,
      width: 60,
      height: 60
    })
  })
})
