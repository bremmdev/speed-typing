import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, userEvent, act } from "../../test-utils.js";
import TypeTest from "./TypeTest.jsx";

const getWordsFromElements = (elements) => {
  const words = [];
  elements.forEach((el) => {
    words.push(el.textContent);
  });
  return words;
};

describe("TypeTest", () => {
 
  describe("TestWords", () => {
    it("should render testWords container", () => {
      render(<TypeTest />);
      expect(screen.getByTestId("test-words")).toBeInTheDocument();
    });

    it("should render 60 new words when reset button is clicked", async () => {
      const user = userEvent.setup();
      render(<TypeTest />);
      const wordsBefore = getWordsFromElements(screen.getByTestId("test-words").querySelectorAll("span"));
      await user.click(screen.getByRole("button", { name: /reset/i }));
      const wordsAfter = getWordsFromElements(screen.getByTestId("test-words").querySelectorAll("span"));
      expect(wordsBefore).not.toStrictEqual(wordsAfter);
    });
  });

  describe("reset button", () => {
    it("should render", () => {
      render(<TypeTest />);
      expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    });

    it("should be enabled on render", () => {
      render(<TypeTest />);
      expect(screen.getByRole("button", { name: /reset/i })).not.toBeDisabled()
    });

    it("should be disabled when user starts typing", async () => {
      const user = userEvent.setup();
      render(<TypeTest />);
      const textAreaElement = screen.getByRole("textbox");
      await user.type(textAreaElement, "isolation");
      expect(screen.getByRole("button", { name: /reset/i })).toBeDisabled()
    });

    it('should be enabled when time runs out (60 seconds have passed)', async () => {
      const user = userEvent.setup({ delay: null });
      vi.useFakeTimers();
      render(<TypeTest />);
      await user.type(screen.getByRole("textbox"), "isolation");

      for(let i = 0; i<60; i++){
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }
      expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
      vi.useRealTimers();
    });
    })

  describe("textarea input", () => {
    it("should render", () => {
      render(<TypeTest />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should have a placeholder", () => {
      render(<TypeTest />);
      expect(screen.getByRole("textbox")).toHaveAttribute("placeholder","Start typing the words to begin the test...");
    });

    it("should be focused on render", () => {
      render(<TypeTest />);
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("should be able to type words", async () => {
      const user = userEvent.setup();
      render(<TypeTest />);
      const textAreaElement = screen.getByRole("textbox");
      await user.type(textAreaElement, "isolation");
      expect(textAreaElement).toHaveValue("isolation");
    });

    it('should be disabled after 60 seconds (time ran out)', async () => {
      const user = userEvent.setup({ delay: null });
      vi.useFakeTimers();
      render(<TypeTest />);

      await user.type(screen.getByRole("textbox"), "isolation");

      for(let i = 0; i<60; i++){
        act(() => {
          vi.advanceTimersByTime(1000);
      });
      }
    
      expect(screen.getByRole('textbox')).toHaveAttribute('disabled')
      vi.useRealTimers();
    });
  });

  describe('countdown', () => {
    it("should decrease after starting the test", async () => {
      const user = userEvent.setup({ delay: null });
      vi.useFakeTimers();
      render(<TypeTest />);

      expect(+screen.getByTestId("time-remaining").textContent).toEqual(60);
      await user.type(screen.getByRole("textbox"), "isolation");

      act(() => {
        vi.advanceTimersByTime(1000);
      });
    
      expect(+screen.queryByTestId("time-remaining").textContent).toEqual(59);
      vi.useRealTimers();
    });
  })
});
