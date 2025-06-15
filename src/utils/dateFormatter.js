export const formatDate = (dateString, mode = 'auto') => {
  const date = new Date(dateString);
  if (isNaN(date)) return 'Tanggal tidak valid';

  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (mode === 'auto') {
    if (diffSeconds < 60) return `${diffSeconds} detik yang lalu`;
    if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 365) {
      const day = date.getDate();
      const month = date.toLocaleString('id-ID', { month: 'long' });
      return `${day} ${month}`;
    }
  }

  if (mode === 'full') {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${hours}.${minutes} ${day} ${month} ${year}`;
  }

  return dateString;
};
