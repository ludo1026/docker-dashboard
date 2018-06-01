function replaceTerminalCharacters(txt) {
  if(!txt || !txt.replace) return txt;
  return txt.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}