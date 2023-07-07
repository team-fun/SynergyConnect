import React from "react";
import { useSelector } from "react-redux";
import cursor from "../resources/icons/selection.svg";

const CursorOverlay = () => {
    const cursors = useSelector((state) => state.cursor.cursors);

    return (
        <>
        { cursors.map((cursorData) => (
            <img
                key={cursorData.userId}
                className="cursor"
                style={{ position: 'absolute', left: cursorData.x, top: cursorData.y, width: "30px" }}
                src={cursor}
                alt="cursor"
            />
        ))}
    </>
    );
};

export default CursorOverlay;