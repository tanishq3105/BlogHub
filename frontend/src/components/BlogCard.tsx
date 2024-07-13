import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id:number;
  authorId?:string;
  link:string
}


export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
  link,
}: BlogCardProps) => {
  return (
    <Link to={`/${link}/${id}`}>
    <div className="border-b-2 border-customBlack pb-4 w-screen max-w-screen-lg cursor-pointer pt-1">
        <div className="flex">
        <div className="flex justify-center flex-col">
            <Avatar author={authorName} size={20}/>
        </div>
      <div className="font-semibold pl-2 text-sm text-white">
        {authorName}
      </div>
      <div  className="pl-2 font-thin text-xs flex flex-col justify-center text-customGrey">
      {publishedDate}
      </div>
        </div>
       

      <div className="text-xl font-bold pt-1 text-customDarkBlue">
        {title}
        </div>

      <div className="font-thin text-md text-white">
        {content.slice(0, 100) + "..."}
        </div>

      <div className="text-customGrey text-sm font-thin pt-3">{`${Math.ceil(content.length / 100)} min read`}</div>

    </div>
    </Link>
  );
};

interface AvatarProps {
  author: string;
  size: number;
}

export function Avatar({ author, size }: AvatarProps) {
  // Function to generate a deterministic color based on the author's name
  const getColorFromName = (name: string): string => {
    const colors = [
      'bg-blue-500',
      'bg-red-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-pink-500',
    ];
    // Use a deterministic way to select a color based on the author's name
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


