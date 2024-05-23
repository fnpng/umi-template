import { userStore } from '@/store';

export default function highlightText(
  text: string,
  highlightText: string,
  color = userStore.userSettings.themeColor,
) {
  if (highlightText) {
    const index = text.toLowerCase().indexOf(highlightText.toLowerCase());

    if (index === -1) {
      return text;
    }

    const prefix = text.substring(0, index);
    const suffix = text.substring(index + highlightText.length);

    return (
      <span>
        {prefix}
        <span style={{ color, fontWeight: 600 }}>
          {text.substring(index, index + highlightText.length)}
        </span>
        {suffix}
      </span>
    );
  }

  return text;
}
