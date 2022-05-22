import React from "react";
import "./Die.css";

export default function Die(props){
    const styles = {
        backgroundColor: props.held ? "#59E391" : "#FFFFFF"
    }
    return (
        <div className="die" style={styles} onClick={() => props.holdDice(props.id)}>{props.value}</div>
    )
}