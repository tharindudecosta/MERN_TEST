import { useNavigate } from "react-router-dom";

const WorkoutDetails = ({ workout }) => {

    let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      console.log("Workout delete", json);
      navigate('/')
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
      <p>{workout.createdAt}</p>
      <button className="redButton" onClick={handleClick}>
        Delete
      </button>
      <a href={"./WorkoutUpdate/" + workout._id}>
        <button className="redButton">Update</button>
      </a>
    </div>
  );
};

export default WorkoutDetails;
