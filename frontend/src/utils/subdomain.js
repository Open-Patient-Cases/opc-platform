export function getSubdomain() {
    const host = window.location.hostname;
    const parts = host.split('.');
    if (parts.length > 1) {
      return parts[0]
    }
    return null; // Return null if no subdomain is present
  }