import React from 'react';
import { Link } from "react-router-dom";

export default function NotFound(){
    return <div className="flex flex-col gap-2">
            808s Not Found <br />
            <Link to="/">Home</Link>
            {/* <a href="/">Home</a> */}
        </div>
     
}