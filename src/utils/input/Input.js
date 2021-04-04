import React, {Component} from 'react';

class Input extends Component {
  render() {
    return (
        <div className="ui input">
          <input onChange={(event)=> this.props.setValue(event.target.value)}
                 value={this.props.value}
                 type={this.props.type}
                 placeholder={this.props.placeholder}/>
        </div>
    );
  }
}

export default Input;
