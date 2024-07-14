import { Avatar } from "./BlogCard";

interface BlogPageProp {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogPage = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogPageProp) => {
  return (
    <div className="flex flex-col lg:flex-row h-full mx-4 md:mx-8 lg:mx-32">
      <div className="lg:w-4/5 pt-4">
        <div className="font-bold text-2xl md:text-3xl lg:text-4xl pt-3 text-customDarkBlue">
          {title}
        </div>
        <div className="text-sm text-slate-500 pt-2">
          {publishedDate}
        </div>
        <div className="pt-3 text-lg md:text-xl text-white">
          {content}
        </div>
      </div>

      <div className="lg:w-1/5 p-4 mt-8 lg:mt-0">
        <div>
          <div className="text-base md:text-lg pb-4 text-customGrey">Author</div>
          <div className="flex">
            <div className="pr-3">
              <Avatar author={authorName} size={28} />
            </div>
            <div className="text-lg md:text-xl font-bold text-white">{authorName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
