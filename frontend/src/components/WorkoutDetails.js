import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceNow from "date-fns/formatDistanceToNow"
import {useAuthContext} from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  const handleClick = async (e) => {

    if(!user){
      return
    }

    e.preventDefault();
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        'Authorization':`Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log("Workout delete", json);
      dispatch({type:'DELETE_WORKOUT',payload:json})
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>ID: </strong>
        {workout._id}
      </p>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceNow(new Date(workout.createdAt),{addSuffix: true})}</p>
      <button className="redButton " onClick={handleClick}>
        Delete
      </button>
      <a href={"./WorkoutUpdate/" + workout._id}>
        <button className="blueButton">Update</button>
      </a>
    </div>
  );
};

export default WorkoutDetails;
