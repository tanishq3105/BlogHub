import { Clock } from "lucide-react"
import type { BlogPost } from "../types/blog"
import { Avatar } from "./Avatar"
import { stripHtml } from "../hooks/stripHtml"
import { getReadTime } from "../hooks/getReadTime"
import { Link } from "react-router-dom"

interface BlogCardProps {
  post: BlogPost
  link?: string
}

export const BlogCard = ({ post, link }: BlogCardProps) => {
  const content = stripHtml(post.content)
  const time = getReadTime(post.content)

  return (
    <Link to={`${link}/${post.id}`} className="block w-full h-full">
      <article className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden w-full h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-500/50 hover:cursor-pointer">
        <div className="relative pb-[56.25%]">
          <img
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover p-2 rounded-xl"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 hover:text-cyan-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-4 line-clamp-3 flex-grow">{content}</p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <Avatar author={post.author?.name as string} size="w-6 h-6 sm:w-8 sm:h-8" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-white">{post.author?.name}</p>
                <p className="text-xs text-gray-400">{post.publishedDate}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-400 text-xs sm:text-sm">
              <Clock size={12} className="mr-1" />
              {time} min read
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

