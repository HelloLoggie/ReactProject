import React, {Component} from 'react';
import ReactDom from 'react-dom';
class Hello extends Component{
    render(){
        return(
            <h1>Hello World</h1>
        )
    }
}
ReactDom.render(<Hello />,document.getElementById('root'));