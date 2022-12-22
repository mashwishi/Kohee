import React from "react";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category: string = "Category"): (action: string, label: string) => void => {
  const eventTracker = (action: string = "Action", label: string = "Label") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;
