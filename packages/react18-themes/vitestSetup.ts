// @ts-nocheck
import { act } from "@testing-library/react";
import { create as actualCreate, StateCreator } from "zustand";

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = <S>(createState: StateCreator<S>) => {
	const store = actualCreate(createState);
	const initialState = store.getState();
	storeResetFns.add(() => store.setState(initialState, true));
	return store;
};

afterEach(() => {
	act(() => storeResetFns.forEach(resetFn => resetFn()));
});

// mock matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: query.includes(window.media),
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

declare global {
	interface Window {
		media: "dark" | "light";
	}
}
Object.defineProperty(window, "media", {
	writable: true,
	value: "dark",
});

globalThis.cookie = "dark";

vi.mock("next/headers", () => ({
	cookies: () => ({ get: (cookieName: string) => globalThis.cookie }),
}));
