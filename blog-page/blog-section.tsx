import style from "./blog-page.module.css"

interface Props{
    image:string,
    paragraph:string,
}

export function BlogSection(props:Props){
    return(
        <div className={`mt-4 text-dark myfs row ${style["blog-section"]}`}>
            <div className="col-8">{props.paragraph}</div>
            <div className="col-4"><img src={props.image} className="w-100"></img></div>
        </div>
    )
}

