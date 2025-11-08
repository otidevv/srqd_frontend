/**
 * ProfilePage Component
 * Allows users to view and edit their profile information
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/widgets/layout";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { useToast } from "@/shared/ui/use-toast";
import { useAuth } from "@/app/providers";
import { usersApi } from "@/shared/api/users";
import { sedesApi } from "@/shared/api/sedes";
import { dependenciasApi } from "@/shared/api/dependencias";
import type { UpdateProfileDTO, TipoDocumento } from "@/entities/user";
import type { Sede } from "@/entities/sede";
import type { Dependencia } from "@/entities/dependencia";
import { IconLoader2 } from "@tabler/icons-react";

export function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [formData, setFormData] = useState<UpdateProfileDTO>({
    name: "",
    phone: "",
    tipoDocumento: undefined,
    numeroDocumento: "",
    fechaNacimiento: "",
    direccion: "",
    cargo: "",
    sedeId: undefined,
    dependenciaId: undefined,
  });

  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);
        const [sedesData, dependenciasData] = await Promise.all([
          sedesApi.getSedes(),
          dependenciasApi.getDependencias(),
        ]);
        setSedes(sedesData);
        setDependencias(dependenciasData);

        // Populate form with current user data
        if (user) {
          setFormData({
            name: user.name || "",
            phone: user.phone || "",
            tipoDocumento: user.tipoDocumento,
            numeroDocumento: user.numeroDocumento || "",
            fechaNacimiento: user.fechaNacimiento ? user.fechaNacimiento.split('T')[0] : "",
            direccion: user.direccion || "",
            cargo: user.cargo || "",
            sedeId: user.sedeId,
            dependenciaId: user.dependenciaId,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo cargar los datos necesarios",
        });
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, [user, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Clean up empty strings
      const dataToSend: UpdateProfileDTO = {
        name: formData.name || undefined,
        phone: formData.phone || undefined,
        tipoDocumento: formData.tipoDocumento,
        numeroDocumento: formData.numeroDocumento || undefined,
        fechaNacimiento: formData.fechaNacimiento || undefined,
        direccion: formData.direccion || undefined,
        cargo: formData.cargo || undefined,
        sedeId: formData.sedeId || undefined,
        dependenciaId: formData.dependenciaId || undefined,
      };

      await usersApi.updateProfile(dataToSend);

      // Refresh user data
      await refreshUser();

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado exitosamente",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "No se pudo actualizar el perfil",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <DashboardLayout title="Mi Perfil">
        <div className="flex items-center justify-center h-64">
          <IconLoader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Mi Perfil"
      subtitle="Administra tu información personal y profesional"
    >
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información de contacto y personal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                  <Select
                    value={formData.tipoDocumento || "none"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tipoDocumento: value === "none" ? undefined : (value as TipoDocumento),
                      })
                    }
                  >
                    <SelectTrigger id="tipoDocumento">
                      <SelectValue placeholder="Selecciona tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin especificar</SelectItem>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="CARNET_EXTRANJERIA">Carnet de Extranjería</SelectItem>
                      <SelectItem value="PASAPORTE">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numeroDocumento">Número de Documento</Label>
                  <Input
                    id="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={(e) =>
                      setFormData({ ...formData, numeroDocumento: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) =>
                      setFormData({ ...formData, fechaNacimiento: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Información Profesional</CardTitle>
              <CardDescription>
                Actualiza tu información laboral y de ubicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sede">Sede</Label>
                  <Select
                    value={formData.sedeId || "none"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        sedeId: value === "none" ? undefined : value,
                      })
                    }
                  >
                    <SelectTrigger id="sede">
                      <SelectValue placeholder="Selecciona una sede" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin especificar</SelectItem>
                      {sedes.map((sede) => (
                        <SelectItem key={sede.id} value={sede.id}>
                          {sede.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="dependencia">Dependencia</Label>
                  <Select
                    value={formData.dependenciaId || "none"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        dependenciaId: value === "none" ? undefined : value,
                      })
                    }
                  >
                    <SelectTrigger id="dependencia">
                      <SelectValue placeholder="Selecciona una dependencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin especificar</SelectItem>
                      {dependencias.map((dep) => (
                        <SelectItem key={dep.id} value={dep.id}>
                          {dep.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              disabled={loading}
            >
              Cancelar
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/change-password")}
                disabled={loading}
              >
                Cambiar Contraseña
              </Button>

              <Button type="submit" disabled={loading}>
                {loading && <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
