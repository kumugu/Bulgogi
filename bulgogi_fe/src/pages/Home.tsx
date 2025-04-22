import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-tight">
                A space to <span className="italic">deliciously</span> cook up your thoughts
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-lg">
                Cook up your ideas deliciously at Bulgogi Blog to share your own stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-neutral-900">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
                <Link to="/login">
                  <button className="inline-flex items-center justify-center px-6 py-3 border border-neutral-900 text-base font-medium rounded-full text-neutral-900 bg-white">
                    Login
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              The Special Flavor of Bulgogi
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Special features that enrich your writing experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {["Intuitive Editor", "Beautiful Typography", "Community Participation"].map((title, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-3">{title}</h3>
                <p className="text-neutral-600">A brief description about {title}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
