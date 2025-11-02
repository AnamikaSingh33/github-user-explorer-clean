import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  it("renders search input", () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(/search github username/i);
    expect(input).toBeInTheDocument();
  });

  it("calls onSearch after debounce", async () => {
    vi.useFakeTimers(); // Mock timers
    const mockSearch = vi.fn();

    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByTestId("search-input");

    // Simulate user typing
    fireEvent.change(input, { target: { value: "gaearon" } });

    // Wrap debounce timing in `act()` to flush React updates
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(mockSearch).toHaveBeenCalledWith("gaearon");
    vi.useRealTimers();
  });
});
