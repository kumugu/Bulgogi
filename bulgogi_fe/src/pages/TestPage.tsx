import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react"

interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  likes: number
  comments: number
}

interface Category {
  name: string
  count: number
  subcategories?: Category[]
}

interface Profile {
  username: string
  bio: string
  followers: number
  following: number
  totalPosts: number
}

export default function MyBlog() {
  const { username } = useParams<{ username: string }>()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["All"]))
  const [posts, setPosts] = useState<Post[]>([])
  const [profile] = useState<Profile>({
    username: username || "",
    bio: "Writing about technology and life",
    followers: 128,
    following: 89,
    totalPosts: 42,
  })

  const categories: Category[] = [
    {
      name: "All",
      count: 42,
    },
    {
      name: "Programming",
      count: 15,
      subcategories: [
        { name: "JavaScript", count: 8 },
        { name: "React", count: 4 },
        { name: "TypeScript", count: 3 },
      ],
    },
    {
      name: "Life",
      count: 12,
    },
    {
      name: "Books",
      count: 8,
    },
  ]

  // Fetch posts (mock data for now)
  useEffect(() => {
    // In real app, fetch from API
    setPosts([
      {
        id: 1,
        title: "Getting Started with TypeScript",
        excerpt: "TypeScript is a powerful superset of JavaScript that adds static typing...",
        date: "2024-03-01",
        category: "Programming",
        likes: 24,
        comments: 5,
      },
      {
        id: 2,
        title: "My Journey as a Developer",
        excerpt: "Looking back at my journey over the past year, I've learned so much...",
        date: "2024-02-28",
        category: "Life",
        likes: 18,
        comments: 3,
      },
      // Add more posts as needed
    ])
  }, [])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const renderCategory = (category: Category, level = 0) => {
    const isExpanded = expandedCategories.has(category.name)
    const hasSubcategories = category.subcategories && category.subcategories.length > 0

    return (
      <div key={category.name} className="space-y-2">
        <button
          onClick={() => toggleCategory(category.name)}
          className={`flex items-center w-full px-2 py-1.5 text-sm rounded-lg hover:bg-neutral-100 ${
            level > 0 ? "ml-4" : ""
          }`}
        >
          {hasSubcategories ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 mr-1 text-neutral-500" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1 text-neutral-500" />
            )
          ) : (
            <FileText className="h-4 w-4 mr-1 text-neutral-500" />
          )}
          <span className="flex-1 text-left">{category.name}</span>
          <span className="text-neutral-500 text-xs">{category.count}</span>
        </button>
        {hasSubcategories && isExpanded && (
          <div className="ml-2">{category.subcategories?.map((sub) => renderCategory(sub, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Profile Section */}
              <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-neutral-900 text-white flex items-center justify-center text-2xl font-medium">
                    {profile.username.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">{profile.username}</h2>
                  <p className="text-neutral-600 text-sm mt-2">{profile.bio}</p>
                </div>

                <div className="flex justify-center space-x-6 pt-4 border-t border-neutral-200">
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profile.followers}</div>
                    <div className="text-sm text-neutral-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profile.following}</div>
                    <div className="text-sm text-neutral-600">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{profile.totalPosts}</div>
                    <div className="text-sm text-neutral-600">Posts</div>
                  </div>
                </div>

                <button className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors duration-200">
                  Edit Profile
                </button>
              </div>

              {/* Categories */}
              <div className="p-6 bg-white border border-neutral-200 rounded-xl">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Folder className="h-4 w-4 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">{categories.map((category) => renderCategory(category))}</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Posts */}
            {posts.map((post) => (
              <article
                key={post.id}
                className="p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow duration-200"
              >
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-neutral-500">{post.category}</span>
                    <h2 className="mt-1 text-2xl font-semibold hover:text-neutral-600">{post.title}</h2>
                  </div>
                  <p className="text-neutral-600">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-4">
                      <span>♥ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

