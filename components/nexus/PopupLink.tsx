import Link from "next/link";
import { useState } from "react";

type PopupLink = {
  label: string;
  repoLink: string;
};


const PopupLink = (props: PopupLink) => {

  const [showFooterPopup, setShowFooterPopup] = useState(true);

  return (
    <>
    <div className={showFooterPopup ? `fixed inset-x-0 bottom-0` : `hidden fixed inset-x-0 bottom-0`}>
      <div className="alert shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <h3 className="font-bold">Hello there!</h3>
            <div className="text-xs">{props.label}</div>
          </div>
        </div>
        <div className="flex-none">
          <Link href={props.repoLink}>
            <button className="btn btn-primary btn-sm">View on Ko-fi &rarr;</button>
          </Link>
          <button className="btn btn-error btn-sm" onClick={() => setShowFooterPopup(false)}>X</button>
        </div>
      </div>
    </div>
    </>
  );

};

export default PopupLink;
