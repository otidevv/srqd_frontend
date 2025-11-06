/**
 * Tenant detection utilities
 * Detects the current tenant from subdomain or query parameter
 */

/**
 * Extract tenant ID from hostname
 * Examples:
 * - milgras.peruedu.com -> "milgras"
 * - santarosa.peruedu.com -> "santarosa"
 * - milgras.localhost -> "milgras" (local development with hosts file)
 * - localhost -> "default" (for development)
 * - www.peruedu.com -> "default"
 */
export function extractTenantFromHostname(hostname: string): string {
  // Development: plain localhost
  if (hostname === "localhost" || hostname.startsWith("127.0.0.1")) {
    return "default";
  }

  const parts = hostname.split(".");

  // Development: Check for .localhost setup (e.g., milgras.localhost)
  if (hostname.endsWith('.localhost') && parts.length === 2) {
    return parts[0]; // Return subdomain part (e.g., "milgras")
  }

  // Production: extract subdomain from full domain
  // If hostname is www.peruedu.com or peruedu.com -> default
  if (parts.length < 3 || parts[0] === "www") {
    return "default";
  }

  // Return the subdomain (first part)
  return parts[0];
}

/**
 * Get tenant ID from query parameter
 * Useful for development: localhost:5174?tenant=milgras
 */
export function extractTenantFromQuery(): string | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  return params.get("tenant");
}

/**
 * Detect the current tenant
 * Priority:
 * 1. Query parameter (?tenant=milgras) - for development
 * 2. Subdomain extraction
 * 3. Default tenant
 */
export function detectCurrentTenant(): string {
  // Try query parameter first (development mode)
  const queryTenant = extractTenantFromQuery();
  if (queryTenant) {
    return queryTenant;
  }

  // Extract from hostname
  if (typeof window === "undefined") {
    return "default";
  }

  return extractTenantFromHostname(window.location.hostname);
}

/**
 * Check if we're in development mode (localhost)
 */
export function isDevelopmentMode(): boolean {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;
  return hostname === "localhost" || hostname.startsWith("127.0.0.1");
}
