import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
  authorId?: string;
  link: string;
  imageUrl: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
  link,
  imageUrl,
}: BlogCardProps) => {
  function stripHtml(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  return (
    <Link to={`/${link}/${id}`}>
      <div className="border-b-2 border-customBlack pb-4 w-full max-w-screen-lg cursor-pointer pt-1 mx-auto">
        {/* Flex container for aligning content and image */}
        <div className="flex justify-between items-center px-4 md:px-0">
          {/* Left side: Text content */}
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-2">
              <div className="flex justify-center flex-col">
                <Avatar author={authorName} size={20} />
              </div>
              <div className="font-semibold pl-2 text-xs font-thin md:text-sm text-white ">
                {authorName}
              </div>
              <div className="pl-2 font-thin text-sm flex flex-col justify-center text-customGrey">
                {publishedDate}
              </div>
            </div>

            <div className="text-xl md:text-2xl font-bold pt-1 text-customDarkBlue hover:text-customBlue">
              {title}
            </div>
            <div className="font-thin text-md md:text-lg text-white">
              {stripHtml(content).slice(0, 100) + "..."}
            </div>
            <div className="text-customGrey text-sm md:text-md font-thin pt-3">{`${Math.ceil(
              stripHtml(content).length / 100
            )} min read`}</div>
          </div>

          {/* Right side: Image */}
          <div className="flex-shrink-0">
            <div className="h-[120px] w-[200px] md:h-[170px] md:w-[300px] border text-white text-sm">
              <img
                src={imageUrl}
                alt="Blog Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface AvatarProps {
  author: string;
  size: number;
}

export function Avatar({ author, size }: AvatarProps) {
  const getColorFromName = (name: string): string => {
    const colors = [
      "bg-blue-500",
      "bg-red-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-pink-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const first = author[0];
  const avatarColorClass = getColorFromName(author);

  return (
    <div>
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${avatarColorClass}`}
        style={{ width: size, height: size }}
      >
        <span className="text-sm text-white">{first}</span>
      </div>
    </div>
  );
}
