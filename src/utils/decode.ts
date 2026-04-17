export const decodeBase64 = (str: string): string => {
    const bytes = Uint8Array.from(atob(str), c => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  };
  