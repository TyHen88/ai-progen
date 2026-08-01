import { APP_CONFIG } from '@/config/app.config';

export const storageService = {
  getDownloadUrl(filename: string): string {
    return `${APP_CONFIG.apiUrl}/storage/download/${encodeURIComponent(filename)}`;
  },

  async downloadFile(filename: string): Promise<void> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('aiprogen_token') : null;
    const url = this.getDownloadUrl(filename);

    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
      throw new Error(`Download failed: ${res.status} ${res.statusText}`);
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  },
};
