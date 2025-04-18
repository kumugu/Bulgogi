import { Tag, X } from "lucide-react"
import { useState } from "react"

interface TagInputProps {
  tags: string[]
  setTags: (tags: string[]) => void
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [currentTag, setCurrentTag] = useState("")

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag)) {
        setTags([...tags, currentTag])
      }
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <Tag className="h-5 w-5 text-neutral-400" />
      {tags.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 text-sm">
          {tag}
          <button onClick={() => handleRemoveTag(tag)} className="text-neutral-400 hover:text-neutral-600">
            <X className="h-4 w-4" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="Enter tags..."
        className="flex-grow p-2 border-none focus:outline-none focus:ring-0 text-sm placeholder:text-neutral-300"
      />
    </div>
  )
}

export default TagInput
