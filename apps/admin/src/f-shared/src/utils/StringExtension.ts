declare global {
  interface String {
    format(...replacements: Array<string | number>): string;
  }
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
  };
}

export {};
