import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useChatStore } from "@/stores/ChatStore";
import { Container, rem, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import BGCard from "./BGCard";

import dalai_lama from "../public/chars/dalai_lama.png";
import debate from "../public/chars/debate.png";
import elon_musk from "../public/chars/elon_musk.png";
import expert from "../public/chars/expert.png";
import robot from "../public/chars/robot.png";
import idea_generator from "../public/chars/idea_generator.png";
import marcus_aurelius from "../public/chars/marcus_aurelius.png";
import oprah from "../public/chars/oprah.png";
import philosopher from "../public/chars/philosopher.png";
import stephen_hawking from "../public/chars/stephen_hawking.png";
import therapist from "../public/chars/therapist.png";
import tolle from "../public/chars/tolle.png";
import { useRouter } from "next/router";
import { addChat, setChosenCharacter } from "@/stores/ChatActions";
import { submitMessage } from "@/stores/SubmitMessage";

const scriptBase = ({
  character,
  characterDescription,
}: {
  character: string;
  characterDescription: string;
}) => {
  return `I’m having trouble with a scene in my screenplay where a person has a conversation with a ${character}.

 ${characterDescription && `Description: ${characterDescription}`}

I have written all of the person's lines already, but I haven’t written any of the lines for the ${character}. So what I’d like to do is give you the person’s lines, and have you provide a response for the ${character}.
I’ll give you the person’s lines one at a time, so only give me a single line of dialogue from the ${character} each time, and then wait for me to tell you the next line from the person, and we’ll simply repeat that process until the scene is complete.

Stay in character!

The person’s first line is:

Hello
`;
};

const characters = {
  "For-The-Family": {
    shortDescription: "Meals the spouse and kids will love edit me",
    avatar: idea_generator,
    prompt: `You are a meal planning assistant. You help the user in three steps: first, you ideate a week of meals for a family of three; then, you ask the user which meal they prefer; finally, you list the ingredients needed, and find them in the grocery store.`,
  },
  "Date Night": {
    shortDescription: "Perfect date night ideas",
    avatar: oprah,
    prompt: `You are a meal planning assistant. You help the user in three steps: first, you ideate a list of meals for a romantic date night; then, you ask the user which meal they prefer; finally, you list the ingredients needed, and find them in the grocery store.`,
  },
  "Build Muscle": {
    shortDescription: "Protein-rich for building muscle",
    avatar: therapist,
    prompt: `You are a meal planning assistant. You help the user in three steps: first, you ideate a week of high-protein meals for muscle-building; then, you ask the user which meal they prefer; finally, you list the ingredients needed, and find them in the grocery store.`,
  },
  "Balanced Diet": {
    shortDescription: "USDA-approved balanced diet",
    avatar: expert,
    prompt: `You are a meal planning assistant. You help the user in three steps: first, you ideate a week of USDA-approved balanced meals; then, you ask the user which meal they prefer; finally, you list the ingredients needed, and find them in the grocery store.`,
  },
  "Easy-To-Make": {
    shortDescription: "Simple meals for novice cooks",
    avatar: robot,
    prompt: `You are a meal planning assistant. You help the user in three steps: first, you ideate a week simple meals that are easy to prepare; then, you ask the user which meal they prefer; finally, you list the ingredients needed, and find them in the grocery store.`,
  },
};

function CardsCarousel({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const slides = React.Children.map(children, (theirChildren, index) => (
    <Carousel.Slide key={index}>{theirChildren}</Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="30.5%"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
      slideGap="xl"
      slidesToScroll={mobile ? 1 : 3}
      controlsOffset="xs"
      nextControlIcon={<IconArrowRight size={16} />}
      previousControlIcon={<IconArrowLeft size={16} />}
      sx={{ maxWidth: "90vw" }}
    >
      {slides}
    </Carousel>
  );
}

export default function NewChatCarousel() {
  const router = useRouter();

  return (
    // <></>
    <Container py="xl">
      <h2 style={{ textAlign: "center" }}> Suggested meal plans </h2>
      <CardsCarousel>
        {Object.keys(characters).map((key) => {
          // @ts-ignore
          const character = characters[key];
          return (
            <BGCard
              key={key}
              title={key}
              image={character.avatar.src}
              description={character.shortDescription}
              onClick={(e) => {
                setChosenCharacter(key);
                addChat(router);
                submitMessage({
                  id: uuidv4(),
                  content:
                    character.prompt ||
                    scriptBase({
                      character: key,
                      characterDescription:
                        character.characterDescription || "",
                    }),
                  role: "system",
                });
              }}
            />
          );
        })}
      </CardsCarousel>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h2>or create your own by typing below</h2>
        <IconArrowDown style={{ marginLeft: "0.5rem" }} />
      </div>
    </Container>
  );
}
