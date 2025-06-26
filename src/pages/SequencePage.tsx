import { useSequenceStore } from "../store/SequenceContext";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import type { SequencePayload } from "../features/types";
import StepNavigation from "../components/StepNavigation";
import EmailStepForm from "../components/EmailStepForm";
import Button from "../components/Button";
import TopPanel from "../components/TopPanel";
import BreadcrumbIcon from "../components/Icons/BreadcrumbIcon";
import SeparatorIcon from "../components/Icons/SeparatorIcon";
import StepProgressBar from "../components/StepProgressBar";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StepPath } from "../features/enum";
import { useEffect } from "react";

const schema = yup.object({
  steps: yup
    .array()
    .of(
      yup.object({
        subject: yup.string().required("Subject is required"),
        body: yup.string().default("").required("Body is required"),
      })
    )
    .required(),
});

const SequencePage = () => {
  const { sequence, setSteps, sequenceName } = useSequenceStore();
  const navigate = useNavigate();

  const methods = useForm<SequencePayload>({
    defaultValues: {
      steps:
        sequence.steps.length > 0
          ? sequence.steps
          : [{ subject: "", body: "" }],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append } = useFieldArray({
    control: methods.control,
    name: "steps",
  });

  const onSubmit = (data: SequencePayload) => {
    setSteps(data.steps);
    navigate(StepPath.Summary);
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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepNavigation
              onPrevious={() => navigate(StepPath.ProductName)}
              onNext={methods.handleSubmit(onSubmit)}
              title="Sequence steps"
              description="Create steps for your sequence"
            />
            <div className="flex justify-center flex-col">
              {fields.map((field, index) => (
                <EmailStepForm
                  key={field.id}
                  index={index}
                  stepTitle={`Step ${index + 1}`}
                />
              ))}
              <div className="pt-4 self-center">
                <Button
                  variant="outline"
                  icon="+"
                  text="Add new step"
                  onClick={() => append({ subject: "", body: "" })}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default SequencePage;
