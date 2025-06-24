export const formatDate = (dateString, mode = 'auto') => {
  const date = new Date(dateString);
  if (isNaN(date)) return 'Tanggal tidak valid';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffYears = now.getFullYear() - date.getFullYear();

  const day = date.getDate();
  const monthShort = date.toLocaleString('id-ID', { month: 'short' });
  const monthLong = date.toLocaleString('id-ID', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (mode === 'auto') {
    if (diffSeconds < 60) return `${diffSeconds} detik yang lalu`;
    if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 365) return `${day} ${monthLong}`;
    return `${day} ${monthShort} ${year}`; // Lebih dari 1 tahun
  }

  if (mode === 'full') {
    return `${hours}.${minutes} ${day} ${monthLong} ${year}`;
  }

  return dateString; // fallback
};
