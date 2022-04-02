import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form.js";
import { FormGroup, Card, Elevation, Button } from "@blueprintjs/core";
import { v4 as uuid } from "uuid";
import List from "./list.js";
import Auth from "../auth/auth";
import superagent from 'superagent';
import axios from 'axios';
require('dotenv').config();


import "./todo.css";
const ToDo = () => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

// function  addItem(item){
//     console.log(item);
//     item.id = uuid();
//     item.complete = false;
//     // let data = JSON.parse(item);
    
//     // let config={
//     //   method:'POST',
//     //   baseURL:process.env.REACT_APP_PORT,
//     //   url:`/todo`,
//     //   data:data,
      
//     //        }
      
//     //        axios(config).then(res=>{
      
//     //   let resdata=res.data;
//     //   setList([...list, item]);
//     //        });
//    // superagent.post(`${process.env.REACT_APP_PORT}/signin`)
//    item.complete = false;

//     setList([...list, item]);
//   }
function addItem(item) {
  console.log(item);
  item.id = uuid();
  item.complete = false;
  setList([...list, item]);
}

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
    <Auth >
      <header style={{ width: "1000px", margin: "0 auto" }}>
        <nav
          className="bp3-navbar .modifier "
          style={{ color: "white", backgroundColor: "#008075" }}
        >
          <h1>To Do List Manger: ({incomplete})</h1>
        </nav>
      </header>
      </Auth>
      <div className="div-flex">
      <Auth capability="create" >

        <div className="toDo">
          <Card interactive={true} elevation={Elevation.TWO}>
            <form onSubmit={handleSubmit}>
              <h2>Add To Do Item</h2>
              <FormGroup label="To Do Item" labelFor="text-input">
                <input
                  class="bp3-input .modifier"
                  onChange={handleChange}
                  name="text"
                  type="text"
                  placeholder="Item Details"
                  dir="auto"
                />
              </FormGroup>

              <FormGroup label="Assigned To" labelFor="assignee">
                <input
                  class="bp3-input .modifier"
                  onChange={handleChange}
                  name="assignee"
                  type="text"
                  placeholder="Assignee Name"
                  dir="auto"
                />
              </FormGroup>
              <br />
              <FormGroup label="Difficulty" labelFor="assignee">
                <input
                  onChange={handleChange}
                  defaultValue={3}
                  type="range"
                  min={1}
                  max={5}
                  name="difficulty"
                  dir="auto"
                />
              </FormGroup>

              <br />

              <label>
                <Button style={{background:"#008075"}}type="submit">Add Item</Button>
              </label>
            </form>
          </Card>
        </div>
        </Auth>

        <div>
        <Auth>
          <List list={list}  toggleComplete={toggleComplete} deleteItem={deleteItem}/>
         </Auth>

        </div>
      </div>
    </>
    
  );
};

export default ToDo;