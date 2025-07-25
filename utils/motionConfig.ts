
export const fadeInUp = {
    hidden:{opacity:0,y:40},
    show:{opacity:1,y:0,transition:{duration:0.3}}
}

export const fadeInRight = {
    hidden:{opacity:0,x:60},
    show:{opacity:1,x:0,transition:{duration:0.3}}
}

export const fadeInParent = {
    hidden:{},
    show:{
        transition:{
            delayChildren:0.2,
            staggerChildren:0.3
        }
    }
}