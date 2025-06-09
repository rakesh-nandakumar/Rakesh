import Image from "next/image";

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
  ...props
}) {
  // Generate better alt text if not provided
  const optimizedAlt =
    alt || `Image for ${src.split("/").pop()?.split(".")[0] || "content"}`;

  return (
    <Image
      src={src}
      alt={optimizedAlt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{
        objectFit: "cover",
        ...props.style,
      }}
      {...props}
    />
  );
}
