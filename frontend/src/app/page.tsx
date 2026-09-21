import Footer from "@/components/footer"
import Header from "@/components/header"
import { SiteHeader } from "@/components/site-header"

export default function Home() {

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#172033]">
      <Header /> 
        <SiteHeader />
        <div className="min-h-screen">
          Welcome
        </div>
      <Footer />
      </main>
  )
}
