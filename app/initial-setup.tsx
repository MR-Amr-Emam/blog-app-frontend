import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setUserData } from "@/state-manage/user-slice"
import { useGetUserQuery } from "@/state-manage/users-query";


export function InitialSetup(){
    const dispatch = useDispatch();
    const {data, isSuccess} = useGetUserQuery(0);
    useEffect(()=>{
        isSuccess && dispatch(setUserData(data));
    })
    return <></>
}