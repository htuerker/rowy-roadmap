const VoteField = ({ id, text }: any) => (
  <>
    <input type="hidden" name="docId" value={id} />

    <button
      className=" bg-gray-100 hover:bg-gray-200 text-gray-800 py-0.5 px-1 rounded"
      type="submit"
      name="vote"
      value="Yes"
    >
      {text}
    </button>
  </>
);

export default VoteField;
