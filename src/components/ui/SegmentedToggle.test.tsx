import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SegmentedToggle from "@/components/ui/SegmentedToggle";

describe("SegmentedToggle", () => {
  it("marks the active option and reports clicks", async () => {
    const onChange = vi.fn();
    render(
      <SegmentedToggle
        label="Range"
        options={[
          { value: "day", label: "Today" },
          { value: "week", label: "This Week" },
        ]}
        value="day"
        onChange={onChange}
      />,
    );

    expect(screen.getByRole("button", { name: "Today" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await userEvent.click(screen.getByRole("button", { name: "This Week" }));
    expect(onChange).toHaveBeenCalledWith("week");
  });
});
