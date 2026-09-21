import Footer from "@/components/footer";
import Header from "@/components/header";
import { SiteHeader } from "@/components/site-header";

export default function DashBoardLayout({ children}: LayoutProps<"/">) {
    return (
        <div>
            <Header />
            <SiteHeader />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </div>
    )
}