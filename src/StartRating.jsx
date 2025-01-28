import React, { useState } from "react";
const containerStyle= {
    display:'flex',
    alignItems:"center",
    gap:'16px'
};
const starContainer={
    display:'flex',
    gap:'4',    
}

export default function StartRating({
    maxRating= 5,
    color='#fcc419', 
    size=48, 
    messages=[],
    defaultRating=0,
    }){ 
    const [rating, setRating]= useState(defaultRating);
    const [temRating, setTemRating]= useState(0);
    const handleRating= (rating)=>{
        setRating(rating)
    } 
    const textStyle={
        lineHeight:'1',
        margin:'0',
        color,
        fontSize:`${size/1.5}px`   
    
    } 
    return(
        <div style={containerStyle}>
            <div style={starContainer}>
                {Array.from({length:maxRating}, (_, i)=>(
                    <Star key={i} color={color} size={size} onRating={()=> handleRating(i + 1)} onHoverIn={()=>setTemRating(i + 1)} onHoverOut={()=>setTemRating(0) } full={temRating ? temRating>= i+1 : rating >= i + 1} />
                ))}
            </div>
        <p style={textStyle}>{messages.length===maxRating? messages[temRating? temRating-1: rating-1]: temRating || rating|| ''}</p>
        </div>
    )
}

function Star({onRating,full,onHoverIn,onHoverOut,color,size,}){
    const startStyle= {
        width:`${size}`,
        height:`${size}`,
        display:"block",
        cursor:"pointer",
    };
    return(
        <span style={startStyle} onClick={onRating} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
          {full?<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z" fill={color}/>
</svg>: 
<svg viewBox="0 0 62 64" width="40px" height="40px" fill={color} xmlns="http://www.w3.org/2000/svg"><path d="m62 26-22-2-8-22-8 22-22 2 18 14-6 22 18-14 18 14-6-22zm-15.508 30.738-13.264-10.317-1.228-.955-1.228.955-13.264 10.317 4.421-16.211.351-1.287-1.052-.818-13.999-10.889 16.953-1.541 1.265-.115.434-1.193 6.119-16.832 6.121 16.831.434 1.193 1.265.115 16.953 1.541-14 10.889-1.053.819.351 1.287z"/></svg>}
        </span>
    )
}