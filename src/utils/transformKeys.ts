export default function transformKeys(
  obj: Record<string, unknown>,
  keyMap: Record<string, string>,
): Record<string, unknown> {
  const transformedObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = keyMap[key];
      if (newKey !== undefined) {
        transformedObj[newKey] = obj[key];
      } else {
        transformedObj[key] = obj[key];
      }
    }
  }

  return transformedObj;
}

export function extractProperties(
  obj: Record<string, unknown> | null,
  keysToExtract: string[],
): Record<string, unknown> {
  if (!obj) {
    return {};
  }
  const extractedObj: Record<string, unknown> = {};

  keysToExtract.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      extractedObj[key] = obj[key];
    }
  });

  return extractedObj;
}
