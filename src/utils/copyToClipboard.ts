const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator?.clipboard !== undefined) {
    await navigator.clipboard.writeText(text);

    return true;
  }

  return document.execCommand('copy', true, text);
};

export default copyToClipboard;
