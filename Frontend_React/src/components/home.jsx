import '../assets/css/home.css';
import {NavLink} from "react-router-dom";

function Home() {
    return (
        <div className='home'>
            <div className='pt-5 project-title text-center'>
                <h4 className='title'>Normalization Convertor and SQL Schema Generator <br/> (NC SSG)</h4>
            </div>
            <div className='intro row col-12 mt-5'>
                <div className="col-lg-6">
                    <div className='ms-5 mb-5 usage2'>
                        <div className="intro-header">
                            <h4>The New Way to Learn <br/> Normalization and Generate SQL Schema </h4>
                        </div>
                        <div className="intro-body">
                            <p className=''>
                                This tool provides you a step by step guide to normalize your logical schema
                                even without data. It can be used to generate SQL schema with mere a single click.
                                DB engineers can now use this tool to speed up their process of making DB architecture
                                by normalizing it.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="usage ms-5">
                        <div className="usage-title">
                            <h4>How to use app</h4>
                        </div>
                        <div className="usage-body ">
                            <p className=''>
                                This tool provides you with two choices of entering your data. You may upload your File
                                or use toolBox to get started with this tool. After setting your constraints you can
                                click on your desired level of Normalization form till BCNF. You can also generate SQL
                                schema and import it in your database. <br/>
                                It is super easy to do. Let's try:
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='drawing-tool text-center'>
                {/*<button className='btn btn-lg btn-primary'>*/}
                <NavLink className="btn btn-outline-secondary p-2 proceedbtn" to="/NC-SSG/DrawingTool">
                    Proceed to Drawing Tool
                </NavLink>
                {/*</button>*/}
            </div>
        </div>
    )
}

export default Home;