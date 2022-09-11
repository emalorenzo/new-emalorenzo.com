export const groupTags = (tagsList): string[] => {
  const groupedTags: string[] = [];

  for (let i = 0; i < tagsList.length; i += 1) {
    const { tags } = tagsList[i].frontMatter;
    console.log(tags);
    for (let x = 0; x < tags.length; x += 1) {
      const tag = tags[x];
      if (!groupedTags.includes(tag)) {
        groupedTags.push(tag);
      }
    }
  }
  return groupedTags;
};

export const transformRangedValue = (
  value: number,
  min: number,
  max: number,
  toMin: number,
  toMax: number
): number => {
  return ((toMax - toMin) * (value - min)) / (max - min) + toMin;
};

export function DOMtoThreeCoords(domX, domY, viewport) {
  const normalizedX = domX - window.innerWidth / 2;
  const normalizedY = domY - window.innerHeight / 2;
  const x = (viewport.width * normalizedX) / window.innerWidth;
  const y = -(viewport.height * normalizedY) / window.innerHeight;

  return { x, y };
}
