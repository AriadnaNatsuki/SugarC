import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/lib/theme";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

afterEach(() => {
  document.documentElement.classList.remove("dark", "a11y");
  window.localStorage.clear();
});

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("muestra el modo actual y abre el menú con las 2 opciones", async () => {
    const user = userEvent.setup();
    renderToggle();

    const btn = screen.getByRole("button", { name: /modo de color: claro/i });
    expect(btn).toHaveAttribute("aria-haspopup", "true");
    expect(btn).toHaveAttribute("aria-expanded", "false");

    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu", { name: /modo de color/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: /oscuro/i })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("menuitemradio", { name: /claro/i })).toBeInTheDocument();
    expect(screen.queryByRole("menuitemradio", { name: /accesible/i })).not.toBeInTheDocument();
  });

  it("cambia a oscuro: aplica la clase y persiste", async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole("button", { name: /modo de color/i }));
    await user.click(screen.getByRole("menuitemradio", { name: /oscuro/i }));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("sugarcoach-theme")).toBe("dark");
    expect(screen.getByRole("button", { name: /modo de color: oscuro/i })).toBeInTheDocument();
  });

  it("cambia a claro (accesible) y cierra con Escape", async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole("button", { name: /modo de color/i }));
    await user.click(screen.getByRole("menuitemradio", { name: /claro/i }));
    expect(document.documentElement.classList.contains("a11y")).toBe(true);

    await user.click(screen.getByRole("button", { name: /modo de color: claro/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
