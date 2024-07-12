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
    <div className="border-b-2 border-grey-300 pb-4 w-screen max-w-screen-lg cursor-pointer pt-1">
        <div className="flex">
        <div className="flex justify-center flex-col">
            <Avatar author={authorName} size={5}/>
        </div>
      <div className="font-lights pl-2 text-sm">
        {authorName}
      </div>
      <div  className="pl-2 font-thin text-xs flex flex-col justify-center text-slate-400">
      {publishedDate}
      </div>
        </div>
       

      <div className="text-xl font-bold pt-1">
        {title}
        </div>

      <div className="font-thin text-md ">
        {content.slice(0, 100) + "..."}
        </div>

      <div className="text-slate-500 text-sm font-thin pt-3">{`${Math.ceil(content.length / 100)} min read`}</div>

    </div>
    </Link>
  );
};
export function Avatar({ author, size }: { author: string; size: number }) {
  // Function to generate a deterministic color based on the author's name
  const getColorFromName = (name: string) => {
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
      className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden rounded-full ${avatarColorClass}`}
      >
        <span className="text-sm text-white">{first}</span>
      </div>
    </div>
  );
}

