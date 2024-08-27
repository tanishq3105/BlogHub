import { useEffect, useState } from "react";

import { Appbar } from "./Appbar";
import { CreatePostType } from "@basicdev04/common-app";
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import { Thumbnail } from "./Thumbnail";

export const Create = () => {
  const [inputs, setInputs] = useState<CreatePostType>({
    title: "",
    content: "",
  });

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setInputs((c) => ({
          ...c,
          content: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  const [isHidden, setIsHidden] = useState(true);

  const HandleClick = async () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <div className="relative">
      <div
  className={`transition-all duration-300 transform ${
    !isHidden ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
  } relative z-50`}
>
  <Thumbnail reset={!isHidden} inputs={inputs} />
  {!isHidden && (
    <button
      className="absolute top-6 right-6 text-white h-auto w-auto flex items-center justify-center text-2xl font-bold rounded-md z-50 text-customGrey bg-customDarkBlue px-2"
      onClick={HandleClick}
    >
      &times;
    </button>
  )}
</div>

        <div className={`absolute inset-0 z-0 ${!isHidden ? 'pointer-events-none opacity-50' : ''}`}>
          <Appbar />
          <div className="mx-4 md:mx-16 lg:mx-32">
            <div className="flex items-center mb-4">
              <div className="border-l-4 border-gray-300 h-12 mr-4"></div>
              <input
                type="text"
                placeholder="Title"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl border-none outline-none w-full bg-customDark text-customDarkBlue"
                onChange={(e) => {
                  setInputs((c) => ({
                    ...c,
                    title: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-thin">
              <div style={{ height: '70vh' }} className="text-customGrey">
                <div ref={quillRef} />
              </div>
            </div>
            <div>
              <div className="fixed bottom-0 right-0 m-4 flex space-x-4">
                <button
                  className="px-2 py-1 sm:px-4 sm:py-2 border border-customBlue hover:bg-customDarkBlue text-white rounded-md"
                  onClick={HandleClick}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
