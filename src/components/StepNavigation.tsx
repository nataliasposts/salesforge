import Button from "./Button/Button";

interface StepNavigationProps {
  onPrevious?: () => void;
  onNext: () => void;
  title: string;
  description: string;
  nextText?: string;
  disabled?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  onPrevious,
  onNext,
  title,
  description,
  nextText = "Next",
  disabled = false,
}) => {
  return (
    <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-[20px] [@media(max-width:408px)]:flex-col">
      <div className="flex flex-col">
        <h2 className="text-[16px] md:text-lg font-semibold text-gray-900">
          {title}
        </h2>
        <p className="text-[12px] md:text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex gap-2 [@media(max-width:408px)]:self-end [@media(max-width:408px)]:mt-3">
        {onPrevious && (
          <Button
            variant="outline"
            text="Previous"
            onClick={onPrevious}
            disabled={disabled}
          />
        )}
        <Button
          variant="primary"
          text={nextText}
          onClick={onNext}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default StepNavigation;
