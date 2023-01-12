import Image from "next/image";

const LoadingPage = () => {

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-5 min-w-screen">
        <div className="flex space-x-2 animate-pulse">
            {/* <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div> */}
            <div className="animate-bounce">
              <Image src="/bean.png"  width="80" height="65"  alt="kohee" priority/>
            </div>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
