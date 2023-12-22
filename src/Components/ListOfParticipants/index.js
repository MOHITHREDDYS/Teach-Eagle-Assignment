import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { IoIosArrowRoundForward } from "react-icons/io";

import "./index.css";

const ListOfParticipants = (props) => {
  const [participantsList, updateList] = useState([]);
  const [participantName, updateName] = useState("");
  const [participantSpeed, updateSpeed] = useState("");
  const [startTime, updateTime] = useState("");
  const [nameError, updateNameError] = useState(false);
  const [speedError, updateSpeedError] = useState(false);
  const [timeError, updateTimeError] = useState(false);
  // ON Changing Runner Name
  const onChangingName = (event) => {
    updateName(event.target.value);
  };

  // ON Changing Runner Speed
  const onChangingSpeed = (event) => {
    updateSpeed(event.target.value);
  };

  // ON Changing Runner StartTime
  const onChangingTime = (event) => {
    updateTime(event.target.value);
  };

  // On Clicking "Add Runner" Button or "Enter"
  const onSubmittingDetails = (event) => {
    event.preventDefault();

    participantName === "" && updateNameError("*Enter Name");
    participantSpeed === "" && updateSpeedError("*Enter Speed");
    startTime === "" && updateTimeError("*Enter Time");

    participantName !== "" && updateNameError("");
    participantSpeed !== "" && updateSpeedError("");
    startTime !== "" && updateTimeError("");

    const runnerDetails = {
      name: participantName,
      speed: participantSpeed,
      startTime,
      endTime: "-",
    };

    // CopyList is used to check whether the given runner details already present/not present in list.
    // CopyList is a list having all objects in participantsList excluding id of the object.
    const copyList = participantsList.map((eachRunner) => ({
      name: eachRunner.name,
      speed: eachRunner.speed,
      startTime: eachRunner.startTime,
      endTime: eachRunner.endTime,
    }));

    if (
      nameError === "" &&
      speedError === "" &&
      timeError === "" &&
      participantsList.length < 10 &&
      JSON.stringify(copyList).includes(JSON.stringify(runnerDetails)) === false
    ) {
      updateList((prev) => [...prev, { ...runnerDetails, id: uuid() }]);
    }
  };

  const onClickingStartRace = () => {
    console.log("hai");
  };

  //Giving inputs about the runner (name, speed, start time)
  const renderAddParticipant = () => {
    return (
      <div className="details-box">
        <h1 className="details-box-heading">RUNNER DETAILS</h1>
        <p className="max-participants">*You can add max 10 participants</p>
        <form onSubmit={onSubmittingDetails}>
          <label className="details-box-labels" htmlFor="participantName">
            Name
          </label>
          <input
            className="details-box-inputs"
            type="text"
            id="participantName"
            placeholder="Enter Participant Name"
            value={participantName}
            onChange={onChangingName}
          />
          <p className="error">{nameError}</p>
          <label className="details-box-labels" htmlFor="participantSpeed">
            Speed
          </label>
          <input
            className="details-box-inputs"
            type="number"
            id="participantSpeed"
            placeholder="Enter Speed in KM/H"
            value={participantSpeed}
            onChange={onChangingSpeed}
          />
          <p className="error">{speedError}</p>
          <label className="details-box-labels" htmlFor="startingTime">
            Start Time
          </label>
          <input
            className="details-box-inputs"
            type="time"
            id="startingTime"
            placeholder="Enter Start Time"
            value={startTime}
            onChange={onChangingTime}
          />
          <p className="error">{timeError}</p>
          <button type="submit" className="details-box-add-button">
            +&nbsp;&nbsp;&nbsp;ADD RUNNER
          </button>
        </form>
      </div>
    );
  };

  // All participants list in the form of table
  const renderParticipantsList = () => {
    return (
      <div className="list-container">
        <h1 className="runners-list-heading">LIST OF PARTICIPANTS</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Speed</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {participantsList.length !== 0 &&
              participantsList.map((eachParticipant) => (
                <tr key={eachParticipant.id} className="table-data-row">
                  <td className="table-name-column">{eachParticipant.name}</td>
                  <td>{eachParticipant.speed} KM/H</td>
                  <td>{eachParticipant.startTime}</td>
                  <td>{eachParticipant.endTime}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <hr />
        <div className="button-container">
          <Link to="/race-track" className="link-item">
            <button
              className="start-race-button" /*onClick={onClickingStartRace}*/
            >
              <span>Start Race &nbsp;&nbsp;</span>
              <IoIosArrowRoundForward className="arrow-icon" />
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="home-main-container">
      {renderAddParticipant()}
      {renderParticipantsList()}
    </div>
  );
};

export default ListOfParticipants;
