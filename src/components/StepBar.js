import { useEffect, useRef, useState, useNavigate } from "react";
import "../CssStyle/StepBar.css";
import { useSelector, useDispatch } from "react-redux";
import { nextStage, previousStage } from "../Actions/actions.js";

function MultiStepForm({ stepsConfig, actionIndex }) {
  const bookingStage = useSelector((state) => state.bookingStageReducer);
  const dispatch = useDispatch();

  console.log("bookingStage", bookingStage);

  const pickUpLocation = localStorage.getItem("pickUpLocation");
  const dropLocation = localStorage.getItem("dropLocation");
  const date = localStorage.getItem("date");
  const time = localStorage.getItem("time");

  const dateObject = new Date(date);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const formattedDate = ` ${monthNames[monthIndex]} ${day}, ${year}`;

  let formattedTime = ""; // Declare formattedTime variable outside of the if block

  if (time !== null) {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    formattedTime = `${hours12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`; // Assign value to formattedTime
    console.log(formattedTime);
  } else {
    console.log("Error: time is null");
  }

  const [currentStep, setCurrentStep] = useState(bookingStage);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);
  // useEffect(() => {
  //   setCurrentStep(bookingStage);
  // }, [bookingStage]);

  // console.log("currentStep",currentStep)

  useEffect(() => {
    if (stepsConfig && stepsConfig.length > 0) {
      setMargins({
        marginLeft: stepRef.current[0].offsetWidth / 2,
        marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
      });
    }
  }, [stepRef, stepsConfig]);

  if (!stepsConfig || !stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        dispatch(nextStage(localStorage.getItem("category")));
        return prevStep + 1;
      }
    });
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 1) {
        return prevStep;
      } else {
        setIsComplete(false);
        return prevStep - 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;
  return (
    <div className="step-bar">
      <div className="">
        <div className="stepper">
          {stepsConfig.map((step, index) => {
            return (
              <div
                key={step.name}
                ref={(el) => (stepRef.current[index] = el)}
                className={`step ${
                  currentStep > index + 1 || isComplete ? "complete" : ""
                } ${currentStep === index + 1 ? "active" : ""} `}
              >
                <div className="step-number">
                  {/* {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )} */}
                </div>
                <div className="step-name">{step.name}</div>
              </div>
            );
          })}

          <div
            className="progress-bar"
            style={{
              width: `calc(100% - ${
                margins.marginLeft + margins.marginRight
              }px)`,
              marginLeft: margins.marginLeft,
              marginRight: margins.marginRight,
            }}
          >
            <div
              className="progress"
              style={{ width: `${calculateProgressBarWidth()}%` }}
            ></div>
          </div>
        </div>

        <section className="row">
          <div className="col-md-12">
            <div className="mst">
              <p>
                Sun, {formattedDate} at {formattedTime} (MST)
              </p>
              <p>
                <span>From :</span> {pickUpLocation} <span>To </span>:
                {dropLocation}
              </p>
              <p>Estimated arrival at {formattedTime} (MST) 134.3 km</p>
            </div>
          </div>
        </section>

        <ActiveComponent
          handleNextButon={handleNext}
          handlePreviousButton={handlePrevious}
        />

        {/* {!isComplete && (
        <button className="btn continue-btn" onClick={handleNext}>
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )} */}
        {/* {!isComplete && (
        <button className="btn continue-btn" onClick={handlePrevious}>
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )} */}
      </div>
    </div>
  );
}

export default MultiStepForm;
