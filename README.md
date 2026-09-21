# React Paint - Aman Yadav Edition

[![npm version](https://img.shields.io/npm/v/@aman-yadav/react-paint)](https://www.npmjs.com/package/@aman-yadav/react-paint)
[![Developer: Aman Yadav](https://img.shields.io/badge/Developer-Aman%20Yadav-blue.svg)](https://github.com/aman-yadav)

An advanced canvas-based React library developed by **Aman Yadav** for high-performance image annotation, interactive diagramming, and digital whiteboard applications.

## Features

- **Rich Drawing Tools** - Brush, shapes (rectangles, circles, ellipses, triangles, stars, polygons, curves), lines, text, and picture support
- **Interactive Canvas** - Full support for zoom, pan, pinch gestures, and infinite or fixed-size canvases with optional watermark
- **Shape Manipulation** - Select, move, resize, rotate, group/ungroup, and transform shapes with intuitive controls
- **Customizable Styling** - Control colors, line widths, opacity, line styles, arrows, fonts, and dark mode themes
- **Layer & History Management** - Built-in layer manipulation panel and programmatic Undo/Redo history control
- **Export & Import** - Export canvas to high-res PNG/JPEG or save/load work as state JSON data
- **Event System** - Listen to data changes and integrate seamlessly with application state
- **TypeScript First** - Fully typed with comprehensive interfaces for best developer experience

## Quick Start

### Installation

```bash
npm install @aman-yadav/react-paint
```

**Note:** React Paint requires `react` and `react-dom` (version 18.x) as peer dependencies.

### Import Styles

Import the CSS file in your application root:

```tsx
import '@aman-yadav/react-paint/react-paint.css'
```

## Usage

### Basic Usage

```tsx
import { Canvas, Editor, useReactPaint } from '@aman-yadav/react-paint'
import '@aman-yadav/react-paint/react-paint.css'

function MyPaintApp() {
  const { editorProps, canvasProps, undo, redo, canUndo, canRedo } = useReactPaint()

  return (
    <div>
      <Editor editorProps={editorProps}>
        <Canvas canvasProps={canvasProps} />
      </Editor>
    </div>
  )
}
```

### Advanced Usage with Custom Star Shape & Event System

```tsx
import { useEffect, useState } from 'react'
import { Canvas, Editor, useReactPaint, type DrawableShape, type StateData } from '@aman-yadav/react-paint'
import '@aman-yadav/react-paint/react-paint.css'

const SHAPES_INIT: DrawableShape[] = [
  {
    type: 'star',
    x: 300,
    y: 300,
    width: 150,
    height: 150,
    rotation: 0,
    style: {
      fillColor: '#FFD700',
      strokeColor: '#DAA520',
      opacity: 100,
      lineWidth: 2,
      lineDash: 0
    }
  }
]

function AdvancedPaintApp() {
  const [shapes, setShapes] = useState<DrawableShape[] | undefined>(SHAPES_INIT)

  const { editorProps, canvasProps, registerEvent, unregisterEvent } = useReactPaint({
    width: 1920,
    height: 1080,
    shapes,
    options: {
      canGrow: true,
      canShrink: true,
      brushAlgo: 'quadratic'
    }
  })

  useEffect(() => {
    const onDataChanged = (data: StateData) => {
      setShapes(data.shapes)
    }
    registerEvent('dataChanged', onDataChanged)
    
    return () => {
      unregisterEvent('dataChanged', onDataChanged)
    }
  }, [registerEvent, unregisterEvent])

  return (
    <Editor editorProps={editorProps}>
      <Canvas canvasProps={canvasProps} />
    </Editor>
  )
}
```

## Documentation

For full documentation, API reference, interactive playgounds, and component examples, run Storybook locally:

```bash
npm run start
```

## Developed By

Developed and maintained by **Aman Yadav**.

## License

Copyright (c) 2026 Aman Yadav. See [LICENSE.txt](LICENSE.txt) for details.
