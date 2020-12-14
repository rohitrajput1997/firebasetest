/** @format */

import React from "react";
import { connect } from "react-redux";
import { deleteTodo } from "../action/action";

const List = (props) => {
  return (
    <div>
      <ul>
        {props.todos.map((todo, index) => {
          return (
            <div>
              <li key={index}>{todo.message}</li>
              {console.log(todo.message)}
              <button onClick={() => props.dispatch(deleteTodo(todo.id))}>
                Delete
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  todos: state.todos.data,
});
export default connect(mapStateToProps)(List);
