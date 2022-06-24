import {Component} from "react";

class FdList extends Component {

    render() {
        const {inputBoxes} = this.props;
        return (
          <div className="mb-5 mt-2 ms-2">
              <h5>Current Functional Dependencies:</h5>
              <ol>
              {inputBoxes.map(input => {
                  const dep = input.dependency
                  if (dep !== undefined) {
                      return dep.map((d, i) => {
                          if (d.length > 0)
                              return <li key={i}>{d.toString().replaceAll(',', ', ') + ' --> ' + input.value}</li>
                          return ''
                      })
                  } else {
                      return ''
                  }
              })}
              </ol>
          </div>
        );
    }
}

export default FdList