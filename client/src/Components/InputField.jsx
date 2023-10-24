export default function InputField({
  value,
  onChange,
  placeholder,
  type,
  className,
  errorMessage,
  name,
}) {
  return (
    <div className="w-full flex flex-col">
      <input
        type={type || "text"}
        name={name || ""}
        className={`w-full text-slate-700 rounded-md border bg-white p-2 placeholder:text-sm placeholder:italic focus:outline-[#FF834F] ${className} ${
          errorMessage ? "border-[#FF4949]" : "border-gray-400"
        }`}
        value={value || ""}
        onChange={(e) => {
          onChange && onChange(e);
        }}
        placeholder={placeholder}
      />

      {errorMessage && (
        <small className="text-[#FF4949] indent-2"> {errorMessage} </small>
      )}
    </div>
  );
}
