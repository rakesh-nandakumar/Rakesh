import { getHeader, getSiteConfig } from "@/lib/supabaseDataService";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  // Fetch header and site config data from Supabase
  const [headerData, siteConfig] = await Promise.all([
    getHeader(),
    getSiteConfig()
  ]);

  return <HeaderClient headerData={headerData} siteConfig={siteConfig} />;
}
