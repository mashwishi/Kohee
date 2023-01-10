
const LoadingText = () => {
    return (
        <>
            <div className="animate-pulse flex space-x-4 w-12 py-4">
                <div className="flex">
                    <div className="h-2 w-2 bg-slate-700 mr-1 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-slate-700 mr-1 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-slate-700 mr-1 rounded-full"></div>
                </div>
            </div>
        </>
    );
};

export default LoadingText;
