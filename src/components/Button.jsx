export const Button = ({ className = "", size = "default", children, type = "button", ...props }) => (
  <button type={type} className={`button button-primary ${size === "sm" ? "button-small" : ""} ${className}`} {...props}>
    {children}
  </button>
);
