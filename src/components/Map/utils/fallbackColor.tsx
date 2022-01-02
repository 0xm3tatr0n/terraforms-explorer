export default function fallbackColor(color: string) {
  const hexColorPattern = /^#[0-9A-F]{6}$/
  const colorCaps = color ? color.toUpperCase() : ''
  if (hexColorPattern.test(colorCaps)) {
    return colorCaps
  } else {
    return '#ff00ff'
  }
}
