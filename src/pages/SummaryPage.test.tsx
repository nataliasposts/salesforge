import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryPage from "./SummaryPage";
import { SequenceContext } from "../store/SequenceContext";
import { StepPath } from "../features/enum";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as api from "../api/api";
import { vi, describe, it, expect } from "vitest";
import { AxiosHeaders } from "axios";

vi.mock("../api/api");

const mockedPostSequence = vi.mocked(api.postSequence);

const renderWithContext = (contextOverride = {}) => {
    const defaultContext = {
        sequence: {
            steps: [{ subject: "Test Subject", body: "<p>Hello world</p>" }],
        },
        sequenceName: "Test Sequence",
        setSequenceName: vi.fn(),
        setSteps: vi.fn(),
        reset: vi.fn(),
        ...contextOverride,
    };

    return render(
        <SequenceContext.Provider value={defaultContext}>
            <MemoryRouter initialEntries={[StepPath.Summary]}>
                <Routes>
                    <Route path={StepPath.Summary} element={<SummaryPage />} />
                    <Route path="/" element={<div>HomePage</div>} />
                </Routes>
            </MemoryRouter>
        </SequenceContext.Provider>,
    );
};

describe("SummaryPage", () => {
    it("renders sequence step details", () => {
        renderWithContext();
        expect(screen.getByText("Steps – 1")).toBeInTheDocument();
        expect(screen.getByText(/Test Subject/i)).toBeInTheDocument();
        expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("redirects to / if submit is successful", async () => {
        mockedPostSequence.mockResolvedValueOnce({
            status: 200,
            statusText: "OK",
            data: {},
            config: {
                headers: new AxiosHeaders(),
            },
            headers: new AxiosHeaders(),
        });

        renderWithContext();
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText("HomePage")).toBeInTheDocument();
        });
    });

    it("shows error if submit fails", async () => {
        mockedPostSequence.mockRejectedValueOnce(new Error("API error"));

        renderWithContext();
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(
                screen.getByText(/sequence steps and details/i),
            ).toBeInTheDocument();
        });
    });

    it("redirects to ProductNamePage if sequenceName is missing", () => {
        render(
            <SequenceContext.Provider
                value={{
                    sequence: { steps: [] },
                    sequenceName: "",
                    setSequenceName: vi.fn(),
                    setSteps: vi.fn(),
                    reset: vi.fn(),
                }}
            >
                <MemoryRouter initialEntries={[StepPath.Summary]}>
                    <Routes>
                        <Route path={StepPath.Summary} element={<SummaryPage />} />
                        <Route
                            path={StepPath.ProductName}
                            element={<div>ProductNamePage</div>}
                        />
                    </Routes>
                </MemoryRouter>
            </SequenceContext.Provider>,
        );

        expect(screen.getByText("ProductNamePage")).toBeInTheDocument();
    });
});
