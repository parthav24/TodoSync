import React from 'react'
import { useState } from 'react';
import { useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import string from '../../string';

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


const AllTodos = () => {
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filter, setFilter] = useState({ completed: false, favourite: false });
  const { isAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();
  const fetchTodos = async () => {
    try {
      let url = `${string}/todo/gettotal`;
      if (sortBy) {
        url += `/${sortBy}?=asc`;
      }
      const response = await axios.get(url, {
        withCredentials: true,
      });
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      if (!isAuthenticated) {
        navigateTo("/login");
      }
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }, [sortBy, isAuthenticated]);

  const handleSortChange = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);
  };

    const getStatusDot = (complete, cdate) => {
      const currentDate = new Date();
      const completionDate = new Date(cdate);
      if (complete) {
        return <p className="status-dot completed"></p>;
      } else if (completionDate < currentDate) {
        return <p className="status-dot overdue"></p>;
      } else {
        return <p className="status-dot incomplete"></p>;
      }
    };

    const handleFilterChange = (e) => {
      const { name, checked } = e.target;
      setFilter(prevFilter => ({ ...prevFilter, [name]: checked }));
    };  

  return <>
  {user && user.role === "user" ? <>
    <section className="jobs page">
      <h3>All TODOs</h3>
      <div className='options'>
        <div className="sort">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="" disabled={true}>Select Sorting Option</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created At</option>
            <option value="cdate">Completion Date</option>
          </select>
        </div>
        <div className="filters">
          <label>
            <input type="checkbox" className='filter' name="completed" checked={filter.completed} onChange={handleFilterChange} />
            Completed
          </label>
          <label>
            <input type="checkbox" className='filter' name="favourite" checked={filter.favourite} onChange={handleFilterChange} />
            Favourite
          </label>
        </div>
      </div>
      <div className="container">
        <div className="banner">        
          {todos.todo &&
            todos.todo.map((element) => {
              if ((filter.completed && !element.complete) || (filter.favourite && !element.favourite)) {
                return null;
              }
              return (
                <div className="card" key={element._id}>
                  <p>{getStatusDot(element.complete, element.cdate)}{toTitleCase(element.title)}</p>
                  <p>{element.description}</p>
                  <p>{new Date(element.cdate).toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false })}</p>
                  <Link to={`/todo/${element._id}`}>ToDo Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section></> : null }
  </>
}

export default AllTodos;