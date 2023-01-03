import React, { useEffect, useState } from 'react'
import TodoCompo from './TodoCompo';
import './Todo.css'

function TodoList() {

    const [Query, setQuery] = useState("");

    const [add, setAdd] = useState([]);

    // for pagination 
    const [page, setPage] = useState(1);


    const handleQuery = (query) => {

        setQuery(query.target.value);

    }

    useEffect(() => {


        getData();

    }, [page]);



    async function getData() {
        const data = await fetch(`http://localhost:8080/posts?_page=${page}&_limit=4`)
            .then((e) => e.json());

        setAdd(data)
    }

    const addQuery = (query) => {
        const payload = {
            title: Query,
            status: false,
            // id: nanoid(5)
        };

        // let newTask = [...add, payload];
        // setAdd(newTask);

        fetch(" http://localhost:8080/posts", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(() => { getData() });

    }




    const handleStatus = (id) => {

        setAdd(
            add.map((e) => (e.id === id) ? { ...e, status: !e.status } : e)
        );
    }

    const remove = (id) => {
        fetch(`http://localhost:8080/posts/${id}`, {
            method: 'DELETE',

        }).then(() => { getData() });
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
                <button type="button" onClick={() => {
                    if (page == 1) return
                    setPage(page - 1)
                }} className="btn btn-success">Prev</button>
                <br />
                <button type="button" onClick={() => {
                    //    logic for button disable internally 
                    if (add.length == 0) return
                    setPage(page + 1)
                }} className="btn btn-success">Next</button>


            </div>
        </>
    )
}

export default TodoList
