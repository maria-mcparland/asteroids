function button(text = "FIRE!") {
  return (
    <button
      class="button is-primary is-large"
      style={{ height: "fit-content" }}
    >
      <span style="font-family: 'Fredoka One'; font-size: 3em">{text}</span>
    </button>
  );
}

export default button;
