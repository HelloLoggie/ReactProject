import react,{Component} from 'react';

class FocusText extends Component{
    handleClick() {
        this.refs.myTextInput.focus();
    }
    render(){
        return(
            <div>
                <input type="text" ref="myTextInput"/>
                <input type="button" value="Focus the text input" onClick={this.handleClick.bind(this)}/>
            </div>
        );
    }
}