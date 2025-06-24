import axios from "axios";
async function getTodo(){
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    return response.data;
}
export default async function todo(){
    const todo = await getTodo();
    console.log("todo",todo)
    return <div>
        hello this is todo
        <div>
            {todo.map((t: any)=>(
                <Todo title={t.title} completed={t.completed}></Todo>
            ))}
        </div>
        </div>
}
function Todo({title, completed}:{title: string, completed: boolean}){
    return <div className="flex bg-yellow-300 text-2xl ">
        <div>
            {title}
        </div>
        <div>---</div>
        <div>
            {completed? "DONE": "NOT DONE"}
        </div>
    </div>
}