import React from 'react';
import ReactDom from 'react-dom';
//import KanbanBoard from './KanbanBoard';
import KanbanBoardContainer from './KanbanBoardContainer'

let cardsList = [
    {
        id : 1,
        title : "Read the book",
        description : "I should read the **whole** book",
        color: '#BD8D31',
        status : "in-progress",
        tasks : []
    },
    {
        id : 2,
        title : "Write some code",
        /*处理Markdown格式*/
        description : "Code along with the samples in the book.The complete sources" +
        "can be found at {github} (https://github.com/pro-react)",
        color: '#3A7E28',
        status : "todo",
        tasks : [
            {
                id : 1,
                name : "ContactList Example",
                done : true
            },{
                id : 2,
                name : "Kanban Example",
                done : false
            },{
                id : 3,
                name : "My own experiments",
                done : false
            },
        ]
    },
];

//ReactDom.render(<KanbanBoard cards={cardsList} />,document.getElementById('root'));
ReactDom.render(<KanbanBoardContainer />,document.getElementById('root'));
