/**
 * Archivos API Service
 * Handles file upload operations for casos
 */

import { apiClient } from './client';

interface UploadFileResult {
  success: boolean;
  data?: {
    id: string;
    nombre: string;
    url: string;
    tipo: string;
    tamano: number;
  };
  message?: string;
  error?: string;
}

/**
 * Upload a single file to a caso with optional category
 */
export async function uploadFile(
  casoId: string,
  file: File,
  categoria?: string,
  onProgress?: (progress: number) => void
): Promise<UploadFileResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (categoria) {
      formData.append('categoria', categoria);
    }

    const response = await apiClient.post<UploadFileResult>(
      `/archivos/upload/${casoId}`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error('Error uploading file:', file.name, error.message);

    const errorMessage = error.response?.data?.message ||
                        error.message ||
                        error.toString() ||
                        'Error desconocido al subir el archivo';

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Upload a file for publicacion (without caso validation)
 */
export async function uploadPublicacionFile(
  file: File,
  categoria: string,
  onProgress?: (progress: number) => void
): Promise<UploadFileResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('categoria', categoria);

    const response = await apiClient.post<UploadFileResult>(
      '/archivos/upload-publicacion',
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      }
    );

    console.log('Upload response:', response);
    return response;
  } catch (error: any) {
    console.error('========== ERROR UPLOADING PUBLICACION FILE ==========');
    console.error('File name:', file.name);
    console.error('Error object:', error);
    console.error('Error message:', error.message);
    console.error('Error response:', error.response?.data);
    console.error('======================================================');

    const errorMessage = error.response?.data?.message ||
                        error.message ||
                        'Error al subir el archivo de publicación';

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export interface FileWithCategory {
  file: File;
  categoria: string;
}

/**
 * Upload multiple files to a caso with categories
 */
export async function uploadFiles(
  casoId: string,
  filesWithCategories: FileWithCategory[],
  onProgress?: (current: number, total: number, fileName: string) => void
): Promise<{ success: boolean; uploaded: number; failed: number; errors: string[] }> {
  const results = {
    success: true,
    uploaded: 0,
    failed: 0,
    errors: [] as string[],
  };

  // Paralelizar subida de archivos para mayor velocidad
  const uploadPromises = filesWithCategories.map(({ file, categoria }, index) =>
    uploadFile(casoId, file, categoria)
      .then(result => {
        if (onProgress) {
          onProgress(index + 1, filesWithCategories.length, file.name);
        }
        return { file, result };
      })
      .catch(error => ({
        file,
        result: {
          success: false,
          error: error.message || 'Error desconocido'
        }
      }))
  );

  const uploadResults = await Promise.all(uploadPromises);

  // Procesar resultados
  uploadResults.forEach(({ file, result }) => {
    if (result.success) {
      results.uploaded++;
    } else {
      results.failed++;
      results.success = false;
      results.errors.push(`${file.name}: ${result.error || 'Error desconocido'}`);
    }
  });

  return results;
}

/**
 * Convert base64 string to File object
 */
export function base64ToFile(base64: string, filename: string): File {
  // Extract base64 data and mime type
  const matches = base64.match(/^data:([^;]+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  // Convert base64 to binary
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create File object
  return new File([bytes], filename, { type: mimeType });
}
