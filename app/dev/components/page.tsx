import Navbar from "@/app/components/Navbar/page"
export default function Test(){
    return (
        <>
            <div>
                <h3 className="w-20 h-10 p-2 m-3 rounded-lg bg-brand-primary text-brand-bg border-brand-border">Primary</h3>
                <h3>Ghost</h3>
                <h3>Accent</h3>
            </div>
            
            <Navbar/>
        </>
    )
}