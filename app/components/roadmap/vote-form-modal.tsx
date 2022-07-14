import { useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { LoginButton } from "../auth";

const VoteFormModal = ({ item, vote, onSubmit, icon }: any) => {
  const [commentInput, setCommentInput] = useState("");
  const { currentUser }: { currentUser: any } = useOutletContext();

  return (
    <>
      <label htmlFor={`vote-form-${item.id}-${vote}`} className="modal-button">
        {icon}
      </label>

      <input
        type="checkbox"
        id={`vote-form-${item.id}-${vote}`}
        className="modal-toggle"
      />
      <div className="modal text-left bg-base-300/80 p-0">
        <div className="modal-box rounded-lg">
          <label
            htmlFor={`vote-form-${item.id}-${vote}`}
            className="btn btn-sm bg-error/80 hover:bg-error/100 border-none btn-circle block ml-auto text-white leading-8"
          >
            ✕
          </label>
          {!currentUser ? (
            <div className="flex flex-col gap-2 items-center justify-evenly h-48">
              <div className="text-2xl">Only signed in users can vote!</div>
              <LoginButton />
            </div>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-2">{item.feature}</h3>
              <div className="form-control w-full">
                <label className="label -mb-2">
                  <span className="label-text">Comment</span>
                  <span className="label-text-alt">Optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Quick feedback on how this will help you or not"
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                  value={commentInput}
                  onChange={(event) =>
                    setCommentInput(event.currentTarget.value)
                  }
                />
              </div>
            </>
          )}

          {currentUser && (
            <div className="modal-action">
              <label
                htmlFor={`vote-form-${item.id}-${vote}`}
                className={`btn ${
                  vote === "Meh" ? "btn-error" : "btn-primary"
                }`}
                onClick={() => onSubmit(commentInput)}
              >
                <span className="mr-1">Vote</span>
                {icon}
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VoteFormModal;
