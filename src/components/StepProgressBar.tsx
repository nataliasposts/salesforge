import { useLocation } from "react-router-dom";
import StepDoneIcon from "./Icons/StepDoneIcon";
import { StepPath } from "../features/enum";

const steps = [
  {
    path: StepPath.ProductName,
    title: "Name & Product",
    description: "Provide sequence name & product",
  },
  {
    path: StepPath.SequenceSteps,
    title: "Sequence steps",
    description: "Create sequence steps for your sequence",
  },
  {
    path: StepPath.Summary,
    title: "Summary",
    description: "Summary of your sequence",
  },
];

const StepProgressBar = () => {
  const location = useLocation();
  const currentIndex = steps.findIndex((step) => {
    if (step.path === StepPath.ProductName)
      return location.pathname === StepPath.ProductName;
    return location.pathname.startsWith(step.path);
  });

  return (
    <div className="flex items-start justify-between w-full py-6 md:px-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div
            key={step.path}
            className="flex-1 flex flex-col items-center relative mr-3"
          >
            {index < steps.length - 1 && (
              <div
                className={`absolute top-3 left-1/2 w-full h-0.5 z-[-1] ${
                  index < currentIndex ? "bg-purple-500" : "bg-gray-200"
                }`}
              />
            )}

            <div
              className={`w-6 h-6 flex items-center justify-center border rounded-full mb-2 z-10 ${
                isCompleted
                  ? "bg-white border-purple-500 text-purple-500"
                  : isActive
                  ? "bg-white border-purple-500 text-purple-500"
                  : "bg-white border-gray-300 text-gray-300"
              }`}
            >
              {isCompleted ? (
                <StepDoneIcon />
              ) : (
                <div className="w-2 h-2 rounded-full bg-current" />
              )}
            </div>

            <p
              className={`text-[12px] font-medium text-center md:text-sm ${
                isActive ? "text-purple-700" : "text-gray-900"
              }`}
            >
              {step.title}
            </p>
            <p
              className={`hidden [@media(min-width:469px)]:block text-[12px] md:text-sm text-center ${
                isActive ? "text-purple-700" : "text-gray-500"
              }`}
            >
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgressBar;
