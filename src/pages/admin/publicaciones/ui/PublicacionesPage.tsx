import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/widgets/layout';
import {
  Card,
  Button,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconSpeakerphone,
} from '@tabler/icons-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Publicacion } from '../model/types';
import { PublicacionForm } from './PublicacionForm';
import {
  getPublicaciones,
  togglePublicacion,
  deletePublicacion,
} from '@/shared/api/publicaciones';
import { getFileUrl } from '@/shared/api/client';
import { toast } from 'sonner';

export function PublicacionesPage() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPublicacion, setSelectedPublicacion] = useState<Publicacion | undefined>();
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  useEffect(() => {
    loadPublicaciones();
  }, []);

  const loadPublicaciones = async () => {
    try {
      setLoading(true);
      const data = await getPublicaciones();
      setPublicaciones(data);
    } catch (error) {
      console.error('Error loading publicaciones:', error);
      toast.error('Error al cargar las publicaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedPublicacion(undefined);
    setShowForm(true);
  };

  const handleEdit = (publicacion: Publicacion) => {
    setSelectedPublicacion(publicacion);
    setShowForm(true);
  };

  const handleToggle = async (id: string) => {
    try {
      await togglePublicacion(id);
      await loadPublicaciones();
      toast.success('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error toggling publicacion:', error);
      toast.error('Error al cambiar el estado');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePublicacion(id);
      await loadPublicaciones();
      setDeleteDialog(null);
      toast.success('Publicación eliminada correctamente');
    } catch (error) {
      console.error('Error deleting publicacion:', error);
      toast.error('Error al eliminar la publicación');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedPublicacion(undefined);
    loadPublicaciones();
  };

  const getTipoBadge = (tipo: string) => {
    const colors = {
      anuncio: 'bg-blue-100 text-blue-800',
      comunicado: 'bg-purple-100 text-purple-800',
      evento: 'bg-green-100 text-green-800',
      noticia: 'bg-orange-100 text-orange-800',
    };
    return colors[tipo as keyof typeof colors] || colors.anuncio;
  };

  if (loading) {
    return (
      <DashboardLayout
        title="Gestión de Publicaciones"
        subtitle="Administra anuncios y comunicados del sistema"
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Cargando publicaciones...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Gestión de Publicaciones"
      subtitle="Administra anuncios y comunicados del sistema"
    >
      <div className="space-y-6">
        {/* Header con botón crear */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IconSpeakerphone className="size-6 text-primary" />
            <span className="text-lg font-semibold">
              {publicaciones.length} Publicación{publicaciones.length !== 1 ? 'es' : ''}
            </span>
          </div>
          <Button onClick={handleCreate}>
            <IconPlus className="size-4 mr-2" />
            Nueva Publicación
          </Button>
        </div>

        {/* Lista de publicaciones */}
        {publicaciones.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <IconSpeakerphone className="size-12 mx-auto mb-4 opacity-50" />
              <p>No hay publicaciones creadas</p>
              <p className="text-sm mt-2">Crea tu primera publicación para comenzar</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {publicaciones.map((publicacion) => (
              <Card key={publicacion.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{publicacion.titulo}</h3>
                      <Badge className={getTipoBadge(publicacion.tipo)}>
                        {publicacion.tipo.charAt(0).toUpperCase() + publicacion.tipo.slice(1)}
                      </Badge>
                      {!publicacion.activo && (
                        <Badge variant="secondary">Inactivo</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {publicacion.descripcion}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>
                        Creado: {format(new Date(publicacion.fechaPublicacion), 'PPP', { locale: es })}
                      </span>
                      {publicacion.fechaExpiracion && (
                        <span>
                          Expira: {format(
                            new Date(publicacion.fechaExpiracion.split('T')[0] + 'T12:00:00'),
                            'PPP',
                            { locale: es }
                          )}
                        </span>
                      )}
                      <span>Prioridad: {publicacion.prioridad}</span>
                      {publicacion.creador && (
                        <span>Por: {publicacion.creador.name}</span>
                      )}
                    </div>
                    {(publicacion.imagenUrl || publicacion.documentoUrl) && (
                      <div className="flex gap-2 mt-3">
                        {publicacion.imagenUrl && (
                          <Badge variant="outline">
                            📷 Con imagen
                          </Badge>
                        )}
                        {publicacion.documentoUrl && (
                          <Badge variant="outline">
                            📄 Con documento
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggle(publicacion.id)}
                      title={publicacion.activo ? 'Desactivar' : 'Activar'}
                    >
                      {publicacion.activo ? (
                        <IconEye className="size-4" />
                      ) : (
                        <IconEyeOff className="size-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(publicacion)}
                    >
                      <IconEdit className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteDialog(publicacion.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <IconTrash className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialog de formulario */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPublicacion ? 'Editar Publicación' : 'Nueva Publicación'}
            </DialogTitle>
            <DialogDescription>
              {selectedPublicacion
                ? 'Actualiza los datos de la publicación'
                : 'Crea una nueva publicación para mostrar en el sistema'}
            </DialogDescription>
          </DialogHeader>
          <PublicacionForm
            publicacion={selectedPublicacion}
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación de eliminación */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar publicación?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. La publicación será eliminada permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteDialog && handleDelete(deleteDialog)}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
