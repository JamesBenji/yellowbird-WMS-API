export function generateNamedId(prefix: string) {
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const sequence = Math.floor(Math.random() * 9999) + 1000;
    return `${prefix.toUpperCase()}-${timestamp}-${sequence}`;
  }