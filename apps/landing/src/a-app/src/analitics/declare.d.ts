declare global {
    type fbq = (...args: unknown[]) => void;

    // eslint-disable-next-line no-var
    var fbq: fbq | undefined;
}

export { };