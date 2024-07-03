export const containsBase64EncodedString = (fileContents: string): boolean => {
  const base64Pattern = /data:image\/png;base64/gi;
  return base64Pattern.test(fileContents);
};
