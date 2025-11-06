import { Navbar } from "@/widgets/navbar";
import { Hero } from "@/widgets/hero";
import { FeaturesSection } from "@/widgets/features";
import { Footer } from "@/widgets/footer";
import { ThemeSwitcher } from "@/features/theme-switcher";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <ThemeSwitcher />
      <Navbar />
      <Hero />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
