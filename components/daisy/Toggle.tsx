export interface Props {
  label?: string;
  checked?: boolean;
}

export default function Toggle(props: Props) {
  const { label, checked } = props;

  return (
    <div className="form-control">
      {label
        ? (
          <label className="label cursor-pointer">
            <span className="label-text">{label}</span>
            <input
              aria-label="toggle button"
              type="checkbox"
              className="toggle"
              checked={checked}
            />
          </label>
        )
        : (
          <input
            aria-label="toggle button"
            type="checkbox"
            className="toggle"
            checked={checked}
          />
        )}
    </div>
  );
}
