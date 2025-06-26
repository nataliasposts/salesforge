import { useLocation } from 'react-router-dom'
import StepDoneIcon from './Icons/StepDoneIcon'
import { StepPath } from '../features/enum'

const steps = [
    {
        path: StepPath.ProductName,
        title: 'Name & Product',
        description: 'Provide sequence name & product',
    },
    {
        path: StepPath.SequenceSteps,
        title: 'Sequence steps',
        description: 'Create sequence steps for your sequence',
    },
    {
        path: StepPath.Summary,
        title: 'Summary',
        description: 'Summary of your sequence',
    },
]

const StepProgressBar = () => {
    const location = useLocation()
    const currentIndex = steps.findIndex((step) => {
        if (step.path === StepPath.ProductName) return location.pathname === StepPath.ProductName
        return location.pathname.startsWith(step.path)
    })

    return (
        <div className="flex items-start justify-between w-full px-4 py-6">
            {steps.map((step, index) => {
                const isCompleted = index < currentIndex
                const isActive = index === currentIndex

                return (
                    <div key={step.path} className="flex-1 flex flex-col items-center relative">
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute top-3 left-1/2 w-full h-0.5 z-[-1] ${index < currentIndex ? 'bg-purple-500' : 'bg-gray-200'
                                    }`}
                            />
                        )}

                        <div
                            className={`w-6 h-6 flex items-center justify-center border rounded-full mb-2 z-10 ${isCompleted
                                ? 'bg-white border-purple-500 text-purple-500'
                                : isActive
                                    ? 'bg-white border-purple-500 text-purple-500'
                                    : 'bg-white border-gray-300 text-gray-300'
                                }`}
                        >
                            {isCompleted ? <StepDoneIcon /> : <div className="w-2 h-2 rounded-full bg-current" />}
                        </div>

                        <div className={`text-sm font-medium text-center ${isActive ? 'text-purple-600' : 'text-gray-900'}`}>{step.title}</div>
                        <div className={`text-sm text-center ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>{step.description}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default StepProgressBar
