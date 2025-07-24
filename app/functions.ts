export function calc_date(date:string):string{
    var diff = Date.now() - Date.parse(date);
    diff = diff/1000/60;
    var state = "min";
    if(diff>60){
        diff/=60;
        state="hr"
    }
    if(diff>24 && state=="hr"){
        diff /=24;
        state = "day";
    }
    if(diff>30 && state=="day"){
        diff/=30;
        state = "month";
    }
    if(diff>12 && state=="month"){
        diff/=12
        state = "year";
    }
    diff = Math.round(diff);
    return diff + " " + state + " ago";
}