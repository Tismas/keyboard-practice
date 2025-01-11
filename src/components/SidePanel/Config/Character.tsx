import { KeyboardCharacter, WhiteSpace } from "../../../constants/characters";
import { useConfigStore } from "../../../stores/configStore";
import { BackspaceIcon } from "../../ui/icons/BackspaceIcon";
import { ReturnIcon } from "../../ui/icons/ReturnIcon";
import { SpaceIcon } from "../../ui/icons/SpaceIcon";
import { TabIcon } from "../../ui/icons/TabIcon";

type IconCharacter = WhiteSpace;

const iconCharacters: Record<IconCharacter, JSX.Element> = {
  "\b": <BackspaceIcon />,
  " ": <SpaceIcon />,
  "\n": <ReturnIcon />,
  "\t": <TabIcon />,
};

const isIconCharacter = (
  character: KeyboardCharacter
): character is IconCharacter => {
  return character in iconCharacters;
};

interface Props {
  character: KeyboardCharacter;
}

export const Character = ({ character }: Props) => {
  const unlocked = useConfigStore((state) =>
    state.unlockedCharacters.includes(character)
  );
  const toggleUnlocked = useConfigStore((state) => state.toggleUnlocked);

  return (
    <button
      className={`w-8 h-8 text-lg flex justify-center items-center rounded-md ${
        unlocked ? "bg-positive" : "bg-surfaceLighter opacity-50"
      }`}
      onClick={() => toggleUnlocked(character)}
    >
      {isIconCharacter(character) ? iconCharacters[character] : character}
    </button>
  );
};
