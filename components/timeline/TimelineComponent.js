import { getTimeline } from "@/lib/supabaseDataService";
import TimelineComponentClient from "./TimelineComponentClient";

const TimelineComponent = async () => {
  // Fetch timeline data from Supabase
  const timelineData = await getTimeline();

  return <TimelineComponentClient timelineData={timelineData} />;
};

export default TimelineComponent;
