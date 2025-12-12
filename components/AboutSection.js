import { getAbout } from "@/lib/supabaseDataService";
import AboutSectionClient from "./AboutSectionClient";

export default async function AboutSection() {
  // Fetch about data from Supabase
  const aboutData = await getAbout();

  return <AboutSectionClient aboutData={aboutData} />;
}
