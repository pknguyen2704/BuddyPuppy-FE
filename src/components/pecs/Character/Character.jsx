import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./Character.css";

export function DroppableCharacter(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <img
            ref={setNodeRef}
            src={props.src}
            alt="character"
            style={{
                width: props.width || "150px",
                height: props.height || "150px",
                objectFit: "contain",
                position: "absolute", // nếu bạn cần định vị
                ...props.style,
            }}
        />
    );
}
