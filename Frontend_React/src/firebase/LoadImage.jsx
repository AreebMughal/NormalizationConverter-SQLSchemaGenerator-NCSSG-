import {useEffect, useState} from "react";
import {getDownloadURL, ref} from "firebase/storage";
import {firebaseStorage} from "./connectFirebase";
import '../components/relational_mapping/LoadImage.css';

const LoadImage = () => {
    const [url, seturl] = useState();

    useEffect(() => {
        const func = async () => {
            // const storage = getStorage();
            const reference = ref(firebaseStorage, '/sdfsd.png');
            await getDownloadURL(reference).then((x) => {
                seturl(x);
                console.log(x);
            })
        }
        func();
    }, []);

    return (
        <>
            <img src={url} alt={'not found'} className='image'/>
        </>
    );
}

export default LoadImage;