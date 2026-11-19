import Navbar from "@/components/Navbar";
import { ScrollProgress } from "@/components/ui";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Work from "@/components/Work";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Process />
        <Work />
        <WhyUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
