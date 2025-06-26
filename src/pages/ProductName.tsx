import { useNavigate } from "react-router-dom";
import BreadcrumbIcon from "../components/Icons/BreadcrumbIcon";
import SeparatorIcon from "../components/Icons/SeparatorIcon";
import StepNavigation from "../components/StepNavigation";
import TopPanel from "../components/TopPanel";
import { StepPath } from "../features/enum";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSequenceStore } from "../store/SequenceContext";
import { FormProvider, useForm } from "react-hook-form";
import type { NameFormValues } from "../features/types";
import StepProgressBar from "../components/StepProgressBar";

const schema = yup.object({
  sequenceName: yup.string().required("Sequence name is required"),
});
export const ProductName = () => {
  const { setSequenceName, sequenceName, reset } = useSequenceStore();
  const navigate = useNavigate();

  const methods = useForm<NameFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      sequenceName: sequenceName || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: NameFormValues) => {
    if (data.sequenceName !== sequenceName) {
      reset();
      setSequenceName(data.sequenceName);
    }
    navigate(StepPath.SequenceSteps);
  };

  return (
    <section>
      <div className="container">
        <TopPanel
          breadcrumbText="Name & Product"
          title="Name & Product"
          breadcrumbIcon={
            <BreadcrumbIcon fill="#667085" width={28} height={28} />
          }
          separator={<SeparatorIcon fill="#D0D5DD" />}
        />
        <StepProgressBar />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StepNavigation
              onNext={handleSubmit(onSubmit)}
              title="Let's create a new sequence"
              description="Give your sequence a name"
            />
            <div className="mb-4">
              <p className="mb-2">Sequence name</p>
              <input
                type="text"
                placeholder="Enter sequence name"
                {...register("sequenceName")}
                className="w-full border border-gray-300 rounded px-4 py-2 text-base"
              />
              {errors.sequenceName && (
                <p className="error">{errors.sequenceName.message}</p>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ProductName;
