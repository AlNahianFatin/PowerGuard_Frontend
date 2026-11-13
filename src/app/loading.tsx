import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center">
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner color="blue" />
          </EmptyMedia>
          <EmptyTitle color="blue">Processing your request</EmptyTitle>
        </EmptyHeader>
        <EmptyContent className="text-gray-400">
          Please wait while we process your request. Do not refresh the page.
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default Loading;
