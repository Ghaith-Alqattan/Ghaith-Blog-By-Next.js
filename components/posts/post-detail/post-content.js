import PostHeader from './post-header'
import ReactMarkDown from 'react-markdown'
import classes from './post-content.module.css'
import Image from 'next/image'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)

export default function PostContent(props) {
  const { post } = props
  const imagePath = `/images/posts/${post.slug}/${post.image}`
  const costumeRenderers = {
    paragraph(paragraph) {
      const { node } = paragraph
      if (node.children[0].type === 'image') {
        const image = node.children[0]
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.url}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        )
      }
      return <p>{paragraph.children}</p>
    },
    code(code) {
      const { node, className, children } = code
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : 'text'

      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          PreTag="div"
          children={String(children).replace(/\n$/, '')}
        />
      )
    },
  }
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkDown components={costumeRenderers}>
        {post.content}
      </ReactMarkDown>
    </article>
  )
}
