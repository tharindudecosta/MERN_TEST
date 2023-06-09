import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from '../hooks/useAuthContext'

const UpdateWorkout = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const { id } = useParams();
  let navigate = useNavigate();
  const {user} = useAuthContext()

  //fetch current information to a form
  useEffect(() => {

    if(!user){
      setError("You must be logged in")
      return;
    }
    setError(null)

    const fetchWorkout = async () => {
      fetch(`/api/workouts/${id}`,{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTitle(data.title);
          setLoad(data.load);
          setReps(data.reps);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchWorkout();
  }, [id,user]);

  //send the updated information
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!user){
      setError("You must be logged in")
      return;
    }
    
    const workout = { title, load, reps };

    const response = await fetch(`/api/workouts/updateWorkout/${id}`, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      console.log("workout updated:", json);
      navigate('/');
    }
    
  };

  //update form component
  return (
    <form className="create">
      <h3>Update Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error':''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error':''}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error':''}
      />

      <button onClick={handleSubmit}>Update Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateWorkout;
