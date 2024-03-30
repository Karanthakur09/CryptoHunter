import React from 'react'

function SelectButton({ children, selected, onClick }) {
    return (
        <span onClick={onClick} style={{
            border: "1px solid gold",
            borderRadius: 5,
            padding: 5,
            paddingLeft: 7,
            paddingRight: 7,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "gold",
                color: "black",
            },
            width: "22%",
        }}>
            {children}
        </span >
    )
}

export default SelectButton