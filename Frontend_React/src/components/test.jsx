import React from 'react'
const Test = () => {
    const ref1 = React.createRef()
    const ref2 = React.createRef()

    const print = (e, index) => {
        console.log(ref1)
        console.log(ref1.current.innerHTML)
        // console.log(ref2)
    }
    return (
        <>
            {
                [1, 2, 3].map((val, index) =>
                    <p key={index} ref={ref1}>foo - {val}</p>
                )
            }
            <p ref={ref2}>bar</p>
            <button onClick={(e) => print(e, 1)}>Print</button>
        </>
    )
}

export default Test;