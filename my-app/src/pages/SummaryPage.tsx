import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSequenceStore } from "../store/SequenceContext";
import { postSequence } from "../api/api";
import BreadcrumbIcon from "../components/Icons/BreadcrumbIcon";
import SeparatorIcon from "../components/Icons/SeparatorIcon";
import TopPanel from "../components/TopPanel";
import StepNavigation from "../components/StepNavigation";
import { StepPath } from "../features/enum";
import StepProgressBar from "../components/StepProgressBar";

export const SummaryPage = () => {
    const { sequence, reset, sequenceName } = useSequenceStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await postSequence(sequence);
            toast.success("Sequence saved successfully!");
            reset();
            navigate("/");
        } catch {
            toast.error("Failed to save sequence.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="container">
                <TopPanel
                    breadcrumbText="Sequence"
                    title={sequenceName}
                    breadcrumbIcon={
                        <BreadcrumbIcon fill="#667085" width={28} height={28} />
                    }
                    separator={<SeparatorIcon fill="#D0D5DD" />}
                />
                <StepProgressBar />
                <StepNavigation
                    onPrevious={() => navigate(StepPath.SequenceSteps)}
                    onNext={handleSubmit}
                    title="Sequence Summary"
                    description="Summary of your sequence"
                    nextText={loading ? "Saving…" : "Submit"}
                    disabled={loading}
                />
                <div className="flex">
                    <p className="w-[20%] mr-3">Sequence steps and details</p>
                    <div className="w-[75%]">
                        {sequence.steps.map((step, i) => (
                            <div key={i}>
                                <p className="text-sm font-semibold mb-1 text-gray-700">Steps – {i + 1}</p>
                                <p className="text-gray-600">
                                    <span>Subject:</span>{" "}
                                    {step.subject || "-"}
                                </p>
                                <p className="text-gray-600">
                                    <span>Content:</span>{" "}
                                    {step.body || "-"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SummaryPage;
