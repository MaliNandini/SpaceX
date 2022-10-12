import "./App.css";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(null);
  const [launch, setLaunch] = useState(true);
  const [landing, setLanding] = useState(true);

  let currentDate = new Date().getFullYear();
  let arr = [];
  for (let i = 2006; i <= currentDate; i++) {
    arr.push(i);
  }

  const getAllData = useCallback(async () => {
    if (!year) {
      const response = await axios.get(
        `https://api.spaceXdata.com/v3/launches?limit=100`
      );
      setData(response.data);
    } else if (year ?? landing ?? launch) {
      const response = await axios.get(
        `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch}&land_success=${landing}&launch_year=${year}`
      );
      setData(response.data);
    }
  }, [landing, launch, year]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <div className="container">
      <h4 className="heading">SpacEx Launch Programs</h4>
      <div className="grid-container mt-4">
        {/* <<<<< filter card start  >>>>>> */}
        <div className="filter-card">
          <p className="filter-heading">filters</p>
          <p className="mb-0 text">Launch year</p>
          <hr className="mt-2"></hr>
          <div className="filter-year-btn">
            {arr.map((year) => {
              return (
                <button
                  type="button"
                  className="filter-btn mx-2 my-1"
                  value={year}
                  onClick={() => setYear(year)}
                >
                  {year}
                </button>
              );
            })}
          </div>

          <div className="mt-3 mb-0  text">Successful Launch</div>
          <hr className="mt-2"></hr>
          <div className="filter-year-btn">
            <button
              className="mx-2  my-2 filter-btn btn-text"
              onClick={() => setLaunch(true)}
            >
              True
            </button>
            <button
              className="mx-2  my-2 filter-btn btn-text"
              onClick={() => setLaunch(false)}
            >
              False
            </button>
          </div>

          <div className="mt-3 mb-0  text">Successful Landing</div>
          <hr className="mt-2 "></hr>
          <div className="filter-year-btn">
            <button
              className="mx-2  my-2 filter-btn btn-text"
              onClick={() => setLanding(true)}
            >
              True
            </button>
            <button
              className="mx-2  my-2 filter-btn btn-text"
              onClick={() => setLanding(false)}
            >
              False
            </button>
          </div>
        </div>
        {/* <<<<< filter card End >>>>>> */}

        {/* <<<<< output card start >>>>>> */}
        <div className="main-container ">
          {data.length > 0 ? (
            data.map((item) => {
              return (
                <div>
                  <div className="card-body ">
                    <img
                      src={item.links.mission_patch}
                      alt="no data"
                      style={{ width: "120px", heigth: "120px" }}
                      className="image"
                    />
                    <p className="mission-name">{item.mission_name}</p>
                    <p className="output-data">
                      {" "}
                      Launch Year : {item.launch_year}
                    </p>
                    <p className="output-data">
                      {" "}
                      Seccessful Launch :{" "}
                      {item.launch_success ? "true" : "false"}
                    </p>
                    <p className="output-data">
                      {" "}
                      Seccessful Landing :{" "}
                      {item.is_tentative ? "true" : "false"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="No-data">No Data</h1>
          )}
        </div>
        {/* <<<<< output card End >>>>>> */}
      </div>
    </div>
  );
}

export default App;
