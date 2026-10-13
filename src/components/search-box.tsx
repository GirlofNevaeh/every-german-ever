import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { isFinishedName } from "@/lib/find";

export function SearchBox({ initial = "" }: { initial?: string }) {
  const navigate = useNavigate();
  const [text, setText] = useState(initial);
  const [armed, setArmed] = useState(initial.trim().length > 0);

  function send(value: string) {
    const q = value.trim();
    if (!q) return;
    void navigate({ to: "/search", search: { q } });
  }

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!text.trim()) return;
        if (!armed) {
          setArmed(true);
          return;
        }
        send(text);
      }}
    >
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Search</span>
        <input
          value={text}
          onChange={(event) => {
            const next = event.target.value;
            setText(next);
            setArmed(isFinishedName(next));
          }}
          className="min-h-11 rounded-lg border border-ink/20 bg-paper px-3 text-ink"
          placeholder="A person, a place, or a state"
          autoCapitalize="words"
        />
      </label>
      {armed && text.trim() ? (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-danube bg-danube/10 px-3 py-2">
          <code className="font-sans text-base text-ink">search {text.trim()}</code>
          <button type="submit" className="min-h-11 rounded-lg bg-danube px-4 font-semibold text-paper">
            Send
          </button>
        </div>
      ) : null}
    </form>
  );
}
