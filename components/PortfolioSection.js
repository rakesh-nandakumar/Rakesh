import { getPortfolio } from "@/lib/supabaseDataService";
import PortfolioSectionClient from "./PortfolioSectionClient";

export default async function PortfolioSection() {
  // Fetch portfolio data from Supabase
  const portfolioData = await getPortfolio();

  return <PortfolioSectionClient portfolioData={portfolioData} />;
}
