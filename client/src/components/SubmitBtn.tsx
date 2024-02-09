type Props = {
  submitting: boolean;
};

const SubmitBtn: React.FC<Props> = ({ submitting }) => {
  const submitText = submitting ? "Submitting..." : "Submit";

  return (
    <button
      type="submit"
      className="btn btn-block form-btn"
      disabled={submitting}
    >
      {submitText}
    </button>
  );
};
export default SubmitBtn;
