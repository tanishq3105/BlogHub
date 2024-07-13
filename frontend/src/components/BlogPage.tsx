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
    <div className="flex h-full ml-5">
      <div className="w-3/5 pt-4 mx-32">
        <div className="font-bold text-4xl pt-3 text-customDarkBlue">
         {title}
        </div>
        <div className="text-sm text-slate-500 pt-2">
          {publishedDate}
        </div>
        <div className="pt-3 text-xl text-white">
          {content}
        </div>
      </div>

      <div className="w-1/5 p-4">
        <div>
          <div className="text-l pb-4 text-customGrey">Author</div>
          <div className="flex">
            <div className="pr-3">
              <Avatar author={authorName} size={28} />
            </div>

            <div className="text-xl font-bold text-white">{authorName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
