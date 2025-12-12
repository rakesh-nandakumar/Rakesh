import { getGallery } from "@/lib/supabaseDataService";
import GallerySectionClient from "./GallerySectionClient";

const GallerySection = async () => {
  // Fetch gallery data from Supabase
  const galleryData = await getGallery();

  return <GallerySectionClient galleryData={galleryData} />;
};

export default GallerySection;
