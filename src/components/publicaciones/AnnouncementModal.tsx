import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Badge,
} from '@/shared/ui';
import { IconDownload, IconX } from '@tabler/icons-react';
import type { Publicacion } from '@/pages/admin/publicaciones/model/types';
import { getPublicacionesActivas } from '@/shared/api/publicaciones';
import { getFileUrl } from '@/shared/api/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Autoplay from 'embla-carousel-autoplay';

const STORAGE_KEY = 'srqd_announcements_seen';

export function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    loadPublicaciones();
  }, []);

  const loadPublicaciones = async () => {
    try {
      const data = await getPublicacionesActivas();

      if (data.length === 0) {
        return;
      }

      // Verificar si el usuario ya vio estos anuncios
      const seenIds = getSeenAnnouncementIds();
      const newPublicaciones = data.filter((p) => !seenIds.includes(p.id));

      if (newPublicaciones.length > 0) {
        setPublicaciones(newPublicaciones);
        setOpen(true);
      }
    } catch (error) {
      console.error('Error loading announcements:', error);
    }
  };

  const getSeenAnnouncementIds = (): string[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const markAsSeen = () => {
    try {
      const seenIds = getSeenAnnouncementIds();
      const newIds = [...seenIds, ...publicaciones.map((p) => p.id)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    } catch (error) {
      console.error('Error saving seen announcements:', error);
    }
  };

  const handleClose = () => {
    if (dontShowAgain) {
      markAsSeen();
    }
    setOpen(false);
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTipoColor = (tipo: string) => {
    const colors = {
      anuncio: 'bg-blue-100 text-blue-800',
      comunicado: 'bg-purple-100 text-purple-800',
      evento: 'bg-green-100 text-green-800',
      noticia: 'bg-orange-100 text-orange-800',
    };
    return colors[tipo as keyof typeof colors] || colors.anuncio;
  };

  if (publicaciones.length === 0) {
    return null;
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          // Solo permitir cerrar el Dialog si el lightbox NO está abierto
          if (!lightboxImage) {
            setOpen(newOpen);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        {publicaciones.length === 1 ? (
          // Vista única
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10"
              onClick={handleClose}
            >
              <IconX className="size-4" />
            </Button>

            <div className="p-6">
              <div className="mb-4">
                <Badge className={getTipoColor(publicaciones[0].tipo)}>
                  {publicaciones[0].tipo.charAt(0).toUpperCase() +
                    publicaciones[0].tipo.slice(1)}
                </Badge>
              </div>

              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl">
                  {publicaciones[0].titulo}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {format(new Date(publicaciones[0].fechaPublicacion), 'PPP', {
                    locale: es,
                  })}
                </DialogDescription>
              </DialogHeader>

              {publicaciones[0].imagenUrl && (
                <div className="mb-4 cursor-pointer group" onClick={() => setLightboxImage(getFileUrl(publicaciones[0].imagenUrl) || '')}>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={getFileUrl(publicaciones[0].imagenUrl) || ''}
                      alt={publicaciones[0].titulo}
                      className="w-full max-h-[500px] object-contain rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                        <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-2">Haz clic para ampliar</p>
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-4 whitespace-pre-wrap">
                {publicaciones[0].descripcion}
              </p>

              {publicaciones[0].documentoUrl && (
                <div className="flex justify-center">
                  <Button
                    onClick={() =>
                      handleDownload(
                        getFileUrl(publicaciones[0].documentoUrl) || '',
                        `documento_${publicaciones[0].titulo}.pdf`
                      )
                    }
                  >
                    <IconDownload className="size-4 mr-2" />
                    Descargar Documento
                  </Button>
                </div>
              )}

              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="rounded"
                  />
                  No mostrar nuevamente
                </label>
                <Button onClick={handleClose}>Entendido</Button>
              </div>
            </div>
          </div>
        ) : (
          // Vista carousel
          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl">Anuncios Recientes</DialogTitle>
              <DialogDescription>
                {publicaciones.length} nuevas publicaciones
              </DialogDescription>
            </DialogHeader>

            <Carousel
              className="w-full"
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                }),
              ]}
            >
              <CarouselContent>
                {publicaciones.map((publicacion) => (
                  <CarouselItem key={publicacion.id}>
                    <div className="p-4">
                      <div className="mb-3">
                        <Badge className={getTipoColor(publicacion.tipo)}>
                          {publicacion.tipo.charAt(0).toUpperCase() +
                            publicacion.tipo.slice(1)}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-semibold mb-2">
                        {publicacion.titulo}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        {format(new Date(publicacion.fechaPublicacion), 'PPP', {
                          locale: es,
                        })}
                      </p>

                      {publicacion.imagenUrl && (
                        <div className="mb-4 cursor-pointer group" onClick={() => setLightboxImage(getFileUrl(publicacion.imagenUrl) || '')}>
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={getFileUrl(publicacion.imagenUrl) || ''}
                              alt={publicacion.titulo}
                              className="w-full max-h-[400px] object-contain rounded-lg transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                                <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-center text-muted-foreground mt-1">Clic para ampliar</p>
                        </div>
                      )}

                      <p className="text-sm text-muted-foreground mb-4 whitespace-pre-wrap line-clamp-4">
                        {publicacion.descripcion}
                      </p>

                      {publicacion.documentoUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleDownload(
                              getFileUrl(publicacion.documentoUrl) || '',
                              `documento_${publicacion.titulo}.pdf`
                            )
                          }
                        >
                          <IconDownload className="size-4 mr-2" />
                          Descargar Documento
                        </Button>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="mt-6 pt-4 border-t flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="rounded"
                />
                No mostrar nuevamente
              </label>
              <Button onClick={handleClose}>Cerrar</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>

    {/* Lightbox para ver imagen en tamaño completo - Usando Portal para estar por encima de todo */}
    {lightboxImage && createPortal(
      <div
        className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          setLightboxImage(null);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setLightboxImage(null);
          }
        }}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 z-[100000] bg-white/90 hover:bg-white text-gray-800 hover:text-black shadow-lg rounded-md p-2 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setLightboxImage(null);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
          aria-label="Cerrar vista ampliada"
        >
          <IconX className="size-6" />
        </button>

        <div className="max-w-[95vw] max-h-[95vh] overflow-auto cursor-default" onClick={(e) => e.stopPropagation()}>
          <img
            src={lightboxImage}
            alt="Vista ampliada"
            className="w-auto h-auto max-w-none rounded-lg shadow-2xl"
            style={{ maxWidth: '95vw', maxHeight: '95vh' }}
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm text-white bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            Presiona ESC o haz clic fuera para cerrar
          </p>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
