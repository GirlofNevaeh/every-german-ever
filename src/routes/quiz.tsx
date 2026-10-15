import { createFileRoute } from '@tanstack/react-router'
import { useLanguage } from "@/lib/language";
import { useEffect, useMemo, useState } from "react";
import { questions } from "@/data/quiz";
import type { Question } from "@/data/types";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Quiz · Every German Ever" }] }),
  component: QuizPage,
});

type Mode = "solo" | "class";
type Phase = "setup" | "ask" | "feedback" | "done";

function shuffle<T>(list: T[]): T[] {
  const next = [...list];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [next[index], next[swap]] = [next[swap], next[index]];
  }
  return next;
}

function QuizPage() {
  const { text } = useLanguage();
  const [mode, setMode] = useState<Mode>("solo");
  const [length, setLength] = useState(8);
  const [teamCount, setTeamCount] = useState(2);
  const [names, setNames] = useState(["Team A", "Team B", "Team C", "Team D"]);
  const [phase, setPhase] = useState<Phase>("setup");
  const [deck, setDeck] = useState<Question[]>([]);
  const [cursor, setCursor] = useState(0);
  const [scores, setScores] = useState<number[]>([0, 0]);
  const [turn, setTurn] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [suddenTeams, setSuddenTeams] = useState<number[] | null>(null);
  const [suddenPicks, setSuddenPicks] = useState<Record<number, number>>({});
  const [hadSudden, setHadSudden] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);

  const activeTeams = suddenTeams ?? [...scores.keys()];
  const teamNow = activeTeams[turn % activeTeams.length] ?? 0;
  const question = deck[cursor];

  useEffect(() => {
    if (phase !== "feedback" || !question || picked === null) return;
    const timer = window.setTimeout(() => {
      if (suddenTeams) {
        const right = suddenTeams.filter((team) => suddenPicks[team] === question.answer);
        const nextScores = scores.map((score, index) => score + (right.includes(index) ? 1 : 0));
        setScores(nextScores);
        if (right.length === 1) {
          setWinner(right[0]);
          setPhase("done");
          return;
        }
        const nextCursor = cursor + 1;
        if (nextCursor >= deck.length) {
          setWinner(null);
          setPhase("done");
          return;
        }
        setCursor(nextCursor);
        setTurn(0);
        setPicked(null);
        setSuddenPicks({});
        setPhase("ask");
        return;
      }
      const correct = picked === question.answer;
      const nextScores = [...scores];
      if (correct) nextScores[teamNow] += 1;
      const nextCursor = cursor + 1;
      setScores(nextScores);
      if (nextCursor >= deck.length) {
        const best = Math.max(...nextScores);
        const tied = nextScores.map((score, index) => (score === best ? index : -1)).filter((index) => index >= 0);
        if (mode === "class" && tied.length > 1) {
          const extra = shuffle(questions.filter((item) => !deck.some((used) => used.id === item.id)));
          setHadSudden(true);
          setSuddenTeams(tied);
          setSuddenPicks({});
          setDeck(extra.length ? extra : shuffle(questions));
          setCursor(0);
          setTurn(0);
          setPicked(null);
          setPhase("ask");
          return;
        }
        setWinner(tied.length === 1 ? tied[0] : null);
        setPhase("done");
        return;
      }
      setCursor(nextCursor);
      setTurn(turn + 1);
      setPicked(null);
      setPhase("ask");
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [phase, picked, question, scores, teamNow, suddenTeams, suddenPicks, turn, cursor, deck, mode]);

  function start() {
    const count = Math.min(length, questions.length);
    setDeck(shuffle(questions).slice(0, count));
    const countTeams = mode === "solo" ? 1 : teamCount;
    setScores(Array.from({ length: countTeams }, () => 0));
    setCursor(0);
    setTurn(0);
    setPicked(null);
    setSuddenTeams(null);
    setSuddenPicks({});
    setHadSudden(false);
    setWinner(null);
    setPhase("ask");
  }

  const scoreLine = useMemo(
    () => scores.slice(0, mode === "solo" ? 1 : teamCount).map((score, index) => `${names[index]}: ${score}`),
    [scores, mode, teamCount, names],
  );

  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-6">
      <h1 className="text-3xl text-danube">Quiz</h1>
      <p>{questions.length} questions about who, where, when, and what people made.</p>
      <p>
        <a
          href="/every-german-ever-quiz.pdf"
          download
          className="font-semibold underline decoration-honey underline-offset-4"
        >
          Print the quiz in English and German
        </a>
      </p>
      {phase === "setup" ? (
        <section className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <Choice on={mode === "solo"} onClick={() => setMode("solo")} label="Solo" />
            <Choice on={mode === "class"} onClick={() => setMode("class")} label="Class" />
          </div>
          <label className="grid gap-1">
            <span className="font-semibold">How many questions?</span>
            <select
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
              className="min-h-11 rounded-lg border border-ink/20 bg-paper px-3"
            >
              {[8, 12, 20].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </label>
          {mode === "class" ? (
            <div className="grid gap-2">
              <label className="grid gap-1">
                <span className="font-semibold">Teams</span>
                <select
                  value={teamCount}
                  onChange={(event) => setTeamCount(Number(event.target.value))}
                  className="min-h-11 rounded-lg border border-ink/20 bg-paper px-3"
                >
                  {[2, 3, 4].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>
              {names.slice(0, teamCount).map((name, index) => (
                <input
                  key={index}
                  value={name}
                  onChange={(event) => {
                    const next = [...names];
                    next[index] = event.target.value;
                    setNames(next);
                  }}
                  className="min-h-11 rounded-lg border border-ink/20 bg-paper px-3"
                  aria-label={`Team ${index + 1} name`}
                />
              ))}
            </div>
          ) : null}
          <button type="button" onClick={start} className="min-h-11 w-fit rounded-lg bg-danube px-4 font-semibold text-paper">
            Start
          </button>
        </section>
      ) : null}
      {phase !== "setup" && question ? (
        <section className="grid gap-3">
          <p className="text-sm font-semibold text-linden">{scoreLine.join(" · ")}</p>
          {suddenTeams ? <p>The scores are tied. This is a short sudden-death question. Each tied team answers. Then the answer shows.</p> : null}
          {mode === "class" ? <p className="font-semibold">{names[teamNow]} answers.</p> : null}
          <p className="text-sm">
            Question {Math.min(cursor + 1, deck.length)} of {deck.length}
          </p>
          <h2 className="text-2xl">{text(question.prompt)}</h2>
          <div className="grid gap-2">
            {question.choices.map((choice, index) => {
              const show = phase === "feedback" && picked !== null;
              const isAnswer = index === question.answer;
              const isPicked = index === picked;
              return (
                <button
                  key={choice}
                  type="button"
                  disabled={phase !== "ask"}
                  onClick={() => {
                    if (phase !== "ask") return;
                    if (suddenTeams) {
                      const nextPicks = { ...suddenPicks, [teamNow]: index };
                      setSuddenPicks(nextPicks);
                      const waiting = suddenTeams.find((team) => nextPicks[team] === undefined);
                      if (waiting !== undefined) {
                        setTurn(suddenTeams.indexOf(waiting));
                        setPicked(null);
                        return;
                      }
                    }
                    setPicked(index);
                    setPhase("feedback");
                  }}
                  className={
                    "min-h-11 rounded-lg border px-3 text-left font-semibold " +
                    (show && isAnswer
                      ? "border-linden bg-linden text-paper"
                      : show && isPicked
                        ? "border-ink bg-paper text-ink"
                        : "border-danube text-danube")
                  }
                >
                  {text(choice)}
                </button>
              );
            })}
          </div>
          {phase === "feedback" && picked !== null ? (
            <p>
              {suddenTeams
                ? `The answer is ${question.choices[question.answer]}.`
                : picked === question.answer
                  ? "Yes."
                  : `Not this one. The answer is ${question.choices[question.answer]}.`}
            </p>
          ) : null}
        </section>
      ) : null}
      {phase === "done" ? (
        <section className="grid gap-3">
          <h2 className="text-2xl">That round is done.</h2>
          <p>{scoreLine.join(" · ")}</p>
          {mode === "class" && winner !== null && hadSudden ? <p>{names[winner]} answered the sudden-death question.</p> : null}
          {mode === "class" && winner !== null && !hadSudden ? <p>{names[winner]} has the most points.</p> : null}
          {mode === "class" && winner === null && hadSudden ? <p>The teams are still level.</p> : null}
          {mode === "solo" ? <p>You can play again whenever you like.</p> : null}
          <button type="button" onClick={() => setPhase("setup")} className="min-h-11 w-fit rounded-lg bg-honey px-4 font-semibold text-ink">
            Play again
          </button>
        </section>
      ) : null}
    </main>
  );
}

function Choice({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"min-h-11 rounded-full border px-4 font-semibold " + (on ? "border-linden bg-linden text-paper" : "border-danube text-danube")}
    >
      {label}
    </button>
  );
}
