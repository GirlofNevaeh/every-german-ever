import { createFileRoute, Link } from "@tanstack/react-router";
import { Photo } from "@/components/photo";

export const Route = createFileRoute("/beliefs")({
  head: () => ({ meta: [{ title: "Beliefs · Every German Ever" }] }),
  component: BeliefsPage,
});

function BeliefsPage() {
  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-6">
      <h1 className="text-3xl text-danube">Beliefs</h1>
      <p>Stories, churches, and the many ways families believe.</p>
      <h2 className="text-2xl">Woods and rivers</h2>
      <p>Old stories grew up beside woods and rivers. People told them at night, and later writers wrote some of them down.</p>
      <Photo photoId="lorelei" alt="The Lorelei rock above the Rhine" />
      <p>
        The Lorelei is a story place on the Rhine. A tale says a woman sang from the rock. The rock is real. The singer is a story.{" "}
        <Link to="/places/$slug" params={{ slug: "lorelei" }} className="underline decoration-honey underline-offset-4">
          See die Lorelei
        </Link>
        .
      </p>
      <p>The Pied Piper is a story from Hameln. In the tale, a piper leads the rats away, and then the children. People in Hameln still tell it. It is a story.</p>
      <p>Jacob and Wilhelm Grimm wrote down old tales in their own way. Other people had told those tales first. The Grimm tales are stories.</p>
      <h2 className="text-2xl">Churches and the year</h2>
      <Photo photoId="chapel" alt="A small chapel" />
      <Photo photoId="wittenberg" alt="The castle church in Wittenberg" />
      <p>Churches and chapels stand in towns and on hills. Christmas and Easter are customs many families keep, with lights, eggs, songs, and shared meals.</p>
      <p>Arguments in Luther's time split churches. Some people stayed with the older church. Some followed the reform.</p>
      <h2 className="text-2xl">Jewish life</h2>
      <p>Jewish people have been part of life in these towns for many centuries.</p>
      <p>
        In Berlin, the Memorial to the Murdered Jews of Europe is a place to remember Jewish people who were murdered.{" "}
        <Link to="/places/$slug" params={{ slug: "memorial-berlin" }} className="underline decoration-honey underline-offset-4">
          See the memorial
        </Link>
        .
      </p>
      <h2 className="text-2xl">Very old graves</h2>
      <p>We are not sure what people at very old graves believed.</p>
      <h2 className="text-2xl">Today</h2>
      <p>Many families in Germany today are Muslim, Christian, Jewish, or of no religion.</p>
    </main>
  );
}
