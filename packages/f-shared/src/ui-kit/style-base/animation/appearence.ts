export const appearenceTopToBottom = {
    initial: { opacity: 0, y: '-10px' },
    animate: { opacity: 1, y: '0px' },
    exit: { opacity: 0, y: '10px' },
    transition: { bounce: 0 },
};

export const appearenceByHeight = {
    initial: { opacity: 0, height: '0px' },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: '0px' },
    transition: { bounce: 0 },
};

export const appearenceByScale = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { bounce: 0 },
};

export const appearenceOpacity = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { bounce: 0 },
};