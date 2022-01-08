export default function loadData(dataRaw: any[]) {
  const levels = new Set<number>()
  const biomes = new Set<number>()
  const zones = new Set<string>()
  const ids = new Set<number>()
  const chromas = new Set<string>()
  const modes = new Set<string>()

  dataRaw.forEach((e) => {
    levels.add(Number(e.level))
    biomes.add(Number(e.biome))
    zones.add(String(e.zoneName))
    ids.add(Number(e.tokenId))
    chromas.add(String(e.chroma))
    modes.add(String(e.mode))
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
    chromas: [...chromas],
    modes: [...modes],
  }
}
