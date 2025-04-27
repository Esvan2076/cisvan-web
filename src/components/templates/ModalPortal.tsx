import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

const ModalPortal: React.FC<Props> = ({ children }) => {
  if (typeof window === "undefined") return null;

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
};

export default ModalPortal;