export function ToArray(value: string): string[] {
  if (typeof value === 'string') {
    return [value];
  }
  return value;
}
