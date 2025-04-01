import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
              About Bulgogi
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto">
              A platform where ideas simmer, thoughts marinate, and stories are served fresh.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/about.svg"
                alt="Our story"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">Our Story</h2>
              <p className="text-lg text-neutral-600">
                Bulgogi started in 2023 with a simple mission: to create a writing space that feels as 
                inviting and flavorful as sharing a meal with friends. Like the Korean dish we're named 
                after, we believe that good ideas should be marinated in thought, cooked with care, and 
                shared with others.
              </p>
              <p className="text-lg text-neutral-600">
                Our team of writers, designers, and developers came together to build a platform that 
                removes the barriers between your thoughts and your audience. We've crafted every aspect 
                of Bulgogi to enhance the experience of both writing and reading.
              </p>
              <p className="text-lg text-neutral-600">
                Today, Bulgogi serves thousands of writers who are passionate about sharing their ideas, 
                stories, and expertise with the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Values</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The principles that guide how we build and grow Bulgogi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Simplicity",
                description: "We believe in removing complexity, not adding features. Our platform focuses on what matters most: your words.",
              },
              {
                title: "Quality",
                description: "Good writing deserves a beautiful home. We craft every pixel and interaction to honor the content you create.",
              },
              {
                title: "Community",
                description: "Writing doesn't have to be solitary. We're building spaces for connection, feedback, and growth.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The people behind Bulgogi who are passionate about creating the best platform for writers
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Kumgu Kim",
                role: "Founder & CEO",
                image: "/images/111.svg",
              },
              {
                name: "amuge",
                role: "Head of Design",
                image: "/images/222.svg",
              },
              {
                name: "choongang",
                role: "Lead Developer",
                image: "/images/333.svg",
              },
              {
                name: "HK Kim",
                role: "Community Manager",
                image: "/images/444.svg",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">{member.name}</h3>
                <p className="text-neutral-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8">
            Become part of a growing network of writers and readers who are passionate about great content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-neutral-900 bg-white hover:bg-neutral-100 transition-colors duration-200"
            >
              Sign Up
            </Link>
            <Link
              to="/blog-home"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white bg-transparent hover:bg-white/10 transition-colors duration-200"
            >
              Explore Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">Get in Touch</h2>
              <p className="text-lg text-neutral-600">
                Have questions, feedback, or just want to say hello? We'd love to hear from you!
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-neutral-900">Email</h3>
                  <p className="text-neutral-600">hello@bulgogi.blog</p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Address</h3>
                  <p className="text-neutral-600">123 Writing Lane, Creativeville, Seoul 04532</p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Social</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">Twitter</a>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">Instagram</a>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    placeholder="What would you like to tell us?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}