
const AttributeTableHeader = (props) => {
    return (
        <div className="table-responsive">
            <table className='table table-responsive-lg caption-top table-bordered align-middle'>
                <caption>List of attributes</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Length</th>
                    <th scope="col">Default</th>
                    <th scope="col">Index</th>
                    <th scope="col" title='Auto-Increment'>A I</th>
                    <th scope="col" title='Auto-Increment'>Null</th>
                </tr>
                </thead>
                {props.children}
            </table>
        </div>
    )
}

export default AttributeTableHeader;