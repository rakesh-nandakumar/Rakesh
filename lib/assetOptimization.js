/**
 * Server-safe utilities for asset optimization
 * Can be imported in Server Components
 */

/**
 * Get Supabase preconnect links for server-side rendering
 * Returns JSX elements to be placed in <head>
 */
export function getSupabasePreconnectLinks() {
  const supabaseOrigin = "https://evgqbzyytamqezwdymkb.supabase.co";

  return (
    <>
      <link rel="preconnect" href={supabaseOrigin} crossOrigin="anonymous" />
      <link rel="dns-prefetch" href={supabaseOrigin} />
    </>
  );
}
