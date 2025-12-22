import { Hero } from "@/components/sections/Hero"
import { TrustStrip } from "@/components/sections/TrustStrip"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { Testimonials } from "@/components/sections/Testimonials"
import { BrandPartners } from "@/components/sections/BrandPartners"

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <WhyChooseUs />
      <FeaturedProducts />
      <Testimonials />
      <BrandPartners />
    </main>
  )
}
