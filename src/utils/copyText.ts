export default function copyText(text: string) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).catch((err) => {
      console.log('error', err);
    });
  }

  const span = document.createElement('span');
  span.textContent = text;

  span.style.whiteSpace = 'pre';

  document.body.appendChild(span);

  const selection = window.getSelection();
  const range = window.document.createRange();
  selection?.removeAllRanges();
  range.selectNode(span);
  selection?.addRange(range);

  let success = false;
  try {
    success = window.document.execCommand('copy');
  } catch (err) {
    console.log('error', err);
  }

  selection?.removeAllRanges();
  window.document.body.removeChild(span);

  return success
    ? Promise.resolve()
    : Promise.reject(console.log('The request is not allowed'));
}
