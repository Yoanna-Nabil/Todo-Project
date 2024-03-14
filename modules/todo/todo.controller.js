import { todoModel } from "../../db/todo.models.js";

export const newTodo= async (req,res) => {
    let todo= req.body;
    todo.userId=  req.newId;
    try{
        let newTodos= await todoModel.create(todo);
        res.json({message: 'Done', data: newTodos});
    }catch(err){
        res.json({message: err.message});
    }
}

export const updatedTodo= async(req, res) => {
    let {title}= req.body;
    let {id}= req.params;
    try{
        let theTodoAfterEdit= await todoModel.findByIdAndUpdate(id, {title}, {new:true});
        res.json({message: 'todo was edit successfully', todo: theTodoAfterEdit});
    }catch(err){
        res.json({message: err.message});
    }
}

export const deletedTodo= async(req, res) => {
    let {id}= req.params;
    try{
        let theTodoDeleted= await todoModel.findByIdAndDelete(id);
        res.json({message: 'todo was delete successfully', user: theTodoDeleted});
    }catch(err){
        res.json({message: err.message});
    }
}