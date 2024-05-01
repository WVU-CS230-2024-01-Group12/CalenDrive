import { Link } from "react-router-dom";

function StyledLink({ to, children }) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "white" }}>
      {children}
    </Link>
  );
}

export default StyledLink;
