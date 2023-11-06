export interface LabelInputGroup {
  labelTitle: string;
  inputName: string;
  inputType: "text" | "email";
  required: boolean;
  defaultValue: string | null;
}

export const formInputGroupsData: LabelInputGroup[] = [
  {
    labelTitle: "To",
    inputName: "receiver",
    inputType: "email",
    required: true,
    defaultValue: null,
  },
  {
    labelTitle: "Copy",
    inputName: "copy",
    inputType: "email",
    required: false,
    defaultValue: null,
  },
  {
    labelTitle: "Subject",
    inputName: "subject",
    inputType: "text",
    required: true,
    defaultValue: null,
  },
  {
    labelTitle: "From",
    inputName: "sender",
    inputType: "email",
    required: true,
    defaultValue: "dominik.rubroeder@icloud.com",
  },
];

interface LabelFormGroupProps extends LabelInputGroup {}

export default function LabelInputGroup({
  labelTitle,
  inputName,
  inputType,
  required,
  defaultValue,
}: LabelFormGroupProps) {
  return (
    <label
      title={labelTitle}
      className="flex items-center gap-2 border-b pb-2 text-gray-400"
    >
      {labelTitle}:
      <input
        name={inputName}
        type={inputType}
        className="w-full border-none text-gray-900 focus:outline-0"
        required={required}
        defaultValue={defaultValue ?? ""}
      />
    </label>
  );
}
