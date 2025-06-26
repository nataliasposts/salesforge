import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!sequenceName) {
      navigate(StepPath.ProductName);
    }
  }, [sequenceName, navigate]);

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
          <p className="md:w-[20%] md:mr-3 mr-5 w-[30%] font-semibold text-gray-700 text-sm">
            Sequence steps and details
          </p>
          <div className="md:w-[75%] w-[65%]">
            {sequence.steps.map((step, i) => (
              <div key={i}>
                <p className="text-sm font-semibold mb-1 text-gray-700">
                  Steps – {i + 1}
                </p>
                <p className="text-gray-600 text-sm mb-5">
                  <span>Subject:</span> {step.subject || "-"}
                </p>
                <p className="text-gray-600 text-sm mb-5">
                  <span className="block font-semibold mb-1">Content:</span>
                  <div
                    className="
                      [&_p]:mb-2 
                      [&_strong]:font-semibold 
                      [&_em]:italic 
                      [&_u]:underline 
                      [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-2 
                      [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 
                      [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:text-gray-500 [&_blockquote]:italic [&_blockquote]:mb-2
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 
                      [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2 
                      [&_li]:mb-1
                    "
                    dangerouslySetInnerHTML={{ __html: step.body || "-" }}
                  />
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
