export function cn(...classNames: Array<string | undefined>): string {
  return classNames.filter(Boolean).join(' ').trim(); // Join non-empty class names with a space
}
