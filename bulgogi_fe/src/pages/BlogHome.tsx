import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "react-feather";

export default function BlogHomePage() {
  interface Post {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    imageUrl: string;
    authorImageUrl: string;
  }

  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Simulated data for demo purposes
  useEffect(() => {
    // In a real application, these would be API calls
    const fetchFeaturedPosts = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data
      const mockFeaturedPosts = [
        {
          id: 1,
          title: "The Art of Creative Writing",
          excerpt: "Exploring techniques to unlock your creative potential and overcome writer's block.",
          author: "Kumgu Kim",
          date: "Feb 15, 2025",
          readTime: "8 min read",
          category: "Writing",
          imageUrl: "/images/111.svg",
          authorImageUrl: "/images/111.svg"
        },
        {
          id: 2,
          title: "Building a Sustainable Blog",
          excerpt: "How to create content that lasts and builds a loyal audience over time.",
          author: "Jordan Park",
          date: "Feb 22, 2025",
          readTime: "6 min read",
          category: "Strategy",
          imageUrl: "/images/222.svg",
          authorImageUrl: "/images/222.svg"
        },
        {
          id: 3,
          title: "Finding Your Voice Online",
          excerpt: "Developing an authentic writing voice that resonates with readers.",
          author: "Taylor Lee",
          date: "Feb 10, 2025",
          readTime: "5 min read",
          category: "Writing",
          imageUrl: "/images/333.svg",
          authorImageUrl: "/images/333.svg"
        }
      ];
      
      setFeaturedPosts(mockFeaturedPosts);
    };

    const fetchRecentPosts = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Mock data
      const mockRecentPosts = [
        {
          id: 4,
          title: "10 Tools Every Blogger Should Use",
          excerpt: "Boost your productivity with these essential blogging tools and resources.",
          author: "Casey Choi",
          date: "Feb 25, 2025",
          readTime: "7 min read",
          category: "Tools",
          imageUrl: "/images/444.svg",
          authorImageUrl: "/images/444.svg"
        },
        {
          id: 5,
          title: "The Power of Storytelling in Content Marketing",
          excerpt: "How narrative techniques can transform your marketing content.",
          author: "Alex Kim",
          date: "Feb 23, 2025",
          readTime: "9 min read",
          category: "Marketing",
          imageUrl: "/images/555.svg",
          authorImageUrl: "/images/222.svg"
        },
        {
          id: 6,
          title: "SEO Basics for New Bloggers",
          excerpt: "Simple steps to make your content more discoverable online.",
          author: "Jordan Park",
          date: "Feb 21, 2025",
          readTime: "6 min read",
          category: "SEO",
          imageUrl: "/images/111.svg",
          authorImageUrl: "/images/111.svg"
        },
        {
          id: 7,
          title: "Creating a Content Calendar That Works",
          excerpt: "How to plan your content strategy for consistent publishing.",
          author: "Taylor Lee",
          date: "Feb 19, 2025",
          readTime: "5 min read",
          category: "Strategy",
          imageUrl: "/images/555.svg",
          authorImageUrl: "/images/555.svg"
        },
        {
          id: 8,
          title: "The Psychology of Engaging Headlines",
          excerpt: "Write headlines that capture attention and drive reader engagement.",
          author: "Casey Choi",
          date: "Feb 17, 2025",
          readTime: "4 min read",
          category: "Writing",
          imageUrl: "/images/333.svg",
          authorImageUrl: "/images/222.svg"
        },
        {
          id: 9,
          title: "Building Community Around Your Blog",
          excerpt: "Strategies for turning readers into an engaged community.",
          author: "Alex Kim",
          date: "Feb 16, 2025",
          readTime: "8 min read",
          category: "Community",
          imageUrl: "/images/444.svg",
          authorImageUrl: "/images/444.svg"
        }
      ];
      
      setRecentPosts(mockRecentPosts);
    };

    const fetchCategories = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock data
      const mockCategories = ["All", "Writing", "Strategy", "Marketing", "SEO", "Tools", "Community"];
      
      setCategories(mockCategories);
    };

    // Call all data fetching functions
    Promise.all([fetchFeaturedPosts(), fetchRecentPosts(), fetchCategories()])
      .then(() => setLoading(false));
  }, []);

  // Filter posts by category
  const filteredPosts = selectedCategory === "All" 
    ? recentPosts 
    : recentPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative py-20 bg-neutral-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Explore Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">
              Discover insights, tips, and stories from our community of writers
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-8">Featured Posts</h2>
          
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-neutral-100 rounded-xl animate-pulse h-96"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="text-sm font-medium px-3 py-1 bg-neutral-100 rounded-full text-neutral-600">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-3 group-hover:text-neutral-700 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center">
                        <img 
                          src={post.authorImageUrl} 
                          alt={post.author}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div className="text-sm">
                          <p className="text-neutral-900 font-medium">{post.author}</p>
                          <p className="text-neutral-500">{post.date} · {post.readTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Filter & Recent Posts */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-4 md:mb-0">Recent Posts</h2>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? "bg-neutral-900 text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-neutral-100 rounded-xl animate-pulse h-80"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                      <div className="aspect-[3/2] overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-neutral-100 rounded-full text-neutral-600">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors duration-200">
                          {post.title}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-3 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs">
                          <img 
                            src={post.authorImageUrl} 
                            alt={post.author}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-neutral-500">{post.author} · {post.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-neutral-700 mb-2">No posts found</h3>
                  <p className="text-neutral-500 mb-6">Try selecting a different category</p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="px-6 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors duration-200"
                  >
                    View all posts
                  </button>
                </div>
              )}
            </>
          )}
          
          {/* Pagination */}
          {filteredPosts.length > 0 && !loading && (
            <div className="mt-12 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                <button className="px-4 py-2 border border-neutral-300 bg-white text-neutral-700 rounded-l-md hover:bg-neutral-50">
                  Previous
                </button>
                <button className="px-4 py-2 border-t border-b border-r border-neutral-300 bg-neutral-900 text-white">
                  1
                </button>
                <button className="px-4 py-2 border-t border-b border-r border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50">
                  2
                </button>
                <button className="px-4 py-2 border-t border-b border-r border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50">
                  3
                </button>
                <button className="px-4 py-2 border-t border-b border-r border-neutral-300 bg-white text-neutral-700 rounded-r-md hover:bg-neutral-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900 text-white rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
                <p className="text-neutral-300 mb-6">
                  Join our newsletter to receive the latest blog posts, writing tips, and updates directly to your inbox.
                </p>
              </div>
              <div>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-full text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors duration-200"
                  >
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </form>
                <p className="text-neutral-400 text-sm mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}