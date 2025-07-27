import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

import { BACKEND_DOMAIN } from "./functions";
import { PageBody } from "./page-body";


export default async function Home() {
  var userCookies = await cookies();

  var response = await fetch(BACKEND_DOMAIN+"/auth/user-info/0/", {
    credentials:"include",
    headers:{
      "Cookie": `access_token=${userCookies.get("access_token")?.value}`
    }})

  if(response.ok){
    return (<PageBody />);
  }else{
    redirect("/login/");
  }


}

