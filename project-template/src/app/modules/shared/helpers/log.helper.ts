const log =
  (func: (message?: any, ...optionalParams: any[]) => void) =>
  (message: string, ...attributes: any[]) => {
    if (!attributes || attributes.length === 0) {
      func(message);
    } else {
      func(message, attributes);
    }
  };
const logDebug = log(console.debug);
const logError = log(console.error);
const logWarn = log(console.warn);
export { logDebug, logWarn, logError };
