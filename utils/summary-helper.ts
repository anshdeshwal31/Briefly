import { constructFromSymbol } from "date-fns/constants";

export const parseSection = (
  section: string
): { title: string; points: string[] } => {
  const [title, ...content] = section.split('\n');

  const cleanTitle = title.startsWith('#')
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];

  let currentPoint = '';

  content.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('•')) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = '';
    } else {
      currentPoint += ' ' + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) =>
        point &&
        !point.startsWith('#') &&
        !point.startsWith('Choose')
    ) as string[],
  };
};


export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\/\*/.test(point);
  // Replace the Unicode property escape with a simpler
  // emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
    console.log("inside parseEmojiPoint function", content)
  const cleanContent = content.replace(/^\s*\*/, '').trim();
    console.log({cleanContent})
//   const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
const matches = content.match(/^[^\p{Emoji}]*(\p{Emoji}+)(.+)$/u);
  console.log({matches})
  if (!matches) return null;

  const [_, emoji, text] = matches;
  console.log("emoji at the end of parseEmojiPoint",emoji)
  console.log("text at the end of parseEmojiPoint function", text)
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}