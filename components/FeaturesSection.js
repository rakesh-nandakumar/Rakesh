import { getServices } from "@/lib/supabaseDataService";
import FeaturesSectionClient from "./FeaturesSectionClient";

export default async function FeaturesSection() {
  // Fetch services data from Supabase
  const servicesData = await getServices();

  return <FeaturesSectionClient servicesData={servicesData} />;
}
