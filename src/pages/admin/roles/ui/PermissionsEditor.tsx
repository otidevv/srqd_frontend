import { useState, useEffect } from "react";
import { Checkbox, Label } from "@/shared/ui";
import {
  type PermissionModule,
  type PermissionAction,
  AVAILABLE_PERMISSIONS,
  MODULE_LABELS,
  ACTION_LABELS,
} from "@/entities/role";

interface PermissionsEditorProps {
  value: Record<string, PermissionAction[]>;
  onChange: (permissions: Record<string, PermissionAction[]>) => void;
  disabled?: boolean;
}

export function PermissionsEditor({ value, onChange, disabled = false }: PermissionsEditorProps) {
  const [permissions, setPermissions] = useState<Record<string, PermissionAction[]>>(value || {});

  useEffect(() => {
    setPermissions(value || {});
  }, [value]);

  const handleToggleModule = (module: PermissionModule, checked: boolean) => {
    const newPermissions = { ...permissions };

    if (checked) {
      // Enable all available actions for this module
      newPermissions[module] = AVAILABLE_PERMISSIONS[module];
    } else {
      // Disable all actions for this module
      delete newPermissions[module];
    }

    setPermissions(newPermissions);
    onChange(newPermissions);
  };

  const handleToggleAction = (module: PermissionModule, action: PermissionAction, checked: boolean) => {
    const newPermissions = { ...permissions };
    const moduleActions = newPermissions[module] || [];

    if (checked) {
      // Add action if not already present
      if (!moduleActions.includes(action)) {
        newPermissions[module] = [...moduleActions, action];
      }
    } else {
      // Remove action
      const filteredActions = moduleActions.filter(a => a !== action);
      if (filteredActions.length === 0) {
        delete newPermissions[module];
      } else {
        newPermissions[module] = filteredActions;
      }
    }

    setPermissions(newPermissions);
    onChange(newPermissions);
  };

  const isModuleFullySelected = (module: PermissionModule): boolean => {
    const moduleActions = permissions[module] || [];
    const availableActions = AVAILABLE_PERMISSIONS[module];
    return availableActions.every(action => moduleActions.includes(action));
  };

  const isModulePartiallySelected = (module: PermissionModule): boolean => {
    const moduleActions = permissions[module] || [];
    return moduleActions.length > 0 && !isModuleFullySelected(module);
  };

  const isActionSelected = (module: PermissionModule, action: PermissionAction): boolean => {
    const moduleActions = permissions[module] || [];
    return moduleActions.includes(action);
  };

  const modules = Object.keys(AVAILABLE_PERMISSIONS) as PermissionModule[];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Selecciona los permisos para este rol. Puedes marcar módulos completos o acciones individuales.
      </div>

      <div className="grid gap-3">
        {modules.map((module) => {
          const availableActions = AVAILABLE_PERMISSIONS[module];
          const isFullySelected = isModuleFullySelected(module);
          const isPartiallySelected = isModulePartiallySelected(module);

          return (
            <div
              key={module}
              className="border rounded-lg p-4 space-y-3 hover:border-primary/50 transition-colors"
            >
              {/* Module Header */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`module-${module}`}
                  checked={isFullySelected}
                  onCheckedChange={(checked) => handleToggleModule(module, checked as boolean)}
                  disabled={disabled}
                  className={isPartiallySelected ? "opacity-50" : ""}
                />
                <Label
                  htmlFor={`module-${module}`}
                  className="font-semibold text-base cursor-pointer"
                >
                  {MODULE_LABELS[module]}
                </Label>
              </div>

              {/* Actions */}
              <div className="pl-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {availableActions.map((action) => (
                  <div key={action} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${module}-${action}`}
                      checked={isActionSelected(module, action)}
                      onCheckedChange={(checked) =>
                        handleToggleAction(module, action, checked as boolean)
                      }
                      disabled={disabled}
                    />
                    <Label
                      htmlFor={`${module}-${action}`}
                      className="text-sm cursor-pointer"
                    >
                      {ACTION_LABELS[action]}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
