import React, { useEffect, useRef, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_WORKOUT } from "../utils/queries";
import { ADD_WORKOUT } from "../utils/mutations";
import { NEW_WORKOUT, SET_WORKOUT } from "../utils/actions";

const Today = () => {
  let change = 0;
  const [state, dispatch] = useStoreContext();
  const newWorkTitle = useRef();
  const [titleInput, setTitleInput] = useState({ workoutTitleInput: "" });

  // if(!state.user){
  //   return (<div>loading</div>)
  // }
  const { loading, data } = useQuery(QUERY_WORKOUT, {
    variables: {
      workoutId: state.user?.workouts[0]?._id || "",
    },
  });

  //console.log("THIS ONE " + data);

  useEffect(() => {
    // console.log(data, "user data string at top of useEffect");
    if (data) {
      dispatch({
        type: SET_WORKOUT,
        workout: data.workout,
      });
      //console.log("DATA " + data);
    }

  }, [data, loading, dispatch]);
 
  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setTitleInput({
      ...titleInput,
      [name]: value,
    });
  };

  const [addWorkout] = useMutation(ADD_WORKOUT);
  const addNewWorkout = async (event) => {
    //event.preventDefault();
    change++;
    const newWorkout = await addWorkout({
      variables: { workoutTitle: titleInput.workoutTitleInput },
    });
    dispatch({
      type: SET_WORKOUT,
      workout: newWorkout,
    });
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="cards">
        <h3 className="card-title">Today's Workout</h3>
        <div>
          <input
            ref={newWorkTitle}
            onChange={handleTitleChange}
            name="workoutTitleInput"
            placeholder="ADD WORKOUT TITLE"
            className="w-4/6 h-12 shadow-xl"
          />
          <button
            onClick={() => addNewWorkout()}
            className="w-2/6 bg-cyan-400 rounded-xl"
          >
            Save Workout
          </button>
        </div>
        <div>
          {state?.user?.workouts.length > 0 && (
            <div>
              {/* <div>Workout Name: {state.user.workouts[0].workoutTitle}</div> */}
              <p>Exercises:</p>
              {state.user.workouts[0].exercises.map((exercise) => (
                <div key={exercise._id}>{exercise.exerciseName}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Today;
