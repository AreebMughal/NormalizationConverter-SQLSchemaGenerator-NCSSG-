import Bold from "../../components/general_UI/Bold";
import React from "react";

function checkMultiValueAttr(inputBoxes) {
    return inputBoxes.map(inputBox => {
        if (inputBox.multiValue)
            return inputBox.value
        return null
    }).filter(i => i !== null);
}

export const get1nfReason = (inputBoxes) => {
    const multiValuedAttr = checkMultiValueAttr(inputBoxes);
    return ((multiValuedAttr.length === 0) ?
            <p>As there is no multi-value attribute in the relation, so the result of 1-NF would be the same as your
                given relation.</p>
            :
            <p>
                <Bold>Multi-value Attribute</Bold> =>
                {'{'}{multiValuedAttr.toString().replaceAll(',', ', ')}{'}'}. <br/>
                The relation contains multi-valued attribute, so those attributes will become the part of primary key to
                create a composite primary key to make sure that all the tuples are unique.
            </p>
    );
}

function get2nfMultiValued(data, inputBoxes) {
    return ((data['multi'].length > 0) ?
            <span>
                <Bold>Multi-value Attribute</Bold> => {'{'}{checkMultiValueAttr(inputBoxes).toString().replaceAll(',', ', ')}{'}'}. <br/>
                The relation contains multi-valued attributes, so a new relation will be made having composite
                primary key to prevent null values in original relation. <br/>
            </span> : ''
    );
}

function get2nfPartial(partial) {
    return (
        <span>
            As attribute set => <Bold> {'{'}{partial[1].toString().replaceAll(',', ', ')}{'}'} </Bold>
            is <Bold>partially dependent</Bold> on set => <Bold>{'{'}{partial[0].toString().replaceAll(',', ', ')}{'}'}</Bold>. So, this relation would be separated.
        </span>
    );
}

export const get2nfReason = (data, inputBoxes) => {
    let reason = []
    if (Object.keys(data).length > 0) {
        reason.push(get2nfMultiValued(data, inputBoxes))
        reason.push(<><Bold>Partial Dependency</Bold><br/></>)
        if (data.partial.length > 0) {
            for (let i = 0; i < data['partial'].length; i++) {
                reason.push(get2nfPartial(data['partial'][i]))
                reason.push(<br/>)
            }
        } else {
            reason = <span>
                    No partial dependency in the relation, so relation would be the same.
                </span>
        }
    }
    return (<p>{reason}</p>);
}

function get3nfTransitive(transitive) {
    return (
        <span>
            3rd-NF works on transitive dependency. As attribute set => <Bold>{'{'}{transitive[1].toString().replaceAll(',', ', ')}{'}'}</Bold> is <Bold>transitive dependent</Bold> on
            set => <Bold>{'{'}{transitive[0].toString().replaceAll(',', ', ')}{'}'}</Bold>. So, it would be separated as new relation.
        </span>
    );
}

export const get3nfReason = (data) => {
    let reason = []
    if (Object.keys(data).length > 0) {
        if (data['transitive'].length > 0) {
            for (let i = 0; i < data['transitive'].length; i++) {
                reason.push(get3nfTransitive(data['transitive'][i]))
                reason.push(<br/>)
            }
        } else {
            reason = <span>
                    As there is no transitive dependency in the relation, so the 3rd-NF will be the same as the result of 2-NF.
                </span>
        }
    }

    return (
        <p>{reason}</p>
    );
}

function getBcNFDependency(primeDep) {
    return (
        <span>
            BC-NF works on Primary key dependency. As attribute set => <Bold>{'{'}{primeDep[1].toString().replaceAll(',', ', ')}{'}'}</Bold> is <Bold>dependent</Bold> on
            set => <Bold>{'{'}{primeDep[0].toString().replaceAll(',', ', ')}{'}'}</Bold>. So, it would be separated as new relation.
        </span>
    );
}

export const getBcnfReason = (data) => {
    let reason = []
    if (Object.keys(data).length > 0) {
        if (data['primeDep'].length > 0) {
            for (let i = 0; i < data['primeDep'].length; i++) {
                reason.push(getBcNFDependency(data['primeDep'][i]))
                reason.push(<br/>)
            }
        } else {
            reason = <span>
                    As Primary key does not depend on any other attribute, so the BC-NF will be the same as the result of 3rd-NF.
                </span>
        }
    }


    return (
        <p>{reason}</p>
    );
}