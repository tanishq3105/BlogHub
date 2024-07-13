
export const Landing = () => {
 

    return (
        <>
            <div className="items-center pt-5 px-5 sm:px-8 md:flex md:justify-between md:items-center bg-customDarkD ">
                <div className="flex justify-center md:justify-start">
                    <div className="text-2xl font-bold text-customBlue">
                        Blog Hub
                    </div>
                </div>
                <div className='flex flex-col justify-center pb-1'>
                <a href="/signup" className="px-8 py-2.5 w-full hover:bg-customDarkBlue border border-customBlue text-white text-center rounded-md shadow-md block sm:w-auto invisible md:visible">
                        Sign In
                    </a>
                </div>
            </div>
            
            <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
                <div className="text-center space-y-4">
                    <h1 className="text-white font-bold text-4xl md:text-5xl">
                    Discover, Create, and Share Your Story with 
                         <span className="text-customBlue pl-2"> 
                             Blog Hub
                         </span>
                    </h1>
                    <p className="text-customGrey max-w-xl mx-auto leading-relaxed">
                    Join a vibrant community of storytellers where your voice matters. Unleash your creativity, connect with like-minded individuals, and inspire others through the power of blogging.
                    </p>
                </div>
                <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                    <a href="/signup" className="px-10 py-3.5 w-full bg-customBlue text-black text-center rounded-md shadow-md block sm:w-auto">
                        Get started
                    </a>
                    <a href="/signin" className="px-10 py-3.5 border border-customBlue w-full text-white text-center border rounded-md duration-300 hover:bg-customDarkBlue hover:shadow block sm:w-auto">
                        Sign In
                    </a>
                </div>
            </section>
        </>
    )
}
