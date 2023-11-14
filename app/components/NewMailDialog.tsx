import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import LabelInputGroup, {
  formInputGroupsData,
} from "~/components/form/LabelInputGroup";
import { useContext } from "~/root";

export default function NewMailDialog() {
  const { newMailDialog, setNewMailDialog } = useContext();
  let fetcher = useFetcher();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.state === "idle" && formRef.current) {
      formRef.current.reset();
    }

    if (fetcher.state === "submitting") setNewMailDialog(false);
  }, [fetcher.state, setNewMailDialog]);

  return newMailDialog ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <dialog ref={dialogRef} className="h-1/2 w-1/2 rounded" open={true}>
        <fetcher.Form
          method="post"
          action="/mail/new"
          ref={formRef}
          className="h-full"
        >
          <fieldset
            className="grid h-full grid-rows-[auto_1fr_auto]"
            disabled={isSubmitting}
          >
            <header className="p-4">
              <div className="group mb-4 flex gap-1">
                <button
                  title="Close"
                  aria-label="close"
                  className="flex h-3 w-3 items-center justify-center rounded-full border bg-red-600"
                  onClick={() => setNewMailDialog(false)}
                >
                  <span className="invisible hidden text-xs text-gray-600 opacity-0 group-hover:visible group-hover:opacity-100">
                    x
                  </span>
                </button>
                <button
                  title="Minimize"
                  aria-label="minimize"
                  className="flex h-3 w-3 items-center justify-center rounded-full border bg-yellow-400"
                  onClick={() => setNewMailDialog(false)}
                  type="submit"
                >
                  <span className="invisible hidden text-xs text-gray-600 opacity-0 group-hover:visible group-hover:opacity-100">
                    -
                  </span>
                </button>
                <button
                  title="Scale"
                  aria-label="sacle"
                  className="flex h-3 w-3 items-center justify-center rounded-full border bg-green-600"
                >
                  <span className="hidden">Scale</span>
                </button>
              </div>

              <div className="grid gap-2">
                {formInputGroupsData.map((formInputGroup) => (
                  <LabelInputGroup
                    key={formInputGroup.labelTitle}
                    labelTitle={formInputGroup.labelTitle}
                    inputName={formInputGroup.inputName}
                    inputType={formInputGroup.inputType}
                    required={formInputGroup.required}
                    defaultValue={formInputGroup.defaultValue}
                  />
                ))}
              </div>
            </header>

            <textarea
              name="content"
              className="w-full resize-none border-none p-4 focus:border-none focus:outline-0 active:border-none"
              required
            />

            <footer className="flex justify-end p-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-blue-400"
              >
                {isSubmitting ? "Add..." : "Send"}
              </button>
            </footer>
          </fieldset>
        </fetcher.Form>
      </dialog>
    </div>
  ) : null;
}
