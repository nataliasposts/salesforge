import { useFormContext, useFormState } from 'react-hook-form'
import type { SequencePayload } from '../features/types'
import Button from './Button'
import EmailIcon from './Icons/EmailIcon'

interface EmailStepFormProps {
    stepTitle: string
    index: number
}

const EmailStepForm: React.FC<EmailStepFormProps> = ({ stepTitle, index }) => {
    const { register } = useFormContext<SequencePayload>()
    const { errors } = useFormState<SequencePayload>()

    return (
        <div className="border border-gray-200 rounded-xl w-full mx-auto bg-white mb-4">
            <div className="flex gap-4 px-6 py-4 border-b border-gray-200">
                <Button
                    variant="outline"
                    icon={<EmailIcon width={20} height={20} fill="#344054" />}
                    width="w-[40px]"
                />
                <p className="font-semibold text-lg self-center">{stepTitle}</p>
            </div>

            <div className="px-6 pt-4 pb-3 border-b border-gray-200">
                <input
                    type="text"
                    placeholder="Subject"
                    {...register(`steps.${index}.subject`)}
                    className="w-full text-base leading-6 font-normal text-gray-900 focus:outline-none placeholder:text-gray-400"
                />
                {errors.steps?.[index]?.subject && (
                    <p className="error">
                        {errors.steps[index]?.subject?.message}
                    </p>
                )}
            </div>

            <div className="px-6 pt-2 pb-4">
                <textarea
                    placeholder="Body (optional)"
                    {...register(`steps.${index}.body`)}
                    className="w-full text-base leading-6 font-normal text-gray-900 focus:outline-none placeholder:text-gray-400 resize-none"
                    rows={4}
                />
                {errors.steps?.[index]?.body && (
                    <p className="error">
                        {errors.steps[index]?.body?.message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default EmailStepForm
