import React,{Component} from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
//添加头信息，确保服务器正确的响应请求
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'react-data-test'
};

//创建新的容器来获取动态数据
class KanbanBoardContainer extends Component{
    constructor(){
        super();
        this.state ={
            cards:[]
        };
    }

    componentDidMount(){
        fetch(API_URL+'/cards',{headers:API_HEADERS})
            .then((response)=>response.json())
            .then((responseData)=>{
            this.setState({cards:responseData});
            })
            .catch((error)=>{
            console.log('Error fetching and parsing data',error);
            });
    }

    addTask(cardId,taskName){
        //保存之前的状态，在响应失败时回滚到之前的状态
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        //使用已给name和临时id创建一个新的任务
        let newTask = {id:Date.now(),name:taskName,done:false};
        //创建一个新的对象并将新任务添加到任务数组中
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{$push:[newTask]}
            }
        })

        this.setState({cards:nextState})

        //调用api在服务器上添加新任务
        fetch(`${API_URL}/cards/${cardId}/tasks`,{
            method:'post',
            headers: API_HEADERS,
            body:JSON.stringify(newTask)
        })
            .then((response)=>{
            if(response.ok) {
                return response.json()
            }else{
                throw new Error("Server response failed")
            }
            })
            .then((responseData)=>{
                newTask.id = responseData.id
                this.setState({cards:nextState})
            })
            .catch((error)=>{
            this.setState(prevState);
            });
    }
    //通过ID来查找需要的卡片的索引，通过不变性助手来创建一个不包含被删除任务的新可变对象，
    // 最后调用setState，使用fetch函数来通知服务器有关数据的变化
    deleteTask(cardId,taskId,taskIndex){
        //因为筛选了卡片，所以不能再访问原始索引
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let prevState = this.state;
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{$splice:[[taskIndex,1]]}
            }
        });
        this.setState({cards:nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
            method:'delete',
            headers: API_HEADERS
        })
            .then((response)=>{
            if(!response.ok){
                throw new Error("server response failed");
            }
            })
            .catch((error)=>{
            console.log("fetch error:",error);
            this.setState({prevState});
            });
    }
    toggleTask(cardId,taskId,taskIndex){
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let newDoneValue;
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{
                    done:{
                        $apply:(done)=>{
                            newDoneValue = !done
                            return newDoneValue
                        }
                    }
                }
            }
        });
        this.setState({cards:nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
            method:'put',
            headers: API_HEADERS,
            body:JSON.stringify({done:newDoneValue})
        })
            .then((response)=>{
            if(!response.ok){
                throw new Error("server response failed");
            }
            })
            .catch((error)=>{
            console.log("fetch error:",error);
            this.setState(prevState);
            });
    }
    render(){
        return <KanbanBoard cards={this.state.cards}
                             taskCallbacks={{
                                 toggle: this.toggleTask.bind(this),
                                 delete: this.deleteTask.bind(this),
                                 add:this.addTask.bind(this)
                             }}/>
    }
}
export default KanbanBoardContainer;