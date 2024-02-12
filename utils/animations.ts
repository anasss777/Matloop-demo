const fedeInAnimationVariants1 = {
    initial: {
        opacity: 0,
        x: -100,
    },
    animate: () => ({
        opacity: 1,
        x: 0,
        transition: {
        ease: "linear",
        duration: 1,
        delay: 0,
        },
    }),
};
const fedeInAnimationVariants2 = {
    initial: {
        opacity: 0,
        x: 100,
    },
    animate: () => ({
        opacity: 1,
        x: 0,
        transition: {
        ease: "linear",
        duration: 1,
        delay: 0,
        },
    }),
};

const fedeInAnimationVariants3 = {
    initial: {
        opacity: 0,
    },
    animate: () => ({
        opacity: 1,
        transition: {
        ease: "linear",
        duration: 1.5,
        delay: 1,
        },
    }),
};

const fedeInAnimationVariants4 = {
    initial: {
        scale: 0,
    },
    animate: () => ({
        scale: 1,
        transition: {
        ease: "linear",
        duration: 0.5,
        delay: 1,
        },
    }),
};

export {fedeInAnimationVariants1, fedeInAnimationVariants2, fedeInAnimationVariants3, fedeInAnimationVariants4}