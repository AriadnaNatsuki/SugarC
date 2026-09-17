import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";

// framer-motion -> mock estático
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => {
      const {
        initial,
        animate,
        variants,
        whileHover,
        whileInView,
        viewport,
        transition,
        ...rest
      } = props;
      void initial;
      void animate;
      void variants;
      void whileHover;
      void whileInView;
      void viewport;
      void transition;
      return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children as React.ReactNode}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => true,
}));

// Mock Next Image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    priority,
    ...props
  }: Record<string, unknown>) => {
    void fill;
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src as string} alt={alt as string} {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

describe("HowItWorksSection", () => {
  it("renderiza el título de sección y los 3 pasos", () => {
    render(<HowItWorksSection />);

    expect(screen.getByRole("heading", { name: /Simple desde el primer día/i })).toBeInTheDocument();
    expect(screen.getByText(/Registrá en segundos/i)).toBeInTheDocument();
    expect(screen.getByText(/Organizá tu día/i)).toBeInTheDocument();
    expect(screen.getByText(/Controlá tu esquema/i)).toBeInTheDocument();
  });

  it("permite cambiar el paso activo al hacer clic", () => {
    render(<HowItWorksSection />);

    const step2Tab = screen.getByRole("tab", { name: /Paso 02: Organizá tu día/i });
    fireEvent.click(step2Tab);

    expect(step2Tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/Tu jornada completa ordenada en una línea de tiempo/i)).toBeInTheDocument();
  });
});
