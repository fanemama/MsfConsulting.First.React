function Continue(props: { show: boolean; onContinue: { (): void } }) {
  //throw Error("test Eroor");
  return (
    <div className="row continue">
      {props.show ? (
        <div className="col-11">
          <button
            className="btn btn-primary btn-lg float-right"
            onClick={() => props.onContinue()}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Continue;
