import { ReactNode, useEffect } from "react";
import { createRoot } from "react-dom/client";

type PortalProps = {
  container?: HTMLElement;
  children: ReactNode;
};

const Portal = ({ container, children }: PortalProps) => {
  let portalContainer = container;

  if (!portalContainer && typeof document !== "undefined") {
    portalContainer = document.body;
  }

  useEffect(() => {
    let portal: HTMLElement | null = null;

    if (portalContainer) {
      portal = document.createElement("div");
      portalContainer.appendChild(portal);

      const root = createRoot(portal);
      root.render(children);
    }

    return () => {
      if (portalContainer && portal && portalContainer.contains(portal)) {
        portalContainer.removeChild(portal);
      }
    };
  }, [portalContainer, children]);

  return null;
};

export default Portal;
