import { Component } from "react";

class InApp extends Component {
    constructor(props) {
        super(props)
    }
    state = {  }
    render() { 
        return (  
            <div>
                <p>{this.props.text}</p>
            </div>
        );
    }
}
 
export default InApp;