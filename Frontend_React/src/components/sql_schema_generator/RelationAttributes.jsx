import AttributeTableHeader from "./AttributeTableHeader";
import AttributeRow from "./AttributeRow";

const RelationAttributes = (props) => {
    return (
        <AttributeTableHeader>
            <tbody>
            {props.attributes !== undefined && props.attributes.map((attribute, index) => {
                return (
                    <AttributeRow
                        key={index}
                        attribute={attribute}
                        index={index}
                        relIndex={props.relIndex}
                        onChangeHandler={props.onChangeHandler}
                    />
                );
            })}

            </tbody>
        </AttributeTableHeader>
    );
}

export default RelationAttributes;