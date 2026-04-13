import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandsSlider from './components/BrandsSlider'
import JourneyTimeline from './components/JourneyTimeline'
import AwardsGallery from './components/AwardsGallery'
import Podcasts from './components/Podcasts'
import Partners from './components/Partners'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <Hero />
      <BrandsSlider />
      <JourneyTimeline />
      <AwardsGallery />
      <Podcasts />
      <Partners />
      <Footer />
    </div>
  )
}

export default App
