import CollapseDiv from "../../div_collapse/CollapseDiv";

const Suggestion = (props) => {
    return (
        <CollapseDiv
            cardTitle={'Suggestions:'}
            isOpen={props.isOpen}
        >
            {props.suggestion}
        </CollapseDiv>
    );
}

export default Suggestion;