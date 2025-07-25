import { useEffect, useRef } from 'react'

export function LeftSideMenu(){
    const ref = useRef(null);
    return(
        <div className="bg-light text-dark myp-3 myfs h-100 w-90 position-relative">
            <div className="text-center" ref={ref}>RTK-Query TEST!!!</div>
        </div>
    )
}

/*
cpp problem solving - reading the FUCKING book

may UPDATE work ya RAB
*/