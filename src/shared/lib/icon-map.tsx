/**
 * Dynamic icon mapper for lucide-react
 * Maps string icon names to actual icon components
 */
import {
  GraduationCap,
  Microscope,
  Users,
  Medal,
  Palette,
  Shield,
  Heart,
  BookOpen,
  Globe,
  Sparkles,
  Laptop,
  HeartHandshake,
  School,
  Zap,
  BarChart3,
  Lock,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Microscope,
  Users,
  Medal,
  Palette,
  Shield,
  Heart,
  BookOpen,
  Globe,
  Sparkles,
  Laptop,
  HeartHandshake,
  School,
  Zap,
  BarChart3,
  Lock,
};

/**
 * Get icon component by name
 * Returns default School icon if not found
 */
export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || School;
}
