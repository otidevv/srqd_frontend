import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { IconUpload, IconX } from '@tabler/icons-react';
import type { Publicacion } from '../model/types';
import { createPublicacion, updatePublicacion } from '@/shared/api/publicaciones';
import { uploadPublicacionFile } from '@/shared/api/archivos';
import { getFileUrl } from '@/shared/api/client';
import { toast } from 'sonner';

const formSchema = z.object({
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  tipo: z.enum(['anuncio', 'comunicado', 'evento', 'noticia']),
  prioridad: z.number().min(0).max(100),
  fechaExpiracion: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PublicacionFormProps {
  publicacion?: Publicacion;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PublicacionForm({
  publicacion,
  onSuccess,
  onCancel,
}: PublicacionFormProps) {
  const [loading, setLoading] = useState(false);
  const [imagen, setImagen] = useState<File | null>(null);
  const [documento, setDocumento] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | undefined>(
    publicacion?.imagenUrl ? getFileUrl(publicacion.imagenUrl) || undefined : undefined
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: publicacion?.titulo || '',
      descripcion: publicacion?.descripcion || '',
      tipo: publicacion?.tipo || 'anuncio',
      prioridad: publicacion?.prioridad || 0,
      fechaExpiracion: publicacion?.fechaExpiracion
        ? new Date(publicacion.fechaExpiracion).toISOString().split('T')[0]
        : '',
    },
  });

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona una imagen válida');
        return;
      }
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumento(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      // 1. Upload archivos si existen
      let imagenUrl = publicacion?.imagenUrl;
      let documentoUrl = publicacion?.documentoUrl;

      if (imagen) {
        const imagenResult = await uploadPublicacionFile(
          imagen,
          'PUBLICACION_IMAGEN'
        );
        if (imagenResult.success && imagenResult.data) {
          imagenUrl = imagenResult.data.url;
        } else {
          throw new Error(imagenResult.error || 'Error al subir la imagen');
        }
      }

      if (documento) {
        const docResult = await uploadPublicacionFile(
          documento,
          'PUBLICACION_DOCUMENTO'
        );
        if (docResult.success && docResult.data) {
          documentoUrl = docResult.data.url;
        } else {
          throw new Error(docResult.error || 'Error al subir el documento');
        }
      }

      // 2. Crear o actualizar publicación
      const publicacionData = {
        titulo: data.titulo,
        descripcion: data.descripcion,
        tipo: data.tipo,
        prioridad: data.prioridad,
        fechaExpiracion: data.fechaExpiracion
          ? new Date(data.fechaExpiracion).toISOString()
          : undefined,
        imagenUrl,
        documentoUrl,
      };

      if (publicacion) {
        await updatePublicacion(publicacion.id, publicacionData);
        toast.success('Publicación actualizada correctamente');
      } else {
        await createPublicacion(publicacionData);
        toast.success('Publicación creada correctamente');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving publicacion:', error);
      toast.error(error instanceof Error ? error.message : 'Error al guardar la publicación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Título */}
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Título de la publicación"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción */}
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción detallada de la publicación"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tipo y Prioridad */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="anuncio">Anuncio</SelectItem>
                    <SelectItem value="comunicado">Comunicado</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                    <SelectItem value="noticia">Noticia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prioridad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground">
                  0-100 (mayor número = mayor prioridad)
                </p>
              </FormItem>
            )}
          />
        </div>

        {/* Fecha de expiración */}
        <FormField
          control={form.control}
          name="fechaExpiracion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Expiración (opcional)</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  min={new Date().toISOString().split('T')[0]}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                La publicación se ocultará automáticamente después de esta fecha
              </p>
            </FormItem>
          )}
        />

        {/* Upload Imagen */}
        <div>
          <FormLabel>Imagen del Flyer</FormLabel>
          <div className="mt-2 space-y-3">
            {imagenPreview && (
              <div className="relative inline-block">
                <img
                  src={imagenPreview}
                  alt="Preview"
                  className="max-w-full h-48 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImagen(null);
                    setImagenPreview(undefined);
                  }}
                >
                  <IconX className="size-4" />
                </Button>
              </div>
            )}
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="hidden"
                id="imagen-upload"
              />
              <label htmlFor="imagen-upload">
                <Button type="button" variant="outline" asChild>
                  <span className="cursor-pointer">
                    <IconUpload className="size-4 mr-2" />
                    {imagenPreview ? 'Cambiar imagen' : 'Subir imagen'}
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </div>

        {/* Upload Documento */}
        <div>
          <FormLabel>Documento Adjunto (opcional)</FormLabel>
          <div className="mt-2">
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleDocumentoChange}
              className="hidden"
              id="documento-upload"
            />
            <label htmlFor="documento-upload">
              <Button type="button" variant="outline" asChild>
                <span className="cursor-pointer">
                  <IconUpload className="size-4 mr-2" />
                  {documento || publicacion?.documentoUrl
                    ? 'Cambiar documento'
                    : 'Subir documento'}
                </span>
              </Button>
            </label>
            {(documento || publicacion?.documentoUrl) && (
              <p className="text-sm text-muted-foreground mt-2">
                📄 {documento?.name || 'Documento adjunto'}
              </p>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? 'Guardando...'
              : publicacion
              ? 'Actualizar'
              : 'Crear Publicación'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
