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
