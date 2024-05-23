export type ParamsType = Record<string, unknown>;

export default function getUrlParams(
  url: string = window.location.href,
): ParamsType {
  const searchParams = new URLSearchParams(new URL(url)?.search);
  const params: ParamsType = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
    if (value === 'true') {
      params[key] = true;
    }
    if (value === 'false') {
      params[key] = false;
    }
    if (!isNaN(Number(value))) {
      params[key] = Number(value);
    }
  }
  return params;
}
