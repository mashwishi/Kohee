
const LoadingGraph = () => {
    return (
        <>
            {/* <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md"> */}
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100">
                <div className="animate-pulse flex space-x-4 w-12 py-4">
                    <div className="flex">
                        <div className="h-2 w-2 bg-slate-700 mr-1 rounded-full animate-pulse"></div>
                        <div className="h-2 w-2 bg-slate-700 mr-1 rounded-full animate-pulse"></div>
                        <div className="h-2 w-2 bg-slate-700 mr-1 rounded-full"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoadingGraph;
