export const toLocaleDateString = (date: Date | string | undefined) =>
  date &&
  new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const currentYear = new Date().getFullYear();
