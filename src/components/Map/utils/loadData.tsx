export default function loadData(dataRaw: any[]) {
  const levels = new Set<number>()
  const biomes = new Set<number>()
  const zones = new Set<string>()
  const ids = new Set<number>()

  dataRaw.forEach((e) => {
    levels.add(Number(e.level))
    biomes.add(Number(e.biome))
    zones.add(String(e.zoneName))
    ids.add(Number(e.tokenId))
  })

  const data = dataRaw

  return {
    data,
    levels: [...levels].sort((a, b) => {
      return a - b
    }),
    biomes: [...biomes].sort((a, b) => {
      return a - b
    }),
    zones: [...zones].sort(),
    ids: [...ids],
  }
}
