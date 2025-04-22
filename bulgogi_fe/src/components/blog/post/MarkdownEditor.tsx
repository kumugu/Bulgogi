import MDEditor from "@uiw/react-md-editor"

interface MarkdownEditorProps {
  content: string
  setContent: (val: string) => void
}

const MarkdownEditor = ({ content, setContent }: MarkdownEditorProps) => {
  return (
    <div className="prose max-w-none mb-8">
      <MDEditor
        value={content}
        onChange={(val) => setContent(val || "")}
        preview="edit"
        height={500}
        className="w-full"
      />
    </div>
  )
}

export default MarkdownEditor
