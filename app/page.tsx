import HeroSection from "@/components/HeroSection";
import CEOSpotlight from "@/components/CEOSpotlight";
import BlueprintLab from "@/components/BlueprintLab";
import ConstructionBay from "@/components/ConstructionBay";
import Services from "@/components/Services";
import TeamGrid from "@/components/TeamGrid";
import AuthChecker from "@/components/AuthChecker";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ConsultationForm from "@/components/ConsultationForm";
import StudioHQ from "@/components/StudioHQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CEOSpotlight />
      <div id="lab-blueprint">
        <BlueprintLab />
      </div>
      <ConstructionBay />
      <div id="services">
        <Services />
      </div>
      <div id="leadership">
        <TeamGrid />
      </div>
      <div id="authentication">
        <AuthChecker />
      </div>
      <BeforeAfterSlider />
      <div id="contact">
        <ConsultationForm />
      </div>
      <StudioHQ />
      <Footer />
    </>
  );
}

