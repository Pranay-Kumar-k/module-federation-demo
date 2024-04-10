import React from "react";
const ShareButton = React.lazy(() => import("Button/Button"))

export default function App() {
    return(
        <div>Consumer App
            <ShareButton buttonName={"share popup"} />
        </div>
    )
}