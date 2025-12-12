import { getAbout } from "@/lib/supabaseDataService";
import HeroSectionClient from "./HeroSectionClient";

export default async function HeroSection() {
  // Fetch about data from Supabase
  const aboutData = await getAbout();

  return <HeroSectionClient aboutData={aboutData} />;
}
