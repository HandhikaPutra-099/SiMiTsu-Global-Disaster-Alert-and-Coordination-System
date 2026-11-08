import HeroSection from '../sections/HeroSection'
import CausesSection from '../sections/CausesSection'
import SimulatorSection from '../sections/SimulatorSection'
import MitigationSection from '../sections/MitigationSection'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CausesSection />
      <SimulatorSection />
      <MitigationSection />
    </main>
  )
}
