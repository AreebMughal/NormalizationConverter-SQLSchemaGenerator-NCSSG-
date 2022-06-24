
export const Form = () => {

    const submitForm = (e) => {
        e.preventDefault();
        console.log(e.target[0])
    }
    return (
        <form onSubmit={submitForm} className='container'>
            <input type="text"  className='' name='email' id='email'/> <br/>
            <input type="text" name='name' id='s'/> <br/>
            <input type="submit" name="submit" id="submit" value='Submit'/>
        </form>
    );
}