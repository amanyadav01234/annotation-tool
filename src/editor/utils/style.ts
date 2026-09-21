import type { ShapeType } from '@common/types/Shapes'
import { arrowIcon, brushIcon, circleIcon, curveIcon, groupIcon, pictureIcon, polygonIcon, squareIcon, starIcon, textIcon } from '@editor/constants/icons'

export const getShapePicture = (shape: ShapeType): string => {
  switch (shape) {
    case 'brush':
      return brushIcon
    case 'line':
      return arrowIcon
    case 'polygon':
      return polygonIcon
    case 'curve':
      return curveIcon
    case 'rect':
      return squareIcon // temporary
    case 'square':
      return squareIcon
    case 'circle':
      return circleIcon
    case 'ellipse':
      return circleIcon // temporary
    case 'text':
      return textIcon
    case 'picture':
      return pictureIcon
    case 'group':
      return groupIcon
    case 'star':
      return starIcon
    case 'triangle':
      return ''
    default:
      return ''
  }
}
