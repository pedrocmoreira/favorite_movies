export function formatDate(date: string): string {
  const dateParts = date.split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return `${day}/${month}/${year}`;
}