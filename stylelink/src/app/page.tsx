import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedCollection from '@/components/FeaturedCollection'
import Footer from '@/components/Footer'
import InstallPrompt from '@/components/InstallPrompt'

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-200">
      <Header />
      <Hero />
      <FeaturedCollection />
      <Footer />
      <InstallPrompt />
    </div>
  );
}
