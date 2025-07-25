import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "@/state-manage/user-slice"
import { useGetUserQuery } from "@/state-manage/users-query";

import { User } from "@/state-manage/user-slice"

export function InitialSetup(){
    const dispatch = useDispatch();
    const {data, isSuccess} = useGetUserQuery(0);
    useEffect(()=>{
        isSuccess && dispatch(setUserData(data));
    })
    return <></>
}