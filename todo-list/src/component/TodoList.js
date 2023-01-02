import React, { useState } from 'react'
import TodoCompo from './TodoCompo';
import { nanoid } from 'nanoid';
import './Todo.css'

function TodoList() {

    const [Query, setQuery] = useState("");

    const [add, setAdd] = useState([]);

    const handleQuery = (query) => {

        setQuery(query.target.value);

    }

    const addQuery = (query) => {
        const payload = {
            title: Query,
            status: false,
            id: nanoid(5)
        };

        let newTask = [...add, payload];
        setAdd(newTask);
    }

    const handleStatus = (id) => {
        setAdd(
            add.map((e) => (e.id === id) ? { ...e, status: !e.status } : e)
        );
    }

    const remove = (id) => {
        console.log(id);

        setAdd(
            add.filter((e) => e.id!==id)
        );
    }


    return (
        <>
            <div className="card">
                <h1>Todo List !!</h1>
                <input className="form-control" type="text" placeholder="enter your list item here ..." onChange={handleQuery} value={Query} />
                <button type="button" className="btn btn-dark" onClick={addQuery}>Add</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#Id</th>
                            <th scope="col">Work</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {add.map((item) => {
                            return <TodoCompo color={"red"} item={item.title} status={item.status} id={item.id}
                                handleStatus={handleStatus} remove={remove} />;
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TodoList
