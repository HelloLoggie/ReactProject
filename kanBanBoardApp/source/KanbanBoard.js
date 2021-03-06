import React,{Component} from 'react';
import PropTypes from 'prop-types';
import List from './List';

class KanbanBoard extends Component{
    render(){
        return (
            <div className="app">
                <List id="to-do" title="To Do" taskCallbacks={this.props.taskCallbacks}
                      cards={this.props.cards.filter((card)=>card.status === "todo")}/>
                <List id="in-progress" title="In Progress" taskCallbacks={this.props.taskCallbacks}
                      cards={this.props.cards.filter((card)=>card.status === "in-progress")}/>
                <List id="done" title="Done" taskCallbacks={this.props.taskCallbacks}
                      cards={this.props.cards.filter((card)=>card.status === "done")}/>
            </div>
        );
    }
}
//propTypes校验器
KanbanBoard.propTypes = {cards:PropTypes.arrayOf(PropTypes.object),
                         taskCallbacks: PropTypes.object};
export default KanbanBoard;