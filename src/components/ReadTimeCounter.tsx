import { IconButton } from "@chakra-ui/react";
import { MinusIcon, Plus } from "lucide-react";

type readTimeCounterProps = {
  readTime: any;
  increaseReadTime: (currReadTime: number) => void;
  decreaseReadTime: (currReadTime: number) => void;
};

export const ReadTimeCounter = ({
  readTime,
  increaseReadTime,
  decreaseReadTime,
}: readTimeCounterProps) => {
  return (
    <div className="mx-auto w-24/[150px]">
      <div className="flex items-center gap-1">
        <IconButton
          aria-label="Search database"
          icon={<MinusIcon size="24px" color="white" />}
          size="sm"
          isRound={true}
          colorScheme="black"
          onClick={() => {
            decreaseReadTime(readTime);
          }}
        ></IconButton>
        <h2 className="text-purple-400 mx-auto">
          Read time {""}
          <span className="text-white font-bold">{readTime}</span> minutes
        </h2>
        <IconButton
          aria-label="Search database"
          icon={<Plus size="24px" color="white" />}
          size="sm"
          variant="solid"
          isRound={true}
          colorScheme="white"
          onClick={() => {
            increaseReadTime(readTime);
          }}
        ></IconButton>
      </div>
      <span className="text-xs/[6px] font-thin text-center block italic">
        Between 5 - 30
      </span>
    </div>
  );
};
