import React from "react";

export default function Button({buttonName}) {
    return(
        <button onClick={() => alert("share popup opened")}>{buttonName}</button>
    )
}