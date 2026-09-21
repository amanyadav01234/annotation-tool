import type { UtilsSettings } from '@canvas/constants/app'
import { drawPathWithFillAndStroke } from '@canvas/utils/canvas'
import { createRecSelectionPath, resizeRectSelection } from '@canvas/utils/selection/rectSelection'
import type { SelectionModeResize } from '@common/types/Mode'
import type { DrawableShape, Point, Rect, SelectionType, ShapeEntity } from '@common/types/Shapes'
import type { ToolsSettingsType } from '@common/types/tools'
import { uniqueId } from '@common/utils/util'
import { type GroupResizeContext, getPositionWithoutGroupRotation, getShapePositionInNewBorder } from './group'
import { expandRect, getComputedShapeInfos } from './path'

export const createStarPath = (shape: Rect & { pointsCount?: number; innerRatio?: number }): Path2D => {
  const path = new Path2D()
  const pointsCount = shape.pointsCount ?? 5
  const innerRatio = shape.innerRatio ?? 0.4
  const cx = shape.x + shape.width / 2
  const cy = shape.y + shape.height / 2
  const rx = shape.width / 2
  const ry = shape.height / 2
  const totalPoints = pointsCount * 2

  for (let i = 0; i < totalPoints; i++) {
    const angle = (i * Math.PI) / pointsCount - Math.PI / 2
    const currentRadiusX = i % 2 === 0 ? rx : rx * innerRatio
    const currentRadiusY = i % 2 === 0 ? ry : ry * innerRatio
    const px = cx + currentRadiusX * Math.cos(angle)
    const py = cy + currentRadiusY * Math.sin(angle)
    if (i === 0) {
      path.moveTo(px, py)
    } else {
      path.lineTo(px, py)
    }
  }
  path.closePath()
  return path
}

const buildStarPath = (star: DrawableShape<'star'> & { id: string }, settings: UtilsSettings): ShapeEntity<'star'> => {
  const path = createStarPath(star)
  const computed = getComputedShapeInfos(star, getStarBorder, settings)
  return {
    ...star,
    path,
    computed,
    selection: createRecSelectionPath(path, computed, settings)
  } as unknown as ShapeEntity<'star'>
}

export const refreshStar = buildStarPath

export const createStar = (
  shape: {
    id: string
    type: 'star'
    settings: ToolsSettingsType<'star'>
  },
  cursorPosition: Point,
  settings: UtilsSettings,
  width = 0,
  height = 0
): ShapeEntity<'star'> => {
  const starShape = {
    toolId: shape.id,
    type: 'star',
    id: uniqueId('star_'),
    x: cursorPosition[0],
    y: cursorPosition[1],
    width,
    height,
    pointsCount: 5,
    innerRatio: 0.4,
    style: {
      opacity: shape.settings.opacity.default,
      fillColor: shape.settings.fillColor.default,
      strokeColor: shape.settings.strokeColor.default,
      lineWidth: shape.settings.lineWidth.default,
      lineDash: shape.settings.lineDash.default
    }
  } as DrawableShape<'star'> & { id: string }
  return buildStarPath(starShape, settings)
}

export const drawStar = (ctx: CanvasRenderingContext2D, shape: ShapeEntity<'star'>): void => {
  drawPathWithFillAndStroke(ctx, shape.path, shape.style)
}

export const getStarBorder = (rect: Rect, settings: Pick<UtilsSettings, 'selectionPadding'>): Rect => {
  return expandRect(rect, settings?.selectionPadding ?? 0)
}

export const resizeStar = (
  cursorPosition: Point,
  originalShape: ShapeEntity<'star'>,
  selectionMode: SelectionModeResize,
  settings: UtilsSettings,
  keepRatio = true,
  resizeFromCenter = false
): ShapeEntity<'star'> => {
  const { borderX, borderHeight, borderY, borderWidth } = resizeRectSelection(
    cursorPosition,
    originalShape,
    selectionMode,
    settings,
    keepRatio,
    resizeFromCenter
  )
  return buildStarPath(
    {
      ...originalShape,
      width: Math.max(0, borderWidth - 2 * settings.selectionPadding),
      height: Math.max(0, borderHeight - 2 * settings.selectionPadding),
      x: borderX + settings.selectionPadding,
      y: borderY + settings.selectionPadding
    },
    settings
  )
}

export const resizeStarInGroup = (
  shape: ShapeEntity<'star'>,
  group: SelectionType & { type: 'group' },
  groupCtx: GroupResizeContext
): ShapeEntity<'star'> => {
  const { isXinverted, isYinverted, settings, widthMultiplier, heightMultiplier } = groupCtx
  const shouldFlipRotation =
    (isXinverted || isYinverted) && !(isXinverted && isYinverted) && (shape.rotation ?? 0) !== 0 && groupCtx.rotation !== shape.rotation
  const pos = getShapePositionInNewBorder(shape, group, groupCtx)
  const newWidth = (shape.width || 1) * widthMultiplier
  const newHeight = (shape.height || 1) * heightMultiplier
  const newCenter = getPositionWithoutGroupRotation(groupCtx, pos.x, pos.y, newWidth, newHeight)
  return buildStarPath(
    {
      ...shape,
      width: newWidth,
      height: newHeight,
      x: newCenter[0] - newWidth / 2,
      y: newCenter[1] - newHeight / 2,
      rotation: shouldFlipRotation ? -(shape.rotation ?? 0) : (shape.rotation ?? 0)
    },
    settings
  )
}
