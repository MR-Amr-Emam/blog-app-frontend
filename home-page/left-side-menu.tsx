import { useGetPokemonByNameQuery, pokemonApi } from '@/state-manage/users-query'
import { useEffect, useRef } from 'react'

export function LeftSideMenu(){
    const ref = useRef(null);
    const [ trigger, result, lastPromisedInfo ] = pokemonApi.endpoints.getPokemonByName.useLazyQuery()
    useEffect(()=>{
        const func = ()=>{trigger("pokemon", true)}
        if(ref.current){
            var ele = ref.current as HTMLElement;
            ele.addEventListener("click", func)
        }
        return ()=>{ele.removeEventListener("click", func)}
    })
    return(
        <div className="bg-light text-dark myp-3 myfs h-100 w-90 position-relative">
            <div className="text-center" ref={ref}>RTK-Query TEST!!!</div>
            <div>
                {result.currentData?.count}
            </div>
        </div>
    )
}

/*
cpp problem solving - reading the FUCKING book

may UPDATE work ya RAB
*/