import { useFormContext, useFormState, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as EditorType } from "tinymce";
import type { SequencePayload } from "../features/types";
import Button from "./Button";
import EmailIcon from "./Icons/EmailIcon";

interface EmailStepFormProps {
  stepTitle: string;
  index: number;
}

const EmailStepForm: React.FC<EmailStepFormProps> = ({ stepTitle, index }) => {
  const { register, control } = useFormContext<SequencePayload>();
  const { errors } = useFormState<SequencePayload>();

  return (
    <div className="border border-gray-200 rounded-xl w-full mx-auto bg-white mb-4">
      <div className="flex gap-2 md:gap-4 px-6 py-4 border-b border-gray-200">
        <Button
          variant="outline"
          icon={<EmailIcon width={20} height={20} fill="#344054" />}
          width="w-[40px]"
        />
        <p className="font-[16px] font-semibold md:text-lg self-center">
          {stepTitle}
        </p>
      </div>
      <div className="px-6 pt-4 pb-3 border-b border-gray-200">
        <input
          type="text"
          placeholder="Subject"
          {...register(`steps.${index}.subject`)}
          className="w-full text-base leading-6 font-normal text-gray-900 focus:outline-none placeholder:text-gray-400"
        />
        {errors.steps?.[index]?.subject && (
          <p className="error">{errors.steps[index]?.subject?.message}</p>
        )}
      </div>
      <div className="px-4 pt-4 pb-3">
        <Controller
          name={`steps.${index}.body`}
          control={control}
          render={({ field }) => (
            <Editor
              apiKey="guvz0gmq7ywnek0u2zbc284tnjmpoyuy29nodwwmy57hl8iv"
              value={field.value || ""}
              onEditorChange={(content) => field.onChange(content)}
              init={{
                height: 231,
                menubar: false,
                plugins: "lists image code",
                toolbar:
                  "formatselect bold italic underline h1 h2 blockquote bullist numlist",
                block_formats:
                  "Paragraph=p; Heading 1=h1; Heading 2=h2; Quote=blockquote",
                setup: (editor: EditorType) => {
                  editor.on("init", () => {
                    const styleTag = document.createElement("style");
                    styleTag.innerHTML = `
                      .tox-tinymce {
                        border: none !important;
                        box-shadow: none !important;
                      }
                      .tox-statusbar {
                        display: none !important;
                      }
                      .tox-editor-header {
                        border: none !important;
                        box-shadow: none !important;
                        padding-bottom: 0.5rem;
                      }
                      .tox .tox-edit-area::before {
                        border: none !important;
                        border-radius: 0 !important;
                      }
                      .tox .tox-tbtn svg {
                        fill: #9CA3AF !important;
                      }
                      .tox .tox-tbtn {
                        color: #9CA3AF !important;
                      }
                      .tox .tox-toolbar__group {
                        gap: 4px;
                        flex-wrap: wrap !important;
                        flex-shrink: unset !important;
                        overflow-x: unset !important;
                        padding: 0 !important;
                      }
                      .tox .tox-toolbar--scrolling {
                        flex-wrap: wrap !important;
                        overflow-x: unset !important;
                      }
                    `;
                    document.head.appendChild(styleTag);
                  });
                },
              }}
            />
          )}
        />
        {errors.steps?.[index]?.body && (
          <p className="error">{errors.steps[index]?.body?.message}</p>
        )}
      </div>
    </div>
  );
};

export default EmailStepForm;
