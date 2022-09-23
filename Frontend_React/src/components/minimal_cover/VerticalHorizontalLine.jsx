import React, {useLayoutEffect, useState} from "react";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const VerticalHorizontalLine = () => {
    const [width, height] = useWindowSize();

    return (
        <>
            {(width >= 880) &&
            <div id='vertical-line' className='vertical-line ms-2 me-2'/>
            }
            {(width < 880) &&
            <hr className='col-sm-12 horizontal-line'/>
            }
        </>
    );
}

export default VerticalHorizontalLine;