import React from 'react'
import { FormGroup, Card, Elevation, Button } from "@blueprintjs/core";
import "../components/todo/todo.css";
import { Link } from 'react-router-dom';
function SettingForm() {
    const handleSubmit=e=>{
        e.preventDefault();
        let display=e.target.disply.value

        let numberOfItem=e.target.numberOfItem.value
        
        let obj ={
            display:display,

            
            numberOfItem:numberOfItem
        }
        setItem (obj)
        e.target.reset()
        window.location.href="/";
    }
    
function setItem (obj){
    localStorage.setItem('SettingForm', JSON.stringify(obj));
}
    return (
        <div>
            <div className="toDo">
          <Card interactive={true} elevation={Elevation.TWO}>
            <form onSubmit={handleSubmit}>
              <h2>Choose Setting</h2>
              <FormGroup label="show completed tasks" labelFor="disply">
                  <select name="disply" dir="auto" className="bp3-input .modifier">
                      <option value={true}>true</option>
                      <option value={false}>false</option>
                  </select>
               
              </FormGroup>

              <FormGroup label="numberOfItem per page " labelFor="assignee">
                <input
                  className="bp3-input .modifier"
                  name="numberOfItem"
                  type="text"
                  placeholder="Assignee Name"
                  dir="auto"
                />
              </FormGroup>
              <br />
              

              
                <Button type="submit" style={{background:"#008075"}}>Define Settings</Button>
              
            </form>
          </Card>
        </div>
        </div>
    )
}

export default SettingForm