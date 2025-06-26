import Button from './Button'

interface StepNavigationProps {
    onPrevious?: () => void
    onNext: () => void
    title: string;
    description: string
    nextText?: string
    disabled?: boolean
}

const StepNavigation: React.FC<StepNavigationProps> = ({ onPrevious, onNext, title, description, nextText = "Next", disabled = false }) => {
    return (
        <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-[20px]">
            <div className='flex flex-col'>
                <h2 className="text-base font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="flex gap-2">
                {onPrevious && <Button variant="outline" text="Previous" onClick={onPrevious} disabled={disabled} />}
                <Button variant="primary" text={nextText} onClick={onNext} disabled={disabled} />
            </div>
        </div>
    )
}

export default StepNavigation
