import { getTechnologies } from "@/lib/supabaseDataService";
import SkillsSectionClient from "./SkillsSectionClient";

const SkillsSection = async () => {
  // Fetch technologies data from Supabase
  const technologiesData = await getTechnologies();

  return <SkillsSectionClient technologiesData={technologiesData} />;
};

export default SkillsSection;
